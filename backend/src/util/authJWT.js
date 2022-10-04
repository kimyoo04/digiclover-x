const jwt = require("jsonwebtoken");
const {tokenName} = require("../controllers/auth.controller");

//--------------------------------------------------------------------------------
// 토큰 인증되는 경우 next()
//--------------------------------------------------------------------------------
exports.verifyIsToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    res.status(404).json({msg: "토큰을 찾을 수 없습니다."});
  } else {
    console.log(cookies);
    const token = cookies.split("=")[1];
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        res.clearCookie(tokenName);
        return res.status(400).json({msg: "토큰 인증 실패로 로그아웃 됩니다."});
      }

      // 유저 아이디 저장
      req.id = user.id;
    });
    next();
  }
};

//--------------------------------------------------------------------------------
// 쿠키 없는 경우 next()
//--------------------------------------------------------------------------------
exports.verifyIsNotToken = (req, res, next) => {
  const cookies = req.headers.cookie;

  // 쿠키 있는 경우
  if (cookies) {
    console.log(cookies);
    const token = cookies.split("=")[1];
    if (token) res.status(404).json({msg: "이미 쿠키가 존재합니다."});

    // 쿠키 없는 경우
  } else {
    next();
  }
};

//--------------------------------------------------------------------------------
// 토큰 갱신 후 next()
//--------------------------------------------------------------------------------
exports.refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (cookies) {
    // cookies 가 있는 경우

    const prevToken = cookies.split("=")[1];

    if (!prevToken) {
      // prevToken이 없는 경우

      res.clearCookie(tokenName);
      req.cookies[tokenName] = "";
      return res.status(400).json({msg: "토큰을 찾을 수 없습니다."});
    } else {
      // prevToken이 있는 경우

      jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          res.clearCookie(tokenName);
          req.cookies[tokenName] = "";
          console.log(err);
          return res.status(403).json({msg: "인증 실패."});
        }

        // 유저 아이디 저장
        req.id = user.id;
        next();
      });
    }
  } else {
    // cookies 가 없는 경우
    res.clearCookie(tokenName);
    req.cookies[tokenName] = "";
    return res.status(400).json({msg: "토큰을 찾을 수 없습니다."});
  }
};
