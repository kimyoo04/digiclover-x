//----------------------------------------------------------------
// 서명들을 진행하는 모든 프로세스를 모은 페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const router = express.Router();
dotenv.config();

// lib 폴더 세팅
const {isAuthenticated} = require("../lib/auth.js");

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

//------------------------------ 4. 유저의 서명 조회 ------------------------------
router.get("/", isAuthenticated, (req, res) => {
  res.render("./pages/3_signature/signature", {user: req.user});
});

module.exports = router;
