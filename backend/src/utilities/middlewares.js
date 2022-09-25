exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({message: "로그인이 필요한 서비스입니다."});
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({message: "로그인하지 않은 사용자만 접근 가능합니다."});
  }
};

// exports.isWrongId = (req, res, next) => {
//   const {id} = req.params
//   if (typeof id == )
//   const error = new Error(`${req.method} ${req.url} 존재하지 않는 API 입니다.`);
//   error.status = 404;
//   next(error); // 아래 미들웨어로 넘김
// };
