import passport from "passport";
import authDAO from "../dao/authDAO";
import {generateJwtToken} from "../util/generateToken";
const Users = require("../models/user");
const bcrypt = require("bcrypt");

export const tokenName = "authToken";

module.exports = class AuthCtrl {
  //--------------------------------------------------------------------------------
  // Post - 회원가입
  //--------------------------------------------------------------------------------
  static async apiPostOneUser(req, res, next) {
    const {email, company, name, phone, password} = req.body.data;

    // 비밀번호 헤시화
    const hash = await bcrypt.hash(password, 12);

    // 회원가입, DB 저장
    let response = await authDAO.postOneUser(email, company, name, phone, hash);

    return res.json(response);
  }

  //--------------------------------------------------------------------------------
  // Post - 로컬 로그인
  //--------------------------------------------------------------------------------
  static async apiPostLocalLogInUser(req, res, next) {
    const {email, password} = req.body;

    // 이메일 일치하는 유저 확인
    const exUser = await Users.findOne({
      where: {email},
      raw: true,
    });

    let isPasswordMatch;
    // 이메일 일치하면 비밀번호 일치 검사
    if (exUser) {
      isPasswordMatch = await bcrypt.compare(password, exUser.password);

      // 이메일 일치하지 않으면 에러
    } else {
      return res.status(400).send({
        msg: "일치하는 이메일이 없습니다.",
      });
    }

    // 비밀번호 일치하지 않으면 에러
    if (!isPasswordMatch) {
      return res.status(400).send({
        msg: "비밀번호가 일치하지 않습니다.",
      });
    }

    // jwt 생성
    const token = generateJwtToken(exUser.id);

    // 쿠키 초기화
    if (req.cookies[tokenName]) {
      req.cookies[tokenName] = "";
    }

    // 쿠키 생성 (name: 유저아이디, value: jwt) (옵션은 server에 설정 됨)
    res.cookie(tokenName, token);

    // 데이터 반환
    return res.status(200).json({data: {msg: "로그인 성공", token}});
  }

  //--------------------------------------------------------------------------------
  // Get - JWT 로그인 콜백
  //--------------------------------------------------------------------------------
  static async apiGetJWTLogInCallback(req, res, next) {
    await passport.authenticate("jwt", {
      failureRedirect: "http://localhost:3000/login",
      session: false,
    })(req, res, next);
  }

  //--------------------------------------------------------------------------------
  // Get - 카카오 로그인
  //--------------------------------------------------------------------------------
  static async apiGetKakaoLogIn(req, res, next) {
    await passport.authenticate("kakao")(req, res, next);
  }

  //--------------------------------------------------------------------------------
  // Get - 구글 로그인
  //--------------------------------------------------------------------------------
  static async apiGetGoogleLogin(req, res, next) {
    await passport.authenticate("google", {scope: ["profile", "email"]})(
      req,
      res,
      next
    );
  }

  //--------------------------------------------------------------------------------
  // Get - 카카오 로그인 콜백
  //--------------------------------------------------------------------------------
  static async apiGetKakaoLogInCallback(req, res, next) {
    await passport.authenticate("kakao", {
      failureRedirect: "http://localhost:3000/login",
      session: false,
    })(req, res, next);
  }

  //--------------------------------------------------------------------------------
  // Get - 구글 로그인 콜백
  //--------------------------------------------------------------------------------
  static async apiGetGoogleLoginCallback(req, res, next) {
    await passport.authenticate("google", {
      failureRedirect: "http://localhost:3000/login",
      session: false,
    })(req, res, next);
  }

  //--------------------------------------------------------------------------------
  // jwt 쿠키 저장
  //--------------------------------------------------------------------------------
  static async apiSendJWT(req, res, next) {
    res.cookie(tokenName, req.user.token);
    res.redirect("http://localhost:3000");
  }

  //--------------------------------------------------------------------------------
  // Post - 로그아웃
  //--------------------------------------------------------------------------------
  static async apiPostLogout(req, res, next) {
    res.clearCookie(tokenName);
    req.cookies[tokenName] = "";
    return res.status(200).json({data: {msg: "로그아웃 성공"}});
  }

  //--------------------------------------------------------------------------------
  // Get - 토큰 재발급 및 로그인 유지
  //--------------------------------------------------------------------------------
  static async apiGetRefreshToken(req, res, next) {
    res.clearCookie(tokenName);
    req.cookies[tokenName] = "";

    const token = generateJwtToken(req.id);
    console.log("Regenerated Token\n", token);

    res.cookie(tokenName, token);
    res.json({data: {msg: "Regenerated Token"}});
  }
};
