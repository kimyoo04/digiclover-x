//----------------------------------------------------------------
// 이메일 전송을 하기위한 수집
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
const {isAuthenticated} = require("../lib/auth.js");

// public 폴더 정적파일 연결
router.use(express.static(path.join(__dirname, "../public")));

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

//------------------------------ 5. 요청자의 문서 서명 ------------------------------
router.get("/signning", isAuthenticated, (req, res) => {
  res.render("./pages/3_send/signning", {user: req.user});
});

//------------------------------ 4. 이메일 수신자 설정 ------------------------------
router.get("/", isAuthenticated, (req, res) => {
  res.render("./pages/3_send/send", {user: req.user});
});

module.exports = router;
