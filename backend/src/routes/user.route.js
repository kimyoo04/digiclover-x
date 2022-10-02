const express = require("express");
const UserCtrl = require("../controllers/users.controller.js");
const {verifyIsNotToken, verifyIsToken} = require("../util/authJWT");
const router = express.Router();

// Get - 회원조회
// Delete - 회원탈퇴
// Put - 회원정보수정

router
  .route("/:id")
  .get(verifyIsToken, UserCtrl.apiGetUserById)
  .delete(verifyIsToken, UserCtrl.apiDeleteUserById)
  .put(verifyIsToken, UserCtrl.apiPutUserById);

// @@@다른 유저 찾기, 혹은 즐겨찾기 기능 추후 구현
module.exports = router;
