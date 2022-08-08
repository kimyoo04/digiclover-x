//----------------------------------------------------------------
// 전자문서들 저장 페이지
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
const upload = require("../lib/uploader.js");
const {isAuthenticated} = require("../lib/auth.js");

// public 폴더 정적파일 연결
router.use(express.static(path.join(__dirname, "../public")));

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

//------------------------------ 문서화 관리 페이지 ------------------------------

router.get("/waitforauth", isAuthenticated, (req, res) => {
  res.render("wait_for_auth", {user: req.user});
});

router.get("/documentation", isAuthenticated, (req, res) => {
  res.render("documentation", {user: req.user});
});

router.get("/certification", isAuthenticated, (req, res) => {
  res.render("certification", {user: req.user});
});

//------------------------------ PDF 업로드 및 파일 저장 ------------------------------

router.post(
  "/upload_process",
  isAuthenticated,
  upload.single("userfile"),
  (req, res) => {
    /* 
  console.log(req.files);

  fieldname: 'userfile',
  originalname: 'BÃ«t-Bi_Image_Sheet.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: 'b2dd142b24713d3a6025744646cec7da',
  path: 'uploads\\b2dd142b24713d3a6025744646cec7da',
  size: 206230 
  */

    res.redirect(`/document/waitforauth`); //수정필요
    console.log("PDF 파일 업로드 완료");
  }
);

module.exports = router;
