const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const jsPDF = require("jspdf");
const upload = require("./lib/uploader.js");

//------------------------------ 세팅들 ------------------------------

const app = express();
app.use(bodyParser.urlencoded({extended: false})); // bodyParser 실행
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 적용 (img, css, js)
console.log(__dirname);
app.use("/user", express.static("uploads/pdf")); // uploads/pdf 폴더를 웹주소 /user로 접근

// 뷰 엔진에 퍼그 등록
app.engine("pug", require("pug").__express);
app.set("views", path.join(__dirname, "views")); // 현재 디렉토리에서 views 폴더를 의미
app.set("view engine", "pug");

//------------------------------ 로그인 페이지 ------------------------------

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/login", (req, res) => {
  res.render("login");
});

//------------------------------ 문서화 관리 페이지 ------------------------------

app.get("/waitforauth", (req, res) => {
  res.render("wait_for_auth");
});

app.get("/documentation", (req, res) => {
  res.render("documentation");
});

app.get("/certification", (req, res) => {
  res.render("certification");
});

//------------------------------ HTML to PDF  ------------------------------

app.get("/converting", (req, res) => {
  res.render("converting");
});

//------------------------------ PDF 업로드 및 파일 저장 ------------------------------

app.post("/upload_process", upload.single("userfile"), (request, response) => {
  /* 
  fieldname: 'userfile',
  originalname: 'BÃ«t-Bi_Image_Sheet.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: 'b2dd142b24713d3a6025744646cec7da',
  path: 'uploads\\b2dd142b24713d3a6025744646cec7da',
  size: 206230 
  */

  response.redirect(`/waitforauth`);
  console.log("파일 업로드 완료");
});

//------------------------------ 서버 연결 ------------------------------

app.listen(3000, () => {
  console.log("Connected, 3000 port!");
});

//------------------------------ HTML to PDF 페이지  ------------------------------

app.get("/converting", (req, res) => {
  res.render("converting");
});

//------------------------------ PDF 생성 ------------------------------

app.post(".converting", (req, res) => {
  var post = req.body;
  var title = post.title;
  var description = post.description;

  const doc = new jsPDF({
    orientation: "p", // "portrait" or "landscape" (or shortcuts "p" or "l").
    unit: "mm", // "in" <-- inch
    lineHeight,
    format: "a4", // [4, 2],
  }).setProperties({title: "String Splitting"});

  const pageWidth = 8.5,
    lineHeight = 1.2,
    margin = 0.5,
    maxLineWidth = pageWidth - margin * 2,
    fontSize = 24,
    ptsPerInch = 72,
    oneLineHeight = (fontSize * lineHeight) / ptsPerInch;
  const contentText = post.content;
});
