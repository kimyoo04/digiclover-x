const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // 이메일 일치
          const exUser = await User.findOne({where: {email}});
          if (exUser) {
            // 비밀번호 일치
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, {message: "Incorrect password."});
            }
          } else {
            done(null, false, {message: "Incorrect email."});
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
