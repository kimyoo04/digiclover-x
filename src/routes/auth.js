//----------------------------------------------------------------
// 로그인, 회원가입 페이지
//----------------------------------------------------------------

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
const template = require("../lib/template.js");

// public 폴더 정적파일 연결
router.use(express.static(path.join(__dirname, "../public")));

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

// passport 미들웨어 가져오기
//------------------------------ 회원가입 페이지 ------------------------------
router
  .get("/signin", (req, res) => {
    res.render("signin");
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
  // let fmsg = req.flash();
  // console.log(fmsg);

  // let successFeedback = "";
  // let errorFeedback = "";

  // // 로그인 성공 플래쉬메시지 넣기
  // if (fmsg.success) {
  //   successFeedback = fmsg.success[0];
  // }

  // // 로그인 실패 플래쉬메시지 넣기
  // if (fmsg.error) {
  //   errorFeedback = fmsg.error[0];
  // }

  res.render("login", {
    // successFeedback: `${successFeedback}`,
    // errorFeedback: `${errorFeedback}`,
    user: req.user,
  });
});

//------------------------------ 로그인 필요 페이지 ------------------------------
router.get("/require-login", (req, res) => {
  res.render("requireLogin", {});
});

//------------------------------ 로컬 로그인 ------------------------------
router.post("/login-local", (req, res, next) => {
  passport.authenticate(
    "local",
    // done(null, false, message)가 밑의 미들웨어 인자로 들어감
    (authError, user, info) => {
      if (authError) {
        console.error("authError", authError);
        return next(authError);
      }
      if (!user) {
        return res.redirect("/auth/login");
      }

      // 시리얼라이즈 유저를 함
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect("/");
      });
    }
  )(req, res, next);
});

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
