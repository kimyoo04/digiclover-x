const User = require("../models/user");

module.exports = class UsersController {
  // Get - 로그인

  static async apiGetLocalLogInUser(req, res, next) {}

  // Post - 회원가입

  static async apiPostUser(req, res, next) {
    const bcrypt = require("bcrypt");

    const {email, company, name, phone, password} = req.body.data;
    console.log(email);

    try {
      const exUser = await User.findOne({where: {email}});
      if (exUser) {
        return res.redirect("/signin?error=exist"); // 프론트 작업 필요
      }
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        company,
        name,
        phone,
        password: hash,
      });
      return res.json({result: "success"});
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  // Get - 유저 프로필 정보

  static async apiGetUserbyId(req, res, next) {}
};
