const express = require("express");
const upload = require("express-fileupload");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//--------------------------------------------------------------------

const app = express();
app.use(bodyParser.urlencoded({extended: false})); //
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 적용 (img, css)
app.use(upload());

// 뷰 엔진에 퍼그 등록
app.engine("pug", require("pug").__express);
app.set("views", path.join(__dirname, "views")); // 현재 디렉토리에서 views 폴더를 의미
app.set("view engine", "pug");

//--------------------------------------------------------------------

// pug render test
app.get("/", (req, res) => {
  res.render("index");
});

// pug file upload test
app.post("/", (req, res) => {
  if (req.files) {
    // console.log(req.files);

    var file = req.files.file;
    var filename = file.name;
    console.log(filename);

    // 업로드 파일 경로 이동 및 메시지 출력
    file.mv("./uploads/" + filename, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("File Uploaded");
      }
    });
  }
});

//--------------------------------------------------------------------

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/login", (req, res) => {
  res.render("login");
});

//--------------------------------------------------------------------

app.get("/waitforauth", (req, res) => {
  res.render("wait_for_auth");
});

app.get("/documentation", (req, res) => {
  res.render("documentation");
});

app.get("/certification", (req, res) => {
  res.render("certification");
});

app.post("/waitforauth", (req, res) => {
  if (req.files) {
    // console.log(req.files);

    var file = req.files.file;
    var filename = file.name;
    console.log(filename);

    // 업로드 파일 경로 이동 및 메시지 출력
    file.mv("./uploads/" + filename, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.render("wait_for_auth");
      }
    });
  }
});

//--------------------------------------------------------------------

// 서버 연결
app.listen(3000, () => {
  console.log("Connected, 3000 port!");
});
