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

// db
const Signature = require("../models/signature.js");
const Document = require("../models/document.js");

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
    const [_datatype, signatureImg] = req.body.photo.split(",");

    const documentId = req.session.docu.documentId;

    async function hashingB(documentId) {
      const crypto = require("crypto");
      const hash = crypto.createHash("md5");
      const nowDate = Date.now();
      const hashA = await Document.findOne({
        attributes: ["hashFile"],
        where: {
          id: documentId,
        },
      });

      console.log(
        "================================================ hashA 는 --> ",
        hashA.hashFile
      );

      if (hashA) {
        hash.update(hashA.hashFile + nowDate);
        console.log(
          `================================================ hashB 는 -->`,
          hash.copy().digest("hex")
        );
      }

      return {hashB: hash.copy().digest("hex"), documentId};
    }

    async function updateIsSigned(hashB, documentId) {
      await Signature.update(
        {isSigned: true, hashValue: hashB, imgUrl: signatureImg},
        {
          where: {
            documentId,
            contractorPhone: req.session.info["user1"].contractorPhone,
          },
          limit: 1,
        }
      ).catch((e) => {
        console.log("update error : ", e);
      });

      await Signature.findOne({
        where: {
          documentId,
          contractorPhone: req.session.info["user1"].contractorPhone,
        },
        raw: true,
      })
        .then((result) => {
          // create 결과 로그 기록
          console.log(
            "================================================ SignatureRow"
          );
          console.log(result);
        })
        .catch((e) => {
          console.log("findOne error : ", e);
        });
    }

    hashingB(documentId).then(({hashB, documentId}) =>
      updateIsSigned(hashB, documentId)
    );

    console.log(
      "================================================ 4. 요청자 서명 완료"
    );
    res.redirect("/send/email");
  });

// --------------------------------------------------------------------------------
// 5. 이메일 전송 및 이용 동의
// --------------------------------------------------------------------------------
router
  // 이메일 수정 & 이용 동의 서식
  .get("/email", isAuthenticated, (req, res) => {
    console.log(req.session.info);
    res.render("./pages/2_send/email", {
      info: req.session.info,
    });
  })
  // 이메일 전송 프로세스, 로그 기록
  .post("/email", isAuthenticated, (req, res) => {
    const {user1, user2} = req.session.info;

    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <br />
    <ul>
      <li>Name: ${user1.contractorName}</li>
      <li>Company: ${user1.companyName}</li>
      <li>Email: ${user1.contractorEmail}</li>
      <li>Phone: ${user1.contractorPhone}</li>
    </ul>
    <br />
    <ul>
      <li>Name: ${user2.contractorName}</li>
      <li>Company: ${user2.companyName}</li>
      <li>Email: ${user2.contractorEmail}</li>
      <li>Phone: ${user2.contractorPhone}</li>
    </ul>
    <br />
    <a href="http://localhost:8001/recipient/login"><button>서명하러가기</button></a>
    `;

    // const nodemailer = require("nodemailer");

    // async function sendingMail() {
    //   // 기본 SMTP transport 를 활용하는 재사용가능한 transporter 객체를 생성
    //   let transporter = nodemailer.createTransport({
    //     host: "localhost",
    //     port: 25,
    //     secure: false, // true for 465, false for other ports
    //     // auth: {
    //     //   user: process.env.SENDMAIL_ID,
    //     //   pass: process.env.SENDMAIL_PASSWORD,
    //     // },
    //     tls: {
    //       rejectUnauthorized: false, //도메인 없이 localhost일 때만 false 설정
    //     },
    //   });

    //   // transport object 가 정의된 메일을 보내기
    //   let info = await transporter.sendMail({
    //     from: '"Digiclover" <kimyoo04eco@naver.com>', // sender address
    //     to: `${user1.contractorEmail}, ${user2.contractorEmail}`, // list of receivers
    //     subject: `[서명 요청] ${user1.contractorName}님이 전자문서 서명 요청을 보냈습니다.`, // Subject line
    //     text: "texting email", // plain text body
    //     html: output, // html body
    //   });

    //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //   console.log("Message sent: %s", info.messageId);
    // }

    // // 이메일 전송 async 함수 실행
    // sendingMail().catch(console.error);

    console.log(
      "================================================ 5. 이메일 전송 완료"
    );
    res.redirect("/storage");
  });

// --------------------------------------------------------------------------------
// 4-0. 문서 전송 시작 전 페이지
// --------------------------------------------------------------------------------
router.get("/", isAuthenticated, (req, res) => {
  res.render("./pages/2_send/send", {user: req.user});
});

module.exports = router;
