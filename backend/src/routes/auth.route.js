const express = require("express");
const router = express.Router();
const AuthCtrl = require("../controllers/auth.controller.js");
const {isNotLoggedIn, isLoggedIn} = require("../utilities/middlewares.js");

// Post - 로컬 로그인

router.route("/local-login").post(isNotLoggedIn, AuthCtrl.apiGetLocalLogInUser);

// Get - 카카오 로그인 페이지 이동

router.route("/kakao").get(isNotLoggedIn, AuthCtrl.apiGetKakaoLogIn);

// Get - 카카오 로그인 콜백

router.route("/kakao/callback").get(AuthCtrl.apiGetKakaoLogInCallback);

// Get - 구글 로그인

router.route("/google").get(isNotLoggedIn, AuthCtrl.apiGetGoogleLogin);

// Get - 구글 로그인 콜백

router.route("/google/callback").get(AuthCtrl.apiGetGoogleLoginCallback);

// Post - 로그아웃

router.route("/logout").post(isLoggedIn, AuthCtrl.apiPostLogOut);

module.exports = router;
