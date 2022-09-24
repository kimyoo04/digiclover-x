import passport from "passport";

module.exports = class AuthCtrl {
  // Get - 로컬 로그인

  static async apiGetLocalLogInUser(req, res, next) {
    await passport.authenticate("local", (err, user, info) => {
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
      successRedirect: "http://localhost:3000/",
      failureRedirect: "http://localhost:3000/login",
    })(req, res, next);
  }

  // Get - 구글 로그인 콜백

  static async apiGetGoogleLoginCallback(req, res, next) {
    await passport.authenticate("google", {
      successRedirect: "http://localhost:3000/",
      failureRedirect: "http://localhost:3000/login",
      // session: false, // 세션 대신 토큰을 사용할 때
    })(req, res, next);
    // function (req, res) {
    //   var token = req.user.token; 토큰 저장 및 리다이렉트
    //   res.redirect("http://localhost:3000?token=" + token);
    // };
  }

  // Post - 로그아웃

  static async apiPostLogOut(req, res, next) {
    req.logout();
    req.session.destroy();
    res.json({message: "Success Delete."});
  }
};
