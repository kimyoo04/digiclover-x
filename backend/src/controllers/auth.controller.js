import passport from "passport";
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class AuthCtrl {
  // Post - 회원가입

  static async apiPostOneUser(req, res, next) {
    const {email, company, name, phone, password} = req.body.data;

    // 비밀번호 헤시화
    const hash = await bcrypt.hash(password, 12);

    // 회원가입, DB 저장
    let response = await usersDAO.postOneUser(
      email,
      company,
      name,
      phone,
      hash
    );

    return res.json(response);
  }

  // Post - 로컬 로그인

  static async apiPostLocalLogInUser(req, res, next) {
    const {email, password} = req.body;
    const exUser = await Users.findOne({
      where: {email},
      raw: true,
    });
    let isPasswordMatch;

    console.log(exUser);
    // 이메일 일치하면
    if (exUser) {
      isPasswordMatch = await bcrypt.compare(password, exUser.password);
    } else {
      return res.status(401).send({
        success: false,
        msg: "일치하는 이메일이 없습니다.",
      });
    }

    // 비밀번호 일치하지 않으면
    if (!isPasswordMatch) {
      return res.status(401).send({
        success: false,
        msg: "비밀번호가 일치하지 않습니다.",
      });
    }

    const payload = {
      id: exUser.id,
    };

    const token = jwt.sign(payload, "Random string", {expiresIn: "1d"});

    return res.status(200).json({
      success: true,
      message: "로그인에 성공했습니다.",
      token: "Bearer " + token,
    });
  }

  // Get - JWT 로그인 콜백

  static async apiGetJWTLogInCallback(req, res, next) {
    await passport.authenticate("jwt", {
      failureRedirect: "http://localhost:3000/login",
      session: false,
    })(req, res, next);
  }

  // Get - 카카오 로그인

  static async apiGetKakaoLogIn(req, res, next) {
    await passport.authenticate("kakao")(req, res, next);
  }

  // Get - 구글 로그인

  static async apiGetGoogleLogin(req, res, next) {
    await passport.authenticate("google", {scope: ["profile", "email"]})(
      req,
      res,
      next
    );
  }

  // Get - 카카오 로그인 콜백

  static async apiGetKakaoLogInCallback(req, res, next) {
    await passport.authenticate("kakao", {
      failureRedirect: "http://localhost:3000/login",
      session: false,
    })(req, res, next);
  }

  // Get - 구글 로그인 콜백

  static async apiGetGoogleLoginCallback(req, res, next) {
    await passport.authenticate("google", {
      failureRedirect: "http://localhost:3000/login",
      session: false,
    })(req, res, next);
  }

  static async apiRedirectJWT(req, res, next) {
    const token = req.user.token;
    res.redirect("http://localhost:3000?token=" + token);
  }
};
