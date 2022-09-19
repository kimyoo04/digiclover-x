//--------------------------------------------------------------------------------
// 모듈 세팅
//--------------------------------------------------------------------------------
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

// public 폴더 정적파일 연결
app.use(express.static(path.join(__dirname, "../client/public")));

app.use(cors({orgin: true, credentials: true})); //cors 오류 해결
app.use(express.json()); // json 파싱
app.use(express.urlencoded({extended: true})); // form 파싱
app.set("port", process.env.PORT || 8001); // 개발, 배포 포트 적용

//--------------------------------------------------------------------------------
// 라우터
//--------------------------------------------------------------------------------
const documents = require("./routes/documents.route.js"),
  users = require("./routes/users.route.js");

app.use("/documents", documents);
app.use("/users", users);

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

module.exports = app;
