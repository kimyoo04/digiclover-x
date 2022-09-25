const express = require("express");
const UserCtrl = require("../controllers/users.controller.js");
const {isNotLoggedIn, isLoggedIn} = require("../utilities/middlewares");
const router = express.Router();

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
