//----------------------------------------------------------------
// html의 form 데이터를 전자문서화 페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const compression = require("compression");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const Document = require("../models/document.js");
dotenv.config();

// lib 폴더 세팅
const template = require("../lib/template.js");
const {isAuthenticated} = require("../lib/auth.js");

// public 폴더 정적파일 연결
router.use(express.static(path.join(__dirname, "../public")));

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

//------------------------------ 추가 모듈  ------------------------------
const {jsPDF} = require("jspdf");

//------------------------------ 코드 시작 ------------------------------
//------------------------------ 1. 회사 및 계약자 선택 ------------------------------

router.get("/select-conpanies", (req, res) => {
  res.render("select-companies");
});

router.post("/select-companies", (req, res) => {
  const {
    companyName1,
    contractorName1,
    contractorPhone1,
    contractorEmail1,
    companyName2,
    contractorName2,
    contractorPhone2,
    contractorEmail2,
  } = req.body;

  req.session.info = {
    companyName1: companyName1,
    contractorName1: contractorName1,
    contractorPhone1: contractorPhone1,
    contractorEmail1: contractorEmail1,

    companyName2: companyName2,
    contractorName2: contractorName2,
    contractorPhone2: contractorPhone2,
    contractorEmail2: contractorEmail2,
  };

  res.redirect(`/convert/select-docukind`); //수정필요
  console.log("1. 회사 및 계약자 선택 완료");
});

//------------------------------ 2. 문서 종류 선택 ------------------------------

router.get("/select-docukind", (req, res) => {
  // 회사, 계약자 정보 할당

  res.render("select-docukind", {
    companyName1: req.session.info.companyName1,
    contractorName1: req.session.info.contractorName1,
    companyName2: req.session.info.companyName2,
    contractorName2: req.session.info.contractorName2,
  });
});

router.post("/select-docukind", (req, res) => {
  // 세션에 문서 종류 저장
  req.session.docukind = {
    docukindName: req.body.docukind,
  };

  res.redirect(`/convert/writing`); //수정필요
  console.log("2. 문서 종류 선택 완료");
});

//------------------------------ 3. 문서 작성 및 PDF 생성 ------------------------------

router.get("/writing", (req, res) => {
  // 회사, 계약자 정보 할당

  res.render("writing", {
    companyName1: req.session.info.companyName1,
    contractorName1: req.session.info.contractorName1,
    companyName2: req.session.info.companyName2,
    contractorName2: req.session.info.contractorName2,
    docukindName: req.session.docukind.docukindName,
  });
});

router.post("/writing", async (req, res, next) => {
  let post = req.body;

  const pageWidth = 210,
    pageHeight = 297,
    margin = 20,
    maxLineWidth = pageWidth - margin * 2,
    centerXPos = maxLineWidth / 2 + margin,
    ptsPerMm = 3.781;

  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: [pageWidth, pageHeight], //[210,297]
    filters: ["ASCIIHexEncode"],
  }).setProperties({title: "String Splitting"});

  // customfont 작업
  let NanumGothicRegular = require("../public/assets/font/Nanum_Gothic/NanumGothic-Regular-normal.js"),
    NanumGothicBold = require("../public/assets/font/Nanum_Gothic/NanumGothic-Bold-normal.js"),
    NanumGothicExtraBold = require("../public/assets/font/Nanum_Gothic/NanumGothic-ExtraBold-normal.js");
  doc.addFileToVFS("NanumGothic-Regular-normal.ttf", NanumGothicRegular);
  doc.addFont("NanumGothic-Regular-normal.ttf", "NanumGothic", "normal");
  doc.addFileToVFS("NanumGothic-Bold-normal.ttf", NanumGothicBold);
  doc.addFont("NanumGothic-Bold-normal.ttf", "NanumGothic", "bold");
  doc.addFileToVFS("NanumGothic-ExtraBold-normal.ttf", NanumGothicExtraBold);
  doc.addFont("NanumGothic-ExtraBold-normal.ttf", "NanumGothic", "extrabold");
  doc.setFont("NanumGothic");
  doc.setFontSize(12);

  // 레이아웃 세팅
  const title = post.title,
    describe = post.describe,
    indx = post.indx,
    content = post.content,
    indxLength = indx.length;
  let yPos = margin;

  // 텍스트 데이터 pdf에 입력
  // title 입력
  let [textLine, blockHeight] = textProcess(title, 16, maxLineWidth);
  doc.text(textLine, centerXPos, yPos, {align: "center"});
  yPos += blockHeight;

  // describe 입력
  [textLine, blockHeight] = textProcess(describe, 10, maxLineWidth);
  doc.text(textLine, centerXPos, yPos, {align: "center"});
  yPos += blockHeight;

  // indx와 content 입력 반복
  for (let i = 0; i < indxLength; i++) {
    [textLine, blockHeight] = textProcess(indx[i], 12, maxLineWidth);
    doc.text(textLine, margin, yPos + 2);
    yPos += blockHeight;

    [textLine, blockHeight] = textProcess(content[i], 10, maxLineWidth);
    doc.text(textLine, margin, yPos - 2);
    yPos += blockHeight;
  }
  // 서명란 위의 선 입력
  blockHeight = 100;
  yPos += blockHeight;
  doc.setLineWidth(0.1);
  doc.line(margin, yPos, margin + 60, yPos);
  doc.line(centerXPos + 20, yPos, centerXPos + 80, yPos);
  blockHeight = 5;
  yPos += blockHeight;

  // 서명란 입력
  let textValue1 = `${req.session.info.companyName1}  서명자:         ${req.session.info.contractorName1}`;
  [textLine, blockHeight] = textProcess(textValue1, 10, maxLineWidth);
  doc.text(textLine, margin, yPos);
  doc.text("(인)", margin + 53, yPos);

  let textValue2 = `${req.session.info.companyName2}  서명자:         ${req.session.info.contractorName2}`;
  [textLine, blockHeight] = textProcess(textValue2, 10, maxLineWidth);
  doc.text(textLine, centerXPos + 20, yPos);
  doc.text("(인)", centerXPos + 73, yPos);
  yPos += blockHeight;

  // splittext와 blockHeight 생성하는 함수
  function textProcess(valueText, fontSize, maxLineWidth) {
    let text = `${valueText}\n`;
    let textLine = doc
      .setFontSize(fontSize)
      .splitTextToSize(text, maxLineWidth);
    let textHeight = doc.getLineHeight(text) / doc.internal.scaleFactor;
    let lines = textLine.length;
    let blockHeight = lines * textHeight;
    return [textLine, blockHeight];
  }

  // YYYYMMDDHHMMSS 생성하는 함수
  Date.prototype.YYYYMMDDHHMMSS = function () {
    let yyyy = this.getFullYear().toString();
    let MM = pad(this.getMonth() + 1, 2);
    let dd = pad(this.getDate(), 2);
    let hh = pad(this.getHours(), 2);
    let mm = pad(this.getMinutes(), 2);
    let ss = pad(this.getSeconds(), 2);

    return yyyy + MM + dd + hh + mm + ss;
  };

  function pad(number, length) {
    let str = "" + number;
    while (str.length < length) {
      str = "0" + str;
    }
    return str;
  }

  // 현재 날짜, 문서이름, 문서종류이름 저장
  const nowDate = new Date().YYYYMMDDHHMMSS();
  const docuName = title;
  const docukindName = req.session.docukind.docukindName;
  const filePath = `./uploads/made/${nowDate} - ${docuName}.pdf`;

  // pdf 파일 생성
  doc.output("save", filePath);

  // pdf 파일 해시화
  const crypto = require("crypto");
  const fs = require("fs");
  const hash = crypto.createHash("md5");

  const input = fs.createReadStream(filePath);

  input.on("readable", () => {
    const data = input.read();
    if (data) hash.update(data);
  });

  const hashFile = hash.copy().digest("hex");

  // document DB 저장
  try {
    Document.create({
      docuName,
      docukindName,
      hashFile,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }

  console.log("3. PDF 변환 완료");
  res.redirect(`/convert/signning`);
});

//------------------------------ 4. PDF에 서명 ------------------------------
router.get("/signning", (req, res) => {
  res.render("signning");
});

//------------------------------ 5. 이메일 전송 ------------------------------
router.get("/sending", (req, res) => {
  res.render("sending");
});

//------------------------------ PDF TEST ------------------------------

router.get("/pdftest", async (req, res, next) => {
  const pageWidth = 210,
    pageHeight = 297,
    margin = 20,
    maxLineWidth = pageWidth - margin * 2,
    centerXPos = maxLineWidth / 2 + margin,
    ptsPerMm = 3.781;

  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: [pageWidth, pageHeight], //[210,297]
    filters: ["ASCIIHexEncode"],
  }).setProperties({title: "String Splitting"});

  let NanumGothicRegular = require("../public/assets/font/Nanum_Gothic/NanumGothic-Regular-normal.js"),
    NanumGothicBold = require("../public/assets/font/Nanum_Gothic/NanumGothic-Bold-normal.js"),
    NanumGothicExtraBold = require("../public/assets/font/Nanum_Gothic/NanumGothic-ExtraBold-normal.js");
  doc.addFileToVFS("NanumGothic-Regular-normal.ttf", NanumGothicRegular);
  doc.addFont("NanumGothic-Regular-normal.ttf", "NanumGothic", "normal");
  doc.addFileToVFS("NanumGothic-Bold-normal.ttf", NanumGothicBold);
  doc.addFont("NanumGothic-Bold-normal.ttf", "NanumGothic", "bold");
  doc.addFileToVFS("NanumGothic-ExtraBold-normal.ttf", NanumGothicExtraBold);
  doc.addFont("NanumGothic-ExtraBold-normal.ttf", "NanumGothic", "extrabold");
  doc.setFont("NanumGothic");
  doc.setFontSize(16);

  for (let i = 0; i < 100; i++) {
    doc.text(
      `${i * 7} ----------------------------------------`,
      margin,
      i * 7
    );
  }
  doc.output("save", `./uploads/test.pdf`);
  console.log("---------------------finish---------------------");
  res.render("test");
});

//------------------------------ convert 메인 페이지 ------------------------------
router.get("/", (req, res) => {
  res.render("converting");
});

module.exports = router;
