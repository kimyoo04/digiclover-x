//----------------------------------------------------------------
// html의 form 데이터를 전자문서화 페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const compression = require("compression");
const bodyParser = require("body-parser");
const router = express.Router();
const Document = require("../models/document.js"); // Database
dotenv.config();

// lib 폴더 세팅
// const template = require("../lib/template.js");
const {isAuthenticated} = require("../lib/auth.js");

// public 폴더 정적파일 연결
router.use(express.static(path.join(__dirname, "../public")));

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

//추가 모듈  -----------------------------------------------------
// const {jsPDF} = require("jspdf");

// --------------------------------------------------------------------------------
//1. contractors
// --------------------------------------------------------------------------------
router
  .get("/contractors", isAuthenticated, (req, res) => {
    res.render("./pages/1_document/contractors", {user: req.user});
  })
  // 세션에 데이터 저장 & 문서 작성-문서 선택 -> 분기 처리
  .post("/contractors", isAuthenticated, (req, res) => {
    const {
      companyName1,
      contractorName1,
      contractorPhone1,
      contractorEmail1,
      companyName2,
      contractorName2,
      contractorPhone2,
      contractorEmail2,
    } = req.body;

    // 세션에 데이터 저장
    req.session.info = {
      companyName1,
      contractorName1,
      contractorPhone1,
      contractorEmail1,

      companyName2,
      contractorName2,
      contractorPhone2,
      contractorEmail2,
    };

    // 문서 작성-문서 선택 -> 분기 처리
    const submit = req.body.redirect;
    console.log(submit);
    if (submit === "문서 작성") {
      res.redirect("/document/writing");
    } else if (submit === "문서 선택") {
      res.redirect("/document/docukind");
    } else {
      console.error("잘못된 요청입니다.");
    }
  });

// --------------------------------------------------------------------------------
//2. writing
// --------------------------------------------------------------------------------
router
  // 회사, 계약자 정보 할당
  .get("/writing", isAuthenticated, (req, res) => {
    const {companyName1, contractorName1, companyName2, contractorName2} =
      req.session.info;

    req.session.docukind = {
      docukindName: "자유 형식",
    };

    res.render("./pages/1_document/writing", {
      companyName1,
      contractorName1,
      companyName2,
      contractorName2,
    });
  })

  // pdf 생성 & 헤시값 A 생성
  .post("/finished_document", isAuthenticated, async (req, res, next) => {
    const {title, describe, indx, content} = req.body;

    const doc = require("../jspdf/docukinds/MOU-FORM")(
      req,
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
          console.log(`--------헤시값 A 완료--------`, hash.digest("hex"));
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

    console.log("2. PDF 변환 완료");
    res.redirect(`/document/custom`);
  });

// --------------------------------------------------------------------------------
//2-1. docukind
// --------------------------------------------------------------------------------
router
  // 회사, 계약자 정보 할당
  .get("/docukind", isAuthenticated, (req, res) => {
    const {companyName1, contractorName1, companyName2, contractorName2} =
      req.session.info;

    res.render("./pages/1_document/docukind", {
      companyName1,
      contractorName1,
      companyName2,
      contractorName2,
    });
  })

  // 세션에 문서 종류 저장 및 2-2로 리다이렉트
  .post("/docukind", isAuthenticated, (req, res) => {
    req.session.docukind = {
      docukindName: req.body.docukind,
    };

    res.redirect(`/document/modification`);
    console.log("2-1. docukind 완료");
  });

// --------------------------------------------------------------------------------
//2-2. modification
// --------------------------------------------------------------------------------
router
  // 문서 종류별 랜더
  .get("/modification", isAuthenticated, (req, res) => {
    const {docukindName} = req.session.dokukind;
    if (docukindName === "MOU계약서") {
      res.render("./pages/1_document/docukind/mou-form", {docukindName});
    } else if (docukindName === "근로계약서") {
      res.render("./pages/1_document/docukind/labor-contract-form", {
        docukindName,
      });
    } else if (docukindName === "차용증") {
      res.render("./pages/1_document/docukind/dept-ack-form", {docukindName});
    }
  });

// --------------------------------------------------------------------------------
//3. custom
// --------------------------------------------------------------------------------
router
  .get("/custom", isAuthenticated, (req, res) => {
    res.render("./pages/1_document/custom", {user: req.user});
  })
  .post("/custom", (req, res) => {
    const submit = req.body.isContinue;
    if (submit === "작성 종료") {
      res.redirect("/storage");
    } else if (submit === "작성 계속") {
      res.redirect("/send/signning");
    } else {
      console.error("잘못된 요청입니다.");
    }
  });

// --------------------------------------------------------------------------------
//document
// --------------------------------------------------------------------------------
router.get("/", isAuthenticated, (req, res) => {
  res.render("./pages/1_document/document", {user: req.user});
});

module.exports = router;
