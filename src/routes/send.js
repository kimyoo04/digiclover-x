// 모듈 세팅
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const compression = require("compression");
const bodyParser = require("body-parser");
const router = express.Router();
dotenv.config();

// lib 폴더 세팅
const {isAuthenticated} = require("../lib/auth.js");

// public 폴더 정적파일 연결
router.use(express.static(path.join(__dirname, "../public")));

// 미들웨어 세팅
router.use(bodyParser.json()); // json 파싱
router.use(bodyParser.urlencoded({extended: true})); // form 파싱
router.use(compression());

// --------------------------------------------------------------------------------
// 4. 요청자의 서명
// --------------------------------------------------------------------------------
router
  // 서명 그리기 기능 & 도장 svg, png 삽입 및 위치 이동 기능
  .get("/signning", isAuthenticated, (req, res) => {
    res.render("./pages/2_send/signning", {user: req.user});
  })
  // 요청자의 서명이후 헤시값 B와 C 저장 (기존에 저장된 가장 최신의 헤시값과)
  .post("/signning", isAuthenticated, (req, res) => {
    console.log("4. 요청자 서명 완료");
    res.redirect("/send/email");
  });

// --------------------------------------------------------------------------------
// 5. 이메일 전송 및 이용 동의
// --------------------------------------------------------------------------------
router
  // 이메일 수정 & 이용 동의 서식
  .get("/email", isAuthenticated, (req, res) => {
    res.render("./pages/2_send/email", {
      info: req.session.info,
    });
  })
  // 이메일 전송 프로세스, 로그 기록
  .post("/email", isAuthenticated, (req, res) => {
    const {
      companyName1,
      contractorName1,
      contractorPhone1,
      contractorEmail1,

      companyName2,
      contractorName2,
      contractorPhone2,
      contractorEmail2,
    } = req.session.info;

    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <br />
    <ul>
      <li>Name: ${contractorName1}</li>
      <li>Company: ${companyName1}</li>
      <li>Email: ${contractorEmail1}</li>
      <li>Phone: ${contractorPhone1}</li>
    </ul>
    <br />
    <ul>
      <li>Name: ${contractorName2}</li>
      <li>Company: ${companyName2}</li>
      <li>Email: ${contractorEmail2}</li>
      <li>Phone: ${contractorPhone2}</li>
    </ul>
    <br />
    <a href="http://localhost:8001/recipient/login"><button>서명하러가기</button></a>
    `;

    const nodemailer = require("nodemailer");

    async function sendingMail() {
      // 기본 SMTP transport 를 활용하는 재사용가능한 transporter 객체를 생성
      let transporter = nodemailer.createTransport({
        host: "localhost",
        port: 25,
        secure: false, // true for 465, false for other ports
        // auth: {
        //   user: process.env.SENDMAIL_ID,
        //   pass: process.env.SENDMAIL_PASSWORD,
        // },
        tls: {
          rejectUnauthorized: false, //도메인 없이 localhost일 때만 false 설정
        },
      });

      // transport object 가 정의된 메일을 보내기
      let info = await transporter.sendMail({
        from: '"Digiclover" <kimyoo04eco@naver.com>', // sender address
        to: `${contractorEmail1}, ${contractorEmail2}`, // list of receivers
        subject: `[서명 요청] ${contractorName1}님이 전자문서 서명 요청을 보냈습니다.`, // Subject line
        text: "texting email", // plain text body
        html: output, // html body
      });

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      console.log("Message sent: %s", info.messageId);
    }

    // 이메일 전송 async 함수 실행
    sendingMail().catch(console.error);

    console.log("5. 이메일 전송 완료");
    res.redirect("/storage");
  });

// --------------------------------------------------------------------------------
// 4-0. 문서 전송 시작 전 페이지
// --------------------------------------------------------------------------------
router.get("/", isAuthenticated, (req, res) => {
  res.render("./pages/2_send/send", {user: req.user});
});

module.exports = router;