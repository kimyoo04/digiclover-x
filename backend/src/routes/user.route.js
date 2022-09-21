const express = require("express");
const UserCtrl = require("../controllers/users.controller.js");
const router = express.Router();

// Post - 로컬 로그인

router.route("/login-local").post(UserCtrl.apiGetLocalLogInUser);

// Get - 카카오 로그인 페이지 이동

router.route("/kakao").get(UserCtrl.apiGetKakaoLogIn);

// Get - 카카오 로그인 성공 후 로그인 진행

router.route("/kakao/callback").get(UserCtrl.apiGetKakaoLogInCallback);

// -------------------------------------------------------

// Post - 회원가입

router.route("/signin").post(UserCtrl.apiPostOneUser);

// Get - 회원조회
// Delete - 회원탈퇴
// Put - 회원정보수정

router
  .route("/:id")
  .get(UserCtrl.apiGetUserById)
  .delete(UserCtrl.apiDeleteUserById)
  .put(UserCtrl.apiPutUserById);

// @@@다른 유저 찾기, 혹은 즐겨찾기 기능 추후 구현
module.exports = router;
