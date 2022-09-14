//----------------------------------------------------------------
// 전자문서들 저장 페이지
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

// db
const Signature = require("../models/signature.js");
const Document = require("../models/document.js");
const {Op, fn, col} = require("sequelize");

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

//------------------------------ 문서화 관리 페이지 ------------------------------

router.get("/", isAuthenticated, async (req, res) => {
  const signatures = await Signature.findAll({
    where: {
      contractorPhone: req.user.phone,
    },
    group: ["DocumentId"],
    raw: true,
  });
  console.log(
    `================================================ 유저의 폰번호와 같은 signature rows`,
    signatures
  );

  // [ { documentId: 1 }, { documentId: 2 }]
  // => [1, 2]
  const documentIds = [];
  signatures.forEach((signature) => {
    documentIds.push(signature.DocumentId);
  });

  // 로그인한 유저의 폰과 일치하는 문서들 할당
  const documents = await Document.findAll({
    group: "id",
    attributes: {
      include: ["id", "docuName", "hashFile", "createdAt"],
      exclude: ["docukindName", "deletedAt"],
    },
    where: {
      id: {
        [Op.in]: documentIds,
      },
    },
    raw: true,
  });
  console.log(
    "================================================ 문서 보관함 용 documents",
    documents
  );

  // 로그인한 유저의 폰과 일치하는 문서들 할당
  const docuSignatures = await Signature.findAll({
    attributes: {
      exclude: ["deletedAt"],
    },
    where: {
      DocumentId: {
        [Op.in]: documentIds,
      },
    },
    raw: true,
  });
  console.log(
    "================================================ 문서 보관함 용 docuSignatures",
    docuSignatures
  );

  res.render("./pages/4_storage/storage", {
    user: req.user,
    documents,
    docuSignatures,
  });
});

module.exports = router;
