const express = require("express");
const router = express.Router();
const AuthCtrl = require("../controllers/auth.controller.js");
const {isNotLoggedIn, isLoggedIn} = require("../util/authJWT.js");

// Post - 회원가입

router.route("/signin").post(isNotLoggedIn, AuthCtrl.apiPostOneUser);

// Post - 로컬 로그인 (JWT Callback)

router
  .route("/local-login")
  .post(isNotLoggedIn, AuthCtrl.apiPostLocalLogInUser);

// Get - 카카오 로그인 페이지 이동
// Get - 카카오 로그인 콜백

router.route("/kakao").get(isNotLoggedIn, AuthCtrl.apiGetKakaoLogIn);
router
  .route("/kakao/callback")
  .get(
    isNotLoggedIn,
    AuthCtrl.apiGetKakaoLogInCallback,
    AuthCtrl.apiRedirectJWT
  );

// Get - 구글 로그인
// Get - 구글 로그인 콜백

router.route("/google").get(isNotLoggedIn, AuthCtrl.apiGetGoogleLogin);
router
  .route("/google/callback")
  .get(
    isNotLoggedIn,
    AuthCtrl.apiGetGoogleLoginCallback,
    AuthCtrl.apiRedirectJWT
  );

// Get - 로그아웃

router.get("/logout", (req, res) => {
  req.logout();
  res.json({msg: "로그아웃 성공!"});
});

module.exports = router;
