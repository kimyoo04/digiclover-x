//----------------------------------------------------------------
// 로그인, 회원가입 페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const passport = require("passport");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const router = express.Router();
dotenv.config();

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

//------------------------------ 회원가입 페이지 ------------------------------
router
  .get("/signin", (req, res) => {
    res.render("pages/6_auth/signin");
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
      return res.redirect("/auth/login");
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });

//------------------------------ 로그인 페이지 ------------------------------
router.get("/login", (req, res) => {
  const error = req.flash().error || [];
  console.log(error);
  res.render("pages/6_auth/login", {
    errorFeedback: error,
    user: req.user,
  });
});
// flash message 알아보기

//------------------------------ 로그인 필요 페이지 ------------------------------
router.get("/require-login", (req, res) => {
  res.render("pages/6_auth/requireLogin", {});
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

//------------------------------ 로그아웃 ------------------------------
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
});
module.exports = router;
