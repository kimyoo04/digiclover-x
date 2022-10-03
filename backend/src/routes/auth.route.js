const express = require("express");
const router = express.Router();
const AuthCtrl = require("../controllers/auth.controller.js");
const {verifyIsNotToken, verifyIsToken} = require("../util/authJWT.js");

// Post - 회원가입

router.route("/signin").post(verifyIsNotToken, AuthCtrl.apiPostOneUser);

// Post - 로컬 로그인 (JWT Callback)

router
  .route("/local-login")
  .post(verifyIsNotToken, AuthCtrl.apiPostLocalLogInUser);

// Post - 로그아웃

router.route("/logout").post(AuthCtrl.apiPostLogout);

// Get - 토큰 재발급 및 로그인 유지

router.route("/refresh-token").get(verifyIsToken, AuthCtrl.apiGetRefreshToken);

// Get - 카카오 로그인 페이지 이동
// Get - 카카오 로그인 콜백

router.route("/kakao").get(verifyIsNotToken, AuthCtrl.apiGetKakaoLogIn);
router
  .route("/kakao/callback")
  .get(
    verifyIsNotToken,
    AuthCtrl.apiGetKakaoLogInCallback,
    AuthCtrl.apiSendJWT
  );

// Get - 구글 로그인
// Get - 구글 로그인 콜백

router.route("/google").get(verifyIsNotToken, AuthCtrl.apiGetGoogleLogin);
router
  .route("/google/callback")
  .get(
    verifyIsNotToken,
    AuthCtrl.apiGetGoogleLoginCallback,
    AuthCtrl.apiSendJWT
  );

module.exports = router;
