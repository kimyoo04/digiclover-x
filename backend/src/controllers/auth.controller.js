import passport from "passport";
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class AuthCtrl {
  //--------------------------------------------------------------------------------
  // Post - 회원가입
  //--------------------------------------------------------------------------------

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
    const token = jwt.sign({id: exUser.id}, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s",
    });

    console.log("Generated Token\n", token);

    // 쿠키 초기화
    if (req.cookies[`${exUser.id}`]) {
      req.cookies[`${exUser.id}`] = "";
    }

    // 쿠키 생성 (name: 유저아이디, value: jwt) (옵션은 server에 설정 됨)
    res.cookie(String(exUser.id), token);

    // 데이터 반환
    return res.status(200).json({msg: "로그인 성공", token});
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
    await passport.authenticate(
      "google",
      {session: false, failureRedirect: "http://localhost:3000/login"},
      async (err, user) => {
        res.cookie(String(), token);
      }
    )(req, res, next);
  }

  static async apiRedirectJWT(req, res, next) {
    const token = req.user.token;
    res.redirect("http://localhost:3000?token=" + token);
  }

  //--------------------------------------------------------------------------------
  // Post - 로그아웃
  //--------------------------------------------------------------------------------
  static async apiPostLogout(req, res, next) {
    res.clearCookie(`${req.id}`);
    req.cookies[`${req.id}`] = "";
    return res.status(200).json({msg: "로그아웃 성공"});
  }
};
