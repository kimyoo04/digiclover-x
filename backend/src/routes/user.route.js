const express = require("express");
const UserCtrl = require("../controllers/users.controller.js");
const router = express.Router();

// Get - 로컬 로그인

router.route("/login-local").get(UserCtrl.apiGetLocalLogInUser);

// Post - 회원가입

router.route("/signin").post(UserCtrl.apiPostUser);

// Get - 유저 프로필 정보

router.route("/profile/:id").get(UserCtrl.apiGetUserbyId);

// @@@다른 유저 찾기, 혹은 즐겨찾기 기능 추후 구현
module.exports = router;
