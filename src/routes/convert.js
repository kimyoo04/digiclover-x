//----------------------------------------------------------------
// html의 form 데이터를 전자문서화 페이지
//----------------------------------------------------------------

// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const compression = require("compression");
const bodyParser = require("body-parser");
const router = express.Router();
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
const docukind = require("../lib/docukind.js"); // 추후 문서 종류 별 모듈화
const htmlparser2 = require("htmlparser2");

//------------------------------ 코드 시작 ------------------------------
//------------------------------ 1. 회사 및 계약자 선택 ------------------------------

router.get("/select-conpanies", isAuthenticated, (req, res) => {
  res.render("select-companies");
});

router.post("/select-companies", isAuthenticated, (req, res) => {
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

router.get("/select-docukind", isAuthenticated, (req, res) => {
  // 회사, 계약자 정보 할당
  const info = req.session.info;
  let companyName1 = info.companyName1;
  let contractorName1 = info.contractorName1;
  let companyName2 = info.companyName2;
  let contractorName2 = info.contractorName2;

  res.render("select-docukind", {
    companyName1: companyName1,
    contractorName1: contractorName1,
    companyName2: companyName2,
    contractorName2: contractorName2,
  });
});

router.post("/select-docukind", isAuthenticated, (req, res) => {
  const {docukind} = req.body;
  let docukindName = docukind;
  req.session.docukind = {
    docukindName: docukindName,
  };
  console.log(docukind);

  res.redirect(`/convert/writing`); //수정필요
  console.log("2. 문서 종류 선택 완료");
});

//------------------------------ 3. 문서 작성 및 PDF 생성 ------------------------------

router.get("/writing", isAuthenticated, (req, res) => {
  // 회사, 계약자 정보 할당
  const info = req.session.info;
  const docukind = req.session.docukind;

  let companyName1 = info.companyName1;
  let contractorName1 = info.contractorName1;
  let companyName2 = info.companyName2;
  let contractorName2 = info.contractorName2;
  let docukindName = docukind.docukindName;

  res.render("writing", {
    companyName1,
    contractorName1,
    companyName2,
    contractorName2,
    docukindName,
  });
});

router.post("/writing", isAuthenticated, (req, res) => {
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
    format: [210, 297], //[210,297]
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

  // 텍스트 생성
  let yPos = margin;

  // post data 분류
  let value;
  const title = post.title;
  const describe = post.describe;

  const indx = post.indx;
  const content = post.content;

  const indxLength = indx.length;
  const contentLength = content.length;

  value = title;
  let fontSize = 16;
  let [textLine, blockHeight] = textProcess(value, fontSize, maxLineWidth);
  doc.text(textLine, centerXPos, yPos, {align: "center"});
  yPos += blockHeight;

  value = describe;
  fontSize = 10;
  [textLine, blockHeight] = textProcess(value, fontSize, maxLineWidth);
  doc.text(textLine, centerXPos, yPos, {align: "center"});
  yPos += blockHeight;

  for (let i = 0; i < indxLength; i++) {
    let value = indx[i];
    let fontSize = 12;
    [textLine, blockHeight] = textProcess(value, fontSize, maxLineWidth);
    doc.text(textLine, margin, yPos + 2);
    yPos += blockHeight;

    value = content[i];
    fontSize = 10;
    [textLine, blockHeight] = textProcess(value, fontSize, maxLineWidth);
    doc.text(textLine, margin, yPos - 2);
    yPos += blockHeight;
  }

  function textProcess(value, fontSize, maxLineWidth) {
    let text = `${value}\n`;
    let textLine = doc
      .setFontSize(fontSize)
      .splitTextToSize(text, maxLineWidth);
    let textHeight = doc.getLineHeight(text) / doc.internal.scaleFactor;
    var lines = textLine.length;
    var blockHeight = lines * textHeight;
    return [textLine, blockHeight];
  }

  res.redirect(`/convert/signning`); //수정필요
  doc.output("save", "./uploads/test.pdf");

  console.log("3. PDF 변환 완료");
});

//------------------------------ 4. PDF에 서명 ------------------------------
router.get("/signning", isAuthenticated, (req, res) => {
  res.render("signning");
});

//------------------------------ 5. 이메일 전송 ------------------------------
router.get("/sending", isAuthenticated, (req, res) => {
  res.render("sending");
});

//------------------------------ convert 메인 페이지 ------------------------------
router.get("/", isAuthenticated, (req, res) => {
  res.render("converting");
});

module.exports = router;
