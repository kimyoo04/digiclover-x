// --------------------------------------------------------------------------------
// html의 form 데이터를 전자문서화 페이지
// --------------------------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const compression = require("compression");
const bodyParser = require("body-parser");
const router = express.Router();
const Document = require("../models/document.js"); // Database
const Signature = require("../models/signature.js"); // Database
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

// --------------------------------------------------------------------------------
// 1. contractors
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
      user1: {
        companyName: companyName1,
        contractorName: contractorName1,
        contractorPhone: contractorPhone1,
        contractorEmail: contractorEmail1,
      },
      user2: {
        companyName: companyName2,
        contractorName: contractorName2,
        contractorPhone: contractorPhone2,
        contractorEmail: contractorEmail2,
      },
    };

    // 문서 작성-문서 선택 -> 분기 처리
    const submit = req.body.redirect;
    console.log("================================================ ", submit);
    if (submit === "문서 작성") {
      res.redirect("/document/writing");
    } else if (submit === "문서 선택") {
      res.redirect("/document/docukind");
    } else {
      console.error(
        "================================================ 잘못된 요청입니다."
      );
    }
  });

// --------------------------------------------------------------------------------
// 2. writing
// --------------------------------------------------------------------------------
router
  // 회사, 계약자 정보 할당
  .get("/writing", isAuthenticated, (req, res) => {
    req.session.docukind = {
      docukindName: "자유 양식",
    };

    res.render("./pages/1_document/writing", {
      info: req.session.info,
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

    function hashingA(filePath) {
      const crypto = require("crypto");
      const fs = require("fs");
      const hash = crypto.createHash("md5");

      const input = fs.createReadStream(filePath);
      input.on("readable", () => {
        const data = input.read();
        if (data) hash.update(data);
        else {
          console.log(
            `================================================ 헤시값 A 완료 --> `,
            hash.digest("hex")
          );
        }
      });
      return hash.copy().digest("hex");
    }
    const hashFile = hashingA(filePath);

    async function createDocumentRow(reqSession) {
      // Document 모델에 row 생성
      try {
        const documentRow = await Document.create({
          docuName,
          docukindName,
          hashFile,
        });
        // create 결과 로그 기록
        console.log(
          "================================================ documentRow "
        );
        console.log(documentRow.dataValues);

        // 세션쿠키에 documentId 저장
        console.log(
          "================================================ documentRow.id"
        );
        console.log(documentRow.id);
        reqSession.docu = {
          documentId: documentRow.id, // 해결 하는데 2일 걸림
        };
        reqSession.save(); // 이것으로 해결함..

        return documentRow;
      } catch (error) {
        console.error(error);
        return next(error);
      }
    }

    async function createSignatureRow(documentRow) {
      // 서명자 수에 맞게 반복하여 Signature 모델에 row 생성
      for (let i = 0; i < Object.keys(req.session.info).length; i++) {
        try {
          await Signature.create({
            contractorPhone: req.session.info[`user${i + 1}`].contractorPhone, // 세션의 유저별 폰번호
            isSigned: false,
            hashValue: 0,
            DocumentId: documentRow.id, // 방금 전 생성한 docuement의 id
          }).then((result) => {
            // create 결과 로그 기록
            console.log(
              "================================================ SignatureRow"
            );
            console.log(result.dataValues);
          });
        } catch (error) {
          console.error(error);
          return next(error);
        }
      }
    }

    createDocumentRow(req.session).then((documentRow) => {
      createSignatureRow(documentRow);
    });

    console.log(
      "================================================ 2. PDF 변환 완료"
    );
    res.redirect(`/document/custom`);
  });

// --------------------------------------------------------------------------------
// 2-1. docukind
// --------------------------------------------------------------------------------
router
  // 회사, 계약자 정보 할당
  .get("/docukind", isAuthenticated, (req, res) => {
    res.render("./pages/1_document/docukind", {
      info: req.session.info,
    });
  })

  // 세션에 문서 종류 저장 및 2-2로 리다이렉트
  .post("/docukind", isAuthenticated, (req, res) => {
    req.session.docukind = {
      docukindName: req.body.docukind,
    };

    res.redirect(`/document/modification`);
    console.log(
      "================================================ 2-1. docukind 완료 "
    );
  });

// --------------------------------------------------------------------------------
// 2-2. modification
// --------------------------------------------------------------------------------
router
  // 문서 종류별 랜더
  .get("/modification", isAuthenticated, (req, res) => {
    const {docukindName} = req.session.docukind;
    if (docukindName === "MOU계약서") {
      res.render("./pages/1_document/docukinds/mou-form", {
        docukindName,
        info: req.session.info,
      });
      console.log("================================================ MOU계약서");
    } else if (docukindName === "근로계약서") {
      res.render("./pages/1_document/docukinds/labor-contract-form", {
        docukindName,
        info: req.session.info,
      });
      console.log(
        "================================================ 근로계약서"
      );
    } else if (docukindName === "차용증") {
      res.render("./pages/1_document/docukinds/dept-ack-form", {
        docukindName,
        info: req.session.info,
      });
      console.log("================================================ 차용증");
    }
  });

// --------------------------------------------------------------------------------
// 3. custom
// --------------------------------------------------------------------------------
router
  .get("/custom", isAuthenticated, (req, res) => {
    res.render("./pages/1_document/custom", {user: req.user});
  })
  .post("/custom", (req, res) => {
    const submit = req.body.isContinue;
    if (submit === "작성 종료") {
      res.redirect("/storage");
      console.log("================================================ 작성 종료");
    } else if (submit === "작성 계속") {
      res.redirect("/send/signning");
      console.log("================================================ 작성 계속");
    } else {
      console.error(
        "================================================ 잘못된 요청입니다."
      );
    }
  });

// --------------------------------------------------------------------------------
// 0. document
// --------------------------------------------------------------------------------
router.get("/", isAuthenticated, (req, res) => {
  res.render("./pages/1_document/document", {user: req.user});
});

module.exports = router;
