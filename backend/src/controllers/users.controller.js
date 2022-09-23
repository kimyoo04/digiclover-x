import usersDAO from "../dao/usersDAO";
import passport from "passport";

module.exports = class UsersCtrl {
  // Get - 로컬 로그인

  static async apiGetLocalLogInUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) console.error(err);
      if (!user && info) {
        res.status(401).json(info);
      } else {
        req.login(user, (err) => {
          if (err) throw console.error(err);
          console.log(req.user);
          res.status(200).json(user);
        });
      }
    })(req, res, next);
  }

  // Get - 카카오 로그인 페이지 이동

  static async apiGetKakaoLogIn(req, res, next) {
    passport.authenticate("kakao");
  }

  // Get - 카카오 로그인 성공 후 로그인 진행

  static async apiGetKakaoLogInCallback(req, res, next) {
    passport.authenticate("kakao", {
      failureRedirect: "/",
    }),
      (req, res) => {
        res.json({result: "kakao-login success"});
      };
  }

  // Get - 구글 로그인

  static async apiGetGoogleLogin(req, res, next) {
    passport.authenticate("google", {scope: ["profile", "email"]});
  }

  // Get - 구글 로그인 콜백

  static async apiGetGoogleLoginCallback(req, res, next) {
    passport.authenticate("google", {
      failureRedirect: "/",
      session: false,
    }),
      function (req, res) {
        var token = req.user.token;
        res.redirect("http://localhost:3000?token=" + token);
      };
  }

  // Post - 로그아웃

  static async apiPostLogOut(req, res, next) {
    req.logout();
    req.session.destroy();
    res.json({message: "Success Delete."});
  }

  //----------------------------------------------------

  // Get - 회원조회

  static async apiGetUserById(req, res, next) {
    let {id} = req.params;
    // id 디시리얼라이즈 하기

    // id 인수 함수 안에서 복호화 후 id 값을 검색한다고 가정
    const response = await usersDAO.getUserById(id);

    console.log("apiGetUserbyId - success");
    return res.json(response);
  }

  // Post - 회원가입

  static async apiPostOneUser(req, res, next) {
    const bcrypt = require("bcrypt");
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

  // Delete - 회원탈퇴

  static async apiDeleteUserById(req, res, next) {
    let {id} = req.params;
    // id 디시리얼라이즈 하기

    await usersDAO.deleteUserById(id);

    console.log("apiDeleteUserById - success");
    return res.json({result: "success"});
  }

  // Put - 회원정보수정

  static async apiPutUserById(req, res, next) {
    const {id} = req.params;
    // id 디시리얼라이즈 하기

    const {email, company, name, phone} = req.body.data;

    await usersDAO.putUserById(id, email, company, name, phone);

    console.log("apiPutUserById - success");
    return res.json({result: "success"});
  }
};
