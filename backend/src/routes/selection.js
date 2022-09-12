//----------------------------------------------------------------
// 문서 양식을 선택 및 설정을 하는 페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const router = express.Router();
dotenv.config();

// lib 폴더 세팅
const {isAuthenticated} = require("../lib/auth.js");

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

//------------------------------ 2. 문서 종류 선택 ------------------------------

router.get("/select-docukind", (req, res) => {
  // 회사, 계약자 정보 할당

  res.render("./pages/1_document/select-docukind", {
    companyName1: req.session.info.companyName1,
    contractorName1: req.session.info.contractorName1,
    companyName2: req.session.info.companyName2,
    contractorName2: req.session.info.contractorName2,
  });
});

//------------------------------ 3. 문서 작성 및 PDF 생성 ------------------------------

// 자유형식 시작
router
  .get("/free-form", (req, res) => {
    // 회사, 계약자 정보 할당

    res.render("pages/2_selection/free-form", {
      companyName1: req.session.info.companyName1,
      contractorName1: req.session.info.contractorName1,
      companyName2: req.session.info.companyName2,
      contractorName2: req.session.info.contractorName2,
      docukindName: req.session.docukind.docukindName,
    });
  })
  .post("/free-form", (req, res) => {});
// 자유형식 끝

// 근로계약서 시작
router
  .get("/labor-contract-form", (req, res) => {
    // 회사, 계약자 정보 할당

    res.render("pages/2_selection/labor-contract-form", {
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

    res.render("pages/2_selection/dept-ack-form", {
      companyName1: req.session.info.companyName1,
      contractorName1: req.session.info.contractorName1,
      companyName2: req.session.info.companyName2,
      contractorName2: req.session.info.contractorName2,
      docukindName: req.session.docukind.docukindName,
    });
  })
  .post("/dept-ack-form", (req, res) => {});
// 차용증 끝
