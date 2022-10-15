import {dbService} from "src/fbase";
import crypto from "crypto";
import fs from "fs";

//--------------------------------------------------------------------------------
// Post - 문서생성
//--------------------------------------------------------------------------------
export const PostOneDocument = async (userId, dataObj) => {
  const hash = crypto.createHash("md5");

  // // pdf 파일 만들기
  // const {jsPDF} = require("jspdf");
  // const moment = require("moment");
  // const doc = new jsPDF({
  //   orientation: "p",
  //   unit: "mm",
  //   format: [210, 297],
  //   filters: ["ASCIIHexEncode"],
  // }).setProperties({title: docuTitle});
  // doc = require("./font")(doc); // customfont 가져오기

  // doc.addImage(req.img, "JPEG", 0, 0, 1, 1); // img 사이즈에 따라 조절하기

  // const today = moment().format("YYYYMMDD-hhmmss"); // 파일 생성 날짜 기입

  // pdfFile = doc.save(`${__dirname}${today}${docuTitle}.pdf`); // 저장말고 파일의 url 값 받기

  // 임시 파일 받기
  const filePath = `${__dirname}/testing.pdf`;
  console.log(`filePath== ${filePath}`);

  // hashFile 만들기 (hashValue A)
  async function makeHashValueA(filePath) {
    const input = fs.createReadStream(filePath);
    input.on("readable", () => {
      const data = input.read();
      if (data) hash.update(data);
      else {
      }
    });
    return hash.copy().digest("hex");
  }

  // hashValue 만들기 (hashValue B)
  async function makeHashValueB(hashFile) {
    const nowDate = Date.now();
    if (hashFile) {
      hash.update(hashFile + nowDate);
    }
    return hash.copy().digest("hex");
  }

  const hashFile = await makeHashValueA(filePath).catch((err) =>
    console.error("makeHashValueA ==> ", err)
  );
  const hashValue = await makeHashValueB(hashFile).catch((err) =>
    console.error("makeHashValueB ==> ", err)
  );

  // 문서 생성
  await AddDocument(userId, dataObj, hashFile, hashValue).catch((err) =>
    console.error("postOneDocument ==> ", err)
  );

  console.log("apiPostOneDocument - success");
};

const AddDocument = async (
  userId,
  {contractors, docuKind, docuTitle, docuContent, imgUrl},
  hashFile,
  hashValue
) => {
  // 이곳에서 인수 처리 후 DB에 넣기

  console.log("contractors", contractors);
  console.log("docuKind", docuKind);
  console.log("docuTitle", docuTitle);
  console.log("docuContent", docuContent);
  console.log("imgUrl", imgUrl);

  const contractorsNum = contractors.length;
  const UsersId = [null, null, null, null];

  // 요청자(UserId1)에는 해당 UserId, 수신자에는 0, 없으면 null 처리
  for (let i = 0; i < contractorsNum; i++) {
    if (i === 0) {
      UsersId[i] = userId;
    } else {
      UsersId[i] = 0;
    }
  }

  // 문서 튜플 1개 추가
  const documentId = dbService
    .collection("documents")
    .add({
      docuKind,
      docuTitle,
      docuContent,
      hashFile,

      UserId1: UsersId[0],
      UserId2: UsersId[1],
      UserId3: UsersId[2],
      UserId4: UsersId[3],
    })
    .then((document) => {
      return document.id;
    })
    .catch((error) => console.log("Document create error ==> ", error));

  // 요청자만 서명 튜플 1개 추가
  dbService
    .collection("signatures")
    .add({
      DocumentId: documentId,
      UserId: userId,
      contractorPhone: contractors[0].contractorPhone,

      isSigned: true,
      hashValue,
      imgUrl,
    })
    .catch((error) => console.log("요청자 Signature create error ==> ", error));

  // 요청자를 제외한 수신자 서명 튜플 0~3개 추가

  for (let i = 1; i < contractorsNum; i++) {
    dbService
      .collection("signatures")
      .add({
        DocumentId: documentId,
        UserId: UsersId[i],
        isSigned: false,
      })
      .catch((error) => console.error("수신자 Signatures create ==> ", error));
  }
};
