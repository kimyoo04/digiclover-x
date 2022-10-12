import documentsDAO from "../dao/documentsDAO";

module.exports = class DocumentsCtrl {
  //--------------------------------------------------------------------------------
  // Get - 모든 문서 조회
  //--------------------------------------------------------------------------------
  static async apiGetDocumentsByPages(req, res, next) {
    const limit = parseInt(req.query._limit);
    const offset = parseInt((req.query._pages - 1) * limit);

    console.log(req.id);
    const documentsData = await documentsDAO
      .getDocumentsByPages(req.id, limit, offset)
      .catch((err) => console.error("getDocumentsByPages ==> ", err));

    console.log(documentsData);
    console.log("apiGetDocumentsByPages - success");
    res.json(documentsData);
  }

  //--------------------------------------------------------------------------------
  // Get - 문서 1 개 서명 n 개 조회
  //--------------------------------------------------------------------------------
  static async apiGetDocumentById(req, res, next) {
    const {id} = req.params;

    console.log("id", id);

    // 문서 1 개 조회
    const documentData = await documentsDAO
      .getDocumentById(id)
      .catch((err) => console.error("getDocumentById ==> ", err));

    console.log("documentData - success");
    // console.log(documentData);

    // 서명 n개 조회
    const signaturesData = await documentsDAO
      .getSignaturesById(id)
      .catch((err) => console.error("getSignaturesById ==> ", err));

    console.log("signaturesData - success");
    // console.log(signaturesData);

    // 데이터 병합
    const response = {
      ...documentData,
      ...signaturesData,
    };

    res.json(response);
  }

  //--------------------------------------------------------------------------------
  // Post - 문서생성
  //--------------------------------------------------------------------------------
  static async apiPostOneDocument(req, res, next) {
    const crypto = require("crypto");
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

    const hashFile = await makeHashValueA(filePath).catch((err) =>
      console.error("makeHashValueA ==> ", err)
    );
    const hashValue = await makeHashValueB(hashFile).catch((err) =>
      console.error("makeHashValueB ==> ", err)
    );

    // 문서 생성
    await documentsDAO
      .postOneDocument(req.body.data, req.id, hashFile, hashValue)
      .catch((err) => console.error("postOneDocument ==> ", err));

    console.log("apiPostOneDocument - success");
    return res.json({msg: "apiPostOneDocument success"});
  }

  //--------------------------------------------------------------------------------
  // Delete - 문서삭제
  //--------------------------------------------------------------------------------
  static async apiDeleteDocumentById(req, res, next) {
    let {id} = req.params;

    // 권한 확인 위한 userId 받고 where 문에 추가
    await documentsDAO
      .deleteOneDocument(id)
      .catch((err) => console.error("deleteOneDocument ==> ", err));

    console.log("apiDeleteDocumentById - success");
    return res.json({msg: "apiDeleteDocumentById success"});
  }
};
