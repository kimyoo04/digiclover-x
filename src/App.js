// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const {sequelize} = require("./models/index.js");
const passportConfig = require("./passport");
const passport = require("passport");
const flash = require("connect-flash");
const app = express();

dotenv.config();
// lib 폴더 세팅
// C:\Bitnami\wampstack-8.1.6-0\mariadb\bin

// 시퀄라이즈 연결
sequelize
  .sync({force: false})
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// 쿠키, 세션, 패스포트, 플래쉬 세팅
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

// public 폴더 정적파일 연결
app.use(express.static(path.join(__dirname, "./public")));

app.use(express.json()); // json 파싱
app.use(express.urlencoded({extended: true})); // form 파싱

app.set("port", process.env.PORT || 8001); // 개발, 배포 포트 적용
// 뷰 엔진에 퍼그 등록
app.engine("pug", require("pug").__express);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 라우터
const indexRouter = require("./routes/index.js"),
  authRouter = require("./routes/auth.js"),
  documentRouter = require("./routes/document.js"),
  selectionRouter = require("./routes/selection.js"),
  sendRouter = require("./routes/send.js"),
  signatureRouter = require("./routes/signature.js"),
  storageRouter = require("./routes/storage.js"),
  profileRouter = require("./routes/profile.js");

// 라우터
app
  .use("/", indexRouter)
  .use("/auth", authRouter)
  .use("/document", documentRouter)
  .use("/selection", selectionRouter)
  .use("/send", sendRouter)
  .use("/signature", signatureRouter)
  .use("/storage", storageRouter)
  .use("/profile", profileRouter);

//------------------------------ 에러 처리 미들웨어  ------------------------------
app.use((req, res, next) => {
  const error = new Error(
    `${req.method} ${req.url} 라우터가 없으니 다른 것을 찾으세요!`
  );
  error.status = 404;
  next(error); // 에러 미들웨어로 넘김
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500).render("error"); // 에러처리를 pug에 띄움
  console.error(res.locals.error);
});

//------------------------------ 서버 연결 ------------------------------
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 작동 중");
});
