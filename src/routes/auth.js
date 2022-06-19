//----------------------------------------------------------------
// 로그인, 회원가입 페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
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
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

//------------------------------ 로그인 페이지 ------------------------------
router.get("/signin", (req, res) => {
  res.render("signin");
});

//------------------------------ 회원가입 페이지 ------------------------------
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
