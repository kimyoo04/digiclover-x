//----------------------------------------------------------------
// html의 form 데이터를 전자문서화 페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router = express.Router();
dotenv.config();

// lib 폴더 세팅
const template = require("../lib/template.js");
const db = require("../lib/db");

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

//------------------------------ 추가 모듈  ------------------------------
const jsPDF = require("jspdf");

//------------------------------ contract writing ------------------------------
router.get("/select-conpanies", (req, res) => {
  res.render("select-companies");
});

router.get("/select-contract", (req, res) => {
  res.render("select-contract");
});

router.get("/writing", (req, res) => {
  res.render("writing");
});

//------------------------------ PDF 생성 ------------------------------
router.post("/convert-html-to-pdf", (req, res) => {
  var post = req.body;
  var title = post.title;
  var description = post.description;

  const doc = new jsPDF({
    orientation: "p", // "portrait" or "landscape" (or shortcuts "p" or "l").
    unit: "mm", // "in" <-- inch
    lineHeight,
    format: "a4", // [4, 2],
  }).setProperties({title: "String Splitting"});

  const pageWidth = 8.5,
    lineHeight = 1.2,
    margin = 0.5,
    maxLineWidth = pageWidth - margin * 2,
    fontSize = 24,
    ptsPerInch = 72,
    oneLineHeight = (fontSize * lineHeight) / ptsPerInch;
  const contentText = post.content;
});

//------------------------------ PDF에 서명 ------------------------------
router.get("/signning", (req, res) => {
  res.render("signning");
});

//------------------------------ 이메일 전송 ------------------------------
router.get("/sending", (req, res) => {
  res.render("sending");
});

//------------------------------ convert 메인 페이지 ------------------------------
router.get("/", (req, res) => {
  res.render("converting");
});

module.exports = router;
