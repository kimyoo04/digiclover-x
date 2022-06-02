var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const path = require("path");
var fs = require("fs");

//--------------------------------------------------------------------

app.use(bodyParser.urlencoded({extended: false})); //
app.locals.pretty = true; // jade를 썼을 때 html코드를 깔끔하게 정리해준다.

// 뷰 엔진에 퍼그 등록
app.engine("pug", require("pug").__express);
app.set("views", path.join(__dirname, "views")); // 현재 디렉토리에서 views폴더를 의미
app.set("view engine", "pug");

app.get("/topic/new", function (req, res) {
  res.render("new"); //html이나 탬플릿을 적용해서 화면에 보여준다.
});

app.post("/topic", function (req, res) {
  res.send("Hi, post");
});

//--------------------------------------------------------------------

// 서버 연결
app.listen(3000, function () {
  console.log("Connected, 3000 port!");
});
