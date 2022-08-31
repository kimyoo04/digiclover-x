// 모듈 세팅
const dotenv = require("dotenv");
const passport = require("passport");
const express = require("express");
const path = require("path");
const compression = require("compression");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
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
// 2. 수신자 서명 및 동의 -> 헤시값 C, D, E ... 생성
// --------------------------------------------------------------------------------
router
  // 서명 그리기 기능 & 도장 svg, png 삽입 및 위치 이동 기능
  .get("/signning", isAuthenticated, (req, res) => {
    res.render("./pages/2_send/signning", {user: req.user});
  })
  // 요청자의 서명이후 헤시값 B와 C 저장 (기존에 저장된 가장 최신의 헤시값과)
  .post("/signning", isAuthenticated, (req, res) => {
    console.log("2. 수신자 서명 완료");
    res.redirect("/storage");
  });

// --------------------------------------------------------------------------------
// 1-2. 수신자 회원가입 페이지
// --------------------------------------------------------------------------------
router
  .get("/signin", (req, res) => {
    res.render("pages/6_auth/recipient-signin");
  })
  .post("/signin", async (req, res, next) => {
    const {email, name, phone, password} = req.body;

    try {
      const exUser = await User.findOne({where: {email}});
      if (exUser) {
        return res.redirect("/signin?error=exist"); // 프론트 작업 필요
      }
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        password: hash,
        name,
        phone,
      });
      console.log("1-2. 수신자 회원가입 완료");
      return res.redirect("/auth/login");
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });

// --------------------------------------------------------------------------------
// 1-1. 수신자 로그인 페이지
// --------------------------------------------------------------------------------
router
  .get("/login", (req, res) => {
    const error = req.flash().error || [];
    console.log(error);
    res.render("./pages/6_auth/recipient-login", {
      errorFeedback: error,
      user: req.user,
    });
  })
  .post("/login", (req, res) => {
    console.log("1-1. 수신자 로그인 완료");
    res.redirect("/recipient/signning");
  });

//------------------------------ 로컬 로그인 ------------------------------
router.post(
  "/login-local",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    successFlash: true,
  })
);

//------------------------------ 카카오 로그인 ------------------------------
// 카카오 로그인 페이지 이동
router.get("/kakao", passport.authenticate("kakao"));

// 카카오 로그인 성공하면 아래로 요청을 쏴준다.
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
