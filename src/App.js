const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const jsPDF = require("jspdf");
const iconv = require("iconv-lite");

const multer = require("multer");
const _storage = multer.diskStorage({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.substring(0, "image".length) == "image" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  destination: function (request, file, cb) {
    if (file.mimetype.substring(0, "image".length) == "image") {
      cb(null, "uploads/img");
    } else if (file.mimetype === "application/pdf") {
      cb(null, "uploads/pdf");
    } else if (file.mimetype === "application/word") {
      cb(null, "uploads/docu");
    }
  },
  filename: function (request, file, cb) {
    // cb(null, file.originalname + "-" + Date.now());
    // 한글 인코딩 해결
    cb(null, iconv.decode(file.originalname, "utf-8").toString());
  },
});
const upload = multer({storage: _storage});

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
  var file = request.file;
  var filename = file.originalname; // 기존 파일명
  var name = file.filename; // 디스크 스토리지 파일명
  console.log(file);
  console.log(filename);
  console.log(name);
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
