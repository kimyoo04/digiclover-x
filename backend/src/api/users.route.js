const express = require("express");
const UserCtrl = require("./users.controller.js");
const router = express.Router();

// 유저 정보 조회
router.route("/id/:id").get(UserCtrl.apiGetUser);

// @@@다른 유저 찾기, 혹은 즐겨찾기 기능 추후 구현
module.exports = router;
