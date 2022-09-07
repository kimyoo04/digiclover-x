const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          // 계정 DB 유무 체크
          const exUser = await User.findOne({
            where: {snsId: profile.id, provider: "kakao"},
          });
          if (exUser) {
            done(null, exUser);
          } else {
            //계정이 DB에 없을 때 로우 생성
            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              name: profile._json.kakao_account.name,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
