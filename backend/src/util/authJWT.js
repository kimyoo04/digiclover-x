const jwt = require("jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  // 토큰 있는 경우
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      console.log("로그인이 필요합니다. - authJWT");
      res.status(401).json({msg: "로그인이 필요합니다."});
      // 401 에러 발생 시 쿠키 삭제는 프론트에서!
    }
  }
  res.status(401).json({msg: "로그인이 필요합니다."});
};

exports.isNotLoggedIn = (req, res, next) => {
  // 토큰 없는 경우
  if (!req.cookies.token) {
    try {
      next();
    } catch (err) {
      next(err);
    }
  } else {
    res.status(401).json({msg: "이미 로그인을 했습니다. - authJWT"});
  }
};
