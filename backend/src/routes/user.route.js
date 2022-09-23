const express = require("express");
const UserCtrl = require("../controllers/users.controller.js");
const {isNotLoggedIn, isLoggedIn} = require("./middlewares.js");
const router = express.Router();

// Post - 로컬 로그인

router.route("/local-login").post(isNotLoggedIn, UserCtrl.apiGetLocalLogInUser);

// Get - 카카오 로그인 페이지 이동

router.route("/kakao").get(isNotLoggedIn, UserCtrl.apiGetKakaoLogIn);

// Get - 카카오 로그인 콜백

router.route("/kakao/callback").get(UserCtrl.apiGetKakaoLogInCallback);

// Get - 구글 로그인

router.route("/google").get(isNotLoggedIn, UserCtrl.apiGetGoogleLogin);

// Get - 구글 로그인 콜백

router
  .route("/google/callback")
  .get(isNotLoggedIn, UserCtrl.apiGetGoogleLoginCallback);

// Post - 로그아웃

router.route("/logout").post(isLoggedIn, UserCtrl.apiPostLogOut);

// -------------------------------------------------------

// Post - 회원가입

router.route("/signin").post(isNotLoggedIn, UserCtrl.apiPostOneUser);

// Get - 회원조회
// Delete - 회원탈퇴
// Put - 회원정보수정

router
  .route("/:id")
  .get(isLoggedIn, UserCtrl.apiGetUserById)
  .delete(isLoggedIn, UserCtrl.apiDeleteUserById)
  .put(isLoggedIn, UserCtrl.apiPutUserById);

// @@@다른 유저 찾기, 혹은 즐겨찾기 기능 추후 구현
module.exports = router;
