//----------------------------------------------------------------
// 홈페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const router = express.Router();
dotenv.config();

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

//------------------------------ 홈페이지 ------------------------------
router.get("/", (req, res) => {
  res.render("./pages/0_home/index", {user: req.user});
});

module.exports = router;
