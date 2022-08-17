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

//------------------------------ 1. 회사 및 계약자 선택 ------------------------------

router.get("/select-conpanies", (req, res) => {
  res.render("./pages/1_document/select-companies");
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

  res.redirect(`/document/select-docukind`);
  console.log("1. 회사 및 계약자 선택 완료");
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
  res.render("./pages/1_document/test");
});

//------------------------------ document 메인 페이지 ------------------------------
router.get("/", isAuthenticated, (req, res) => {
  res.render("./pages/1_document/document", {user: req.user});
});

module.exports = router;
