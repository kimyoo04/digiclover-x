import documentsDAO from "../dao/documentsDAO";

module.exports = class DocumentsCtrl {
  // Get - 모든 문서 조회

  static async apiGetDocuments(req, res, next) {
    let documentsData = await documentsDAO.getDocuments();

    console.log("apiGetDocuments - success");
    res.json(documentsData);
  }

  // Get - 문서 1 개 서명 n 개 조회

  static async apiGetDocumentById(req, res, next) {
    let {id} = req.params;

    // 문서 1 개와 서명 n개 조회
    let documentData = await documentsDAO.getDocumentById(id);
    let signaturesData = await documentsDAO.getSignaturesById(id);

    // 데이터 병합
    let response = {
      ...documentData,
      ...signaturesData,
    };

    console.log("apiGetDocumentById - success");
    res.json(response);
  }

  // Post - 문서생성

  static async apiPostOneDocument(req, res, next) {
    const crypto = require("crypto");
    const hash = crypto.createHash("md5");

    // // pdf 파일 만들기
    // const {jsPDF} = require("jspdf");
    // const moment = require("moment");
    // let doc = new jsPDF({
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
      const fs = require("fs");

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

    const hashFile = await makeHashValueA(filePath);
    const hashValue = await makeHashValueB(hashFile);

    // 문서 생성
    await documentsDAO
      .postOneDocument(
        req.body.data, // docuAll 데이터
        hashFile,
        hashValue
      )
      .catch((error) => next(error));

    console.log("apiPostOneDocument - success");
    return res.json({result: "Post success"});
  }

  // Delete - 문서삭제

  static async apiDeleteDocumentById(req, res, next) {
    let {id} = req.params;

    // 권한 확인 위한 userId 받고 where 문에 추가
    await documentsDAO.deleteOneDocument(id);

    console.log("apiDeleteDocumentById - success");
    return res.json({result: "Delete success"});
  }
};
