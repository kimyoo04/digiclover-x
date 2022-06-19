//----------------------------------------------------------------
// html의 form 데이터를 전자문서화 페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();
dotenv.config();

// lib 폴더 세팅
const template = require("../lib/template.js");
const db = require("../lib/db");

// public 폴더 정적파일 연결
router.use(express.static(path.join(__dirname, "../public")));

// 쿠키와 세션
router.use(cookieParser(process.env.COOKIE_SECRET));
router.use(
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

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

//------------------------------ 추가 모듈  ------------------------------
const {jsPDF} = require("jspdf");
const docukind = require("../lib/docukind.js");
//------------------------------ 코드 시작 ------------------------------
//------------------------------ 1. 회사 및 계약자 선택 ------------------------------

router.get("/select-conpanies", (req, res) => {
  res.render("select-companies");
});

router.post("/select-companies", (req, res) => {
  let companyName1 = req.body.companyName1;
  let contractorName1 = req.body.contractorName1;
  let contractorPhone1 = req.body.contractorPhone1;
  let contractorEmail1 = req.body.contractorEmail1;

  let companyName2 = req.body.companyName2;
  let contractorName2 = req.body.contractorName2;
  let contractorPhone2 = req.body.contractorPhone2;
  let contractorEmail2 = req.body.contractorEmail2;
  console.log(
    `
    ${companyName1}
    ${contractorName1}
    ${contractorPhone1}
    ${contractorEmail1}
    
    ${companyName2}
    ${contractorName2}
    ${contractorPhone2}
    ${contractorEmail2}
    `
  );

  res.redirect(`/convert/select-docukind`); //수정필요
  console.log("1. 회사 및 계약자 선택 완료");
});

//------------------------------ 2. 문서 종류 선택 ------------------------------

router.get("/select-docukind", (req, res) => {
  res.render("select-docukind");
});

router.post("/select-docukind", (req, res) => {
  let docukind = req.body.docukind;
  console.log(docukind);

  res.redirect(`/convert/writing`); //수정필요
  console.log("2. 문서 종류 선택 완료");
});

//------------------------------ 3. 문서 작성 및 PDF 생성 ------------------------------

router.get("/writing", (req, res) => {
  // 1,2 단계에서 데이터 받아서 아래 변수에 할당
  let companyName1 = "leli";
  let contractorName1 = "kimyoo";
  let companyName2 = "naver";
  let contractorName2 = "haribo";

  res.render("writing", {
    companyName1,
    contractorName1,
    companyName2,
    contractorName2,
  });
});

router.post("/writing", (req, res) => {
  let post = req.body;

  const pageWidth = 210,
    pageHeight = 297,
    lineHeight = 1.2,
    margin = 20,
    maxLineWidth = pageWidth - margin * 2,
    fontSize = 12,
    ptsPerMm = 3.781,
    oneLineHeight = (fontSize * lineHeight) / ptsPerMm;

  const doc = new jsPDF({
    orientation: "p", // "portrait" or "landscape" (or shortcuts "p" or "l").
    unit: "mm", // "in" <-- inch
    lineHeight: lineHeight,
    format: "a4", // [4, 2],
    filters: ["ASCIIHexEncode"],
  }).setProperties({title: "String Splitting"});

  var text;
  for (let [key, value] of Object.entries(post)) {
    let data = `
    제 ${key}조 (변수처리하기-----)\n
    ${value}\n
    `;
    text = text + data;
  }
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

  let textLines = doc
    .setFont("NanumGothic")
    .setFontSize(fontSize)
    .splitTextToSize(text, maxLineWidth);
  doc.text(textLines, margin, margin + 2 * oneLineHeight);

  var textHeight = (textLines.length * fontSize * lineHeight) / ptsPerMm;
  doc
    .setFont("NanumGothic", "extrabold")
    .text("Text Height: " + textHeight + " mm", margin, margin + oneLineHeight);

  res.redirect(`/convert/signning`); //수정필요
  doc.output("save", "./uploads/test.pdf");

  console.log("3. PDF 변환 완료");
});

//------------------------------ 4. PDF에 서명 ------------------------------
router.get("/signning", (req, res) => {
  res.render("signning");
});

//------------------------------ 5. 이메일 전송 ------------------------------
router.get("/sending", (req, res) => {
  res.render("sending");
});

//------------------------------ convert 메인 페이지 ------------------------------
router.get("/", (req, res) => {
  res.render("converting");
});

module.exports = router;
