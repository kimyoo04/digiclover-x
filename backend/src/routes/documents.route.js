const express = require("express");
const DocumentsCtrl = require("../controllers/documents.controller.js");
const SignaturesCtrl = require("../controllers/signatures.controller.js");
const {verifyIsToken} = require("../util/authJWT.js");
const router = express.Router();

router
  .route("/")
  .get(verifyIsToken, DocumentsCtrl.apiGetDocumentsByPages) // 유저별 페이지별 문서 조회
  .post(verifyIsToken, DocumentsCtrl.apiPostOneDocument); // 문서 생성 + 요청자, 수신자 서명 생성

// 문서 id를 URL에 넣고, 세션쿠키의 유저 정보와 비교하기

router
  .route("/:id")
  .get(verifyIsToken, DocumentsCtrl.apiGetDocumentById) // 유저별 특정 문서 1개 조회 (+ 서명 튜플)
  .delete(verifyIsToken, DocumentsCtrl.apiDeleteDocumentById); // 유저별 특정 문서 1개 삭제 (요청자(UserId1과 일치)인 경우에만)

// 이메일 수신자가 문서를 서명했을 때 signature row 수정
// 문서 id, 문서 hashFile을 URL에 넣고, 세션 쿠키의 유저 정보와 비교하기

router
  .route("/:id/:hashFile/signning")
  .put(verifyIsToken, SignaturesCtrl.apiUpdateSignature); // 유저의 서명 수정

module.exports = router;
