//----------------------------------------------------------------
// html의 form 데이터를 전자문서화 페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const compression = require("compression");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const Document = require("../models/document.js");
dotenv.config();

// lib 폴더 세팅
const template = require("../lib/template.js");
const {isAuthenticated} = require("../lib/auth.js");

// public 폴더 정적파일 연결
router.use(express.static(path.join(__dirname, "../public")));

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

//------------------------------ 추가 모듈  ------------------------------
const {jsPDF} = require("jspdf");

//------------------------------ 코드 시작 ------------------------------
//------------------------------ 1. 회사 및 계약자 선택 ------------------------------

router.get("/select-conpanies", (req, res) => {
  res.render("select-companies");
});

router.post("/select-companies", (req, res) => {
  req.session.info = {
    companyName1: req.body.companyName1,
    contractorName1: req.body.contractorName1,
    contractorPhone1: req.body.contractorPhone1,
    contractorEmail1: req.body.contractorEmail1,

    companyName2: req.body.companyName2,
    contractorName2: req.body.contractorName2,
    contractorPhone2: req.body.contractorPhone2,
    contractorEmail2: req.body.contractorEmail2,
  };

  res.redirect(`/convert/select-docukind`);
  console.log("1. 회사 및 계약자 선택 완료");
});

//------------------------------ 2. 문서 종류 선택 ------------------------------

router.get("/select-docukind", (req, res) => {
  // 회사, 계약자 정보 할당

  res.render("select-docukind", {
    companyName1: req.session.info.companyName1,
    contractorName1: req.session.info.contractorName1,
    companyName2: req.session.info.companyName2,
    contractorName2: req.session.info.contractorName2,
  });
});

router.post("/select-docukind", (req, res) => {
  // 세션에 문서 종류 저장
  req.session.docukind = {
    docukindName: req.body.docukind,
  };

  const docukindName = req.session.docukind.docukindName;

  if (docukindName === "자유형식") {
    res.redirect(`/convert/free-form`);
  } else if (docukindName === "MOU계약서") {
    res.redirect(`/convert/mou-form`);
  } else if (docukindName === "근로계약서") {
    res.redirect(`/convert/labor-contract-form`);
  } else if (docukindName === "차용증") {
    res.redirect(`/convert/dept-ack-form`);
  } else {
  }
  console.log("2. 문서 종류 선택 완료");
});

//------------------------------ 3. 문서 작성 및 PDF 생성 ------------------------------

// 자유형식 시작
router
  .get("/free-form", (req, res) => {
    // 회사, 계약자 정보 할당

    res.render("free-form", {
      companyName1: req.session.info.companyName1,
      contractorName1: req.session.info.contractorName1,
      companyName2: req.session.info.companyName2,
      contractorName2: req.session.info.contractorName2,
      docukindName: req.session.docukind.docukindName,
    });
  })
  .post("/free-form", (req, res) => {});
// 자유형식 끝

// MOU 시작
router
  .get("/mou-form", (req, res) => {
    // 회사, 계약자 정보 할당

    res.render("mou-form", {
      companyName1: req.session.info.companyName1,
      contractorName1: req.session.info.contractorName1,
      companyName2: req.session.info.companyName2,
      contractorName2: req.session.info.contractorName2,
      docukindName: req.session.docukind.docukindName,
    });
  })
  .post("/mou-form", async (req, res, next) => {
    const {title, describe, indx, content} = req.body;

    const doc = require("../jspdf/docukind/MOU-FORM")(
      req,
      res,
      title,
      describe,
      indx,
      content
    );

    // YYYYMMDDHHMMSS 생성하는 함수
    Date.prototype.YYYYMMDDHHMMSS = function () {
      let yyyy = this.getFullYear().toString();
      let MM = pad(this.getMonth() + 1, 2);
      let dd = pad(this.getDate(), 2);
      let hh = pad(this.getHours(), 2);
      let mm = pad(this.getMinutes(), 2);
      let ss = pad(this.getSeconds(), 2);

      return yyyy + MM + dd + hh + mm + ss;
    };

    function pad(number, length) {
      let str = "" + number;
      while (str.length < length) {
        str = "0" + str;
      }
      return str;
    }

    // 현재 날짜, 문서이름, 문서종류이름 저장
    const nowDate = new Date().YYYYMMDDHHMMSS();
    const docuName = title;
    const docukindName = req.session.docukind.docukindName;
    const filePath = `./uploads/made/${nowDate} - ${docuName}.pdf`;

    // pdf 파일 생성
    doc.output("save", filePath);

    // pdf 파일 해시화
    function hashing(filePath) {
      const crypto = require("crypto");
      const fs = require("fs");
      const hash = crypto.createHash("md5");

      const input = fs.createReadStream(filePath);
      input.on("readable", () => {
        const data = input.read();
        if (data) hash.update(data);
        else {
          console.log(`--------파일 해시화--------`, hash.digest("hex"));
        }
      });
      return hash.copy().digest("hex");
    }
    const hashFile = hashing(filePath);

    // document DB 저장
    try {
      Document.create({
        docuName,
        docukindName,
        hashFile,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }

    console.log("3. PDF 변환 완료");
    res.redirect(`/convert/signning`);
  });
// MOU 끝

// 근로계약서 시작
router
  .get("/labor-contract-form", (req, res) => {
    // 회사, 계약자 정보 할당

    res.render("labor-contract-form", {
      companyName1: req.session.info.companyName1,
      contractorName1: req.session.info.contractorName1,
      companyName2: req.session.info.companyName2,
      contractorName2: req.session.info.contractorName2,
      docukindName: req.session.docukind.docukindName,
    });
  })
  .post("/labor-contract-form", (req, res) => {});
// 근로계약서 끝

// 차용증 시작
router
  .get("/dept-ack-form", (req, res) => {
    // 회사, 계약자 정보 할당

    res.render("dept-ack-form", {
      companyName1: req.session.info.companyName1,
      contractorName1: req.session.info.contractorName1,
      companyName2: req.session.info.companyName2,
      contractorName2: req.session.info.contractorName2,
      docukindName: req.session.docukind.docukindName,
    });
  })
  .post("/dept-ack-form", (req, res) => {});
// 차용증 끝

//------------------------------ 4. PDF에 서명 ------------------------------
router.get("/signning", (req, res) => {
  res.render("signning");
});

//------------------------------ 5. 이메일 전송 ------------------------------
router.get("/sending", (req, res) => {
  res.render("sending");
});

//------------------------------ PDF TEST ------------------------------

router.get("/pdftest", async (req, res, next) => {
  const {margin, doc, maxLineWidth, centerXPos} = require("../jspdf/index");

  for (let i = 0; i < 100; i++) {
    doc.text(
      `${i * 7} ----------------------------------------`,
      margin,
      i * 7
    );
  }
  doc.output("save", `./uploads/test.pdf`);
  console.log("---------------------finish---------------------");
  res.render("test");
});

//------------------------------ convert 메인 페이지 ------------------------------
router.get("/", (req, res) => {
  res.render("converting");
});

module.exports = router;
