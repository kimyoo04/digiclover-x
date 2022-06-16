//----------------------------------------------------------------
// 전자문서들 서명 페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router = express.Router();
dotenv.config();

// lib 폴더 세팅
const template = require("../lib/template.js");
const db = require("../lib/db");
const upload = require("../lib/uploader.js");

router.use(morgan("dev")); // "combined"

// public 폴더 정적파일 연결
router.use(express.static(path.join(__dirname, "../public")));

// 쿠키와 세션
router.use(cookieParser(process.env.COOKIE_SECRET));
router.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
    },
    name: "connect.sid",
  })
);

// 미들웨어 세팅
router.use(express.json()); // json 파싱
router.use(express.urlencoded({extended: true})); // form 파싱
router.use(compression());

//------------------------------ 문서화 관리 페이지 ------------------------------

router.get("/waitforauth", (req, res) => {
  res.render("wait_for_auth");
});

router.get("/documentation", (req, res) => {
  res.render("documentation");
});

router.get("/certification", (req, res) => {
  res.render("certification");
});

//------------------------------ PDF 업로드 및 파일 저장 ------------------------------

router.post("/upload_process", upload.single("userfile"), (req, res) => {
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

  res.redirect(`/waitforauth`); //수정필요
  console.log("PDF 파일 업로드 완료");
});

module.exports = router;
