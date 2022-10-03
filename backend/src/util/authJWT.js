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
        res.clearCookie(`authorization`);
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
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    res.clearCookie(tokenName);
    req.cookies[tokenName] = "";
    return res.status(400).json({msg: "토큰을 찾을 수 없습니다."});
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      res.clearCookie(tokenName);
      req.cookies[tokenName] = "";
      console.log(err);
      return res.status(403).json({msg: "인증 실패."});
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s",
    });
    console.log("Regenerated Token\n", token);

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    // 유저 아이디 저장
    req.id = user.id;
    next();
  });
};
