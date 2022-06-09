const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const compression = require("compression");
const template = require("../lib/template.js");
var db = require("../lib/db");

router.use(express.static("public")); //public 폴더 안에 static 파일들을 찾겟다.
router.use(bodyParser.urlencoded({extended: false})); // body-parser 미들웨어 실행
router.use(compression()); // compression 미들웨어 실행
