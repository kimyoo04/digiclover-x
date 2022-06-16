// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
dotenv.config();
const app = express();

// lib 폴더 세팅
const db = require("./lib/db"); // C:\Bitnami\wampstack-8.1.6-0\mariadb\bin

app.use(morgan("dev")); // "combined"
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
    },
    name: "connect.sid",
  })
);

// public 폴더 정적파일 연결
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json()); // json 파싱
app.use(express.urlencoded({extended: true})); // form 파싱

// 뷰 엔진에 퍼그 등록
app.engine("pug", require("pug").__express);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 라우터
const indexRouter = require("./routes/index.js");
const authRouter = require("./routes/auth.js");
const convertRouter = require("./routes/convert.js");
const documentRouter = require("./routes/document.js");
const storageRouter = require("./routes/storage.js");

// 라우터
app
  .use("/", indexRouter)
  .use("/auth", authRouter)
  .use("/convert", convertRouter)
  .use("/document", documentRouter)
  .use("/storage", storageRouter);

//------------------------------ 에러 처리 미들웨어  ------------------------------
app.use((req, res, next) => {
  res.status(200).send("sorry cant find that!"); // 404에러를 200으로 속임
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something broke!"); // 에러처리
});

//------------------------------ 서버 연결 ------------------------------
app.listen(3000, () => {
  console.log(
    "--------------------------------작동!--------------------------------"
  );
});
