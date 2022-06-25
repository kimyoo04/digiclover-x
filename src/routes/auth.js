//----------------------------------------------------------------
// 로그인, 회원가입 페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const compression = require("compression");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const router = express.Router();
dotenv.config();

// lib 폴더 세팅
const {
  isOwner,
  statusUI,
  isLoggedIn,
  isNotLoggedIn,
} = require("../lib/auth.js");
const template = require("../lib/template.js");

// public 폴더 정적파일 연결
router.use(express.static(path.join(__dirname, "../public")));

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

// passport 미들웨어 가져오기
module.exports = function (passport) {
  //------------------------------ 회원가입 페이지 ------------------------------
  router
    .get("/signin", (req, res) => {
      res.render("signin");
    })
    .post("signin", isNotLoggedIn, async (req, res, next) => {
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
    let fmsg = req.flash();

    let successFeedback;
    let errorFeedback;

    // 로그인 성공 플래쉬메시지 넣기
    if (fmsg.success) {
      successFeedback = fmsg.success[0];
    }

    // 로그인 실패 플래쉬메시지 넣기
    if (fmsg.error) {
      errorFeedback = fmsg.error[0];
    }

    res.render("login", {
      successFeedback: `${successFeedback}`,
      errorFeedback: `${errorFeedback}`,
    });
  });

  //------------------------------ 로컬 로그인 ------------------------------
  router.post(
    "/login-local",
    passport.authenticate("local", {
      successRedirect: "/document/waitforauth",
      failureRedirect: "/auth/login",
      //flash 기능 사용 설정
      failureFlash: true,
      successFlash: true,
    })
  );

  //------------------------------ 로그아웃 ------------------------------
  router.get("/logout", (req, res) => {
    // 패스포트 로그아웃
    req.logout();
    req.session.destroy(function (err) {
      // 세션 현재상태 저장후, 콜백 오면 리다이렉션
      req.session.save(function () {
        res.redirect("/login");
      });
    });
  });

  return router;
};
