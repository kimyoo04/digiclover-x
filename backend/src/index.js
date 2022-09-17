//--------------------------------------------------------------------------------
// 모듈 세팅
//--------------------------------------------------------------------------------
const app = require("./server.js");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passportConfig = require("./passport");
const passport = require("passport");
const flash = require("connect-flash");
const dotenv = require("dotenv");
dotenv.config();

const {sequelize} = require("./models/index.js"); // import db models

//--------------------------------------------------------------------------------
// 쿠키, 세션, 패스포트, 플래쉬 세팅
//--------------------------------------------------------------------------------
app.use(morgan("dev")); // "combined"
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "connect.sid",
  })
);
passportConfig();
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//--------------------------------------------------------------------------------
// 테이블 삭제 순서 지킬 것!
//--------------------------------------------------------------------------------
// const Document = from "./models/document";
// const User = from "./models/user";
// const Signature = from "./models/signature";
// Signature.drop();
// Document.drop();
// User.drop();

//--------------------------------------------------------------------------------
// 시퀄라이즈 연결
//--------------------------------------------------------------------------------
sequelize
  .sync({force: true})
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

//--------------------------------------------------------------------------------
// 서버 연결
//--------------------------------------------------------------------------------
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 작동 중");
});
