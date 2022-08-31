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

// --------------------------------------------------------------------------------
// 4. 요청자의 서명
// --------------------------------------------------------------------------------
router
  // 서명 그리기 기능 & 도장 svg, png 삽입 및 위치 이동 기능
  .get("/signning", isAuthenticated, (req, res) => {
    res.render("./pages/2_send/signning", {user: req.user});
  })
  // 요청자의 서명이후 헤시값 B와 C 저장 (기존에 저장된 가장 최신의 헤시값과)
  .post("/signning", isAuthenticated, (req, res) => {
    console.log("4. 요청자 서명 완료");
    res.redirect("/send/email");
  });

// --------------------------------------------------------------------------------
// 5. 이메일 전송 및 이용 동의
// --------------------------------------------------------------------------------
router
  // 이메일 수정 & 이용 동의 서식
  .get("/email", isAuthenticated, (req, res) => {
    res.render("./pages/2_send/email", {
      info: req.session.info,
    });
  })
  // 이메일 전송 프로세스, 로그 기록
  .post("/email", isAuthenticated, (req, res) => {
    console.log("5. 이메일 전송 완료");
    res.redirect("/storage");
  });

// --------------------------------------------------------------------------------
// 4-0. 문서 전송 시작 전 페이지
// --------------------------------------------------------------------------------
router.get("/", isAuthenticated, (req, res) => {
  res.render("./pages/2_send/send", {user: req.user});
});

module.exports = router;
