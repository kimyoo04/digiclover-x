const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id, user.name, user.phone); // 세션에 유저 아이디만 저장
    console.log(
      "================================================ 유저 로그인 --> ",
      user.id
    );
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: {id},
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
};
