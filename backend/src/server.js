//--------------------------------------------------------------------------------
// 모듈 세팅
//--------------------------------------------------------------------------------
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config();
app.use(morgan("dev")); // "combined"

// public 폴더 정적파일 연결
app.use(express.static(path.join(__dirname, "../client/public")));
cors({
  origin: "http://localhost:3000",
  credentials: true,
}); //cors 오류 해결
app.use(express.json()); // json 파싱
app.use(express.urlencoded({extended: true})); // form 파싱
app.set("port", process.env.PORT || 8001); // 개발, 배포 포트 적용

//--------------------------------------------------------------------------------
// 테이블 삭제 순서 지킬 것!
//--------------------------------------------------------------------------------
// const Document = require("./models/document");
// const User = require("./models/user");
// const Signature = require("./models/signature");
// Signature.drop();
// Document.drop();
// User.drop();

//--------------------------------------------------------------------------------
// 시퀄라이즈 연결
//--------------------------------------------------------------------------------
const {sequelize} = require("./models/index.js"); // import db models
sequelize
  .sync({force: false})
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

//--------------------------------------------------------------------------------
// 쿠키, 세션, 패스포트, 플래쉬 세팅
//--------------------------------------------------------------------------------
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Content-Language, Accept, Accept-Language,"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", ["GET", "PUT", "POST", "DELETE"]);
  next();
});

app.use(
  cookieParser({
    resave: false, // 강제 저장 설정
    saveUninitialized: true, // 빈값 저장
    // secret: process.env.COOKIE_SECRET, // 비밀키 적용
    path: "/", // 도메인 내 전체에 쿠키 적용
    httpOnly: true, // 자바스크립트 접근 제한 걸기
    secure: false, // https 프로토콜 허용 유무
    sameSite: "none", // lax로 설정하면 도메인이 다를 때 쿠키 저장 안됨
    expires: new Date(Date.now() + 1000 * 30), // 30s
  })
); // process.env.COOKIE_SECRET
require("./passport")(passport);
app.use(passport.initialize());

//--------------------------------------------------------------------------------
// 라우터
//--------------------------------------------------------------------------------
const documents = require("./routes/documents.route.js");
const user = require("./routes/user.route.js");
const auth = require("./routes/auth.route.js");

app.use("/auth", auth);
app.use("/user", user);
app.use("/documents", documents);

//--------------------------------------------------------------------------------
// 에러 처리 미들웨어
//--------------------------------------------------------------------------------
app.use("*", (req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 존재하지 않는 API 입니다.`);
  error.status = 404;
  next(error); // 아래 미들웨어로 넘김
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500).json({error: "error"});
  console.error(res.locals.error);
});

//--------------------------------------------------------------------------------
// 서버 연결
//--------------------------------------------------------------------------------
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 작동 중");
});
