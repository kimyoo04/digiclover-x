const express = require("express");
const DocumentsCtrl = require("./documents.controller.js");
const SignaturesCtrl = require("./signatures.controller.js");
const router = express.Router();

//--------------------------------------------------------------------------------
// 새션으로 유저정보를 바로 제공 가능?

// 유저별 전체 문서 조회
router.route("/").get(DocumentsCtrl.apiGetDocuments);

// 유저별 특정 문서 조회
router.route("/id/:id").get(DocumentsCtrl.apiGetDocumentById);
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// 특정 유저가 생성해서 계약을 진행한 특정 문서 조회, 생성, 수정, 삭제
router
  .route("/id/:id/user")
  .post(DocumentsCtrl.apiPostOneDocument)
  .put(DocumentsCtrl.apiUpdateOneDocument)
  .delete(DocumentsCtrl.apiDeleteOneDocument);
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// 서명하지 않은 문서들 조회
router.route("/notSigned").get(DocumentsCtrl.apiGetDocumentNotSigned);

// 서명한 문서들 조회
router.route("/Signed").get(DocumentsCtrl.apiGetDocumentSigned);
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// 문서를 서명했을 때 signature row 수정
router
  .route("/id/:id/signature/:signature_id")
  .put(SignaturesCtrl.apiUpdateSignature);
//--------------------------------------------------------------------------------

module.exports = router;