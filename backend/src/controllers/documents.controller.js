import documentsDAO from "../dao/documentsDAO";

module.exports = class DocumentsCtrl {
  static async apiGetDocuments(req, res, next) {
    let documentsData = await documentsDAO.getDocuments();
    res.json(documentsData);
  }

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
    function makeHashValueA(filePath) {
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
    function makeHashValueB(hashFile) {
      const nowDate = Date.now();
      if (hashFile) {
        hash.update(hashFile + nowDate);
      }
      return hash.copy().digest("hex");
    }

    const hashFile = makeHashValueA(filePath);
    const hashValue = makeHashValueB(hashFile);

    let response = documentsDAO.postOneDocument(
      req.body.data, // docuAll 데이터
      hashFile,
      hashValue
    );
    console.log(response);
    res.json(response); // {result: true} 전달
  }

  static async apiGetDocumentById(req, res, next) {
    let {id} = req.params;
    let documentData = await documentsDAO.getDocumentById(id);
    let signaturesData = await documentsDAO.getSignaturesById(id);

    let response = {
      ...documentData,
      ...signaturesData,
    };
    res.json(response);
  }

  static async apiDeleteDocumentById(req, res, next) {
    let {id} = req.params;

    // 권한 확인 위한 userId 받고 where 문에 추가
    let response = await documentsDAO.deleteOneDocument(id);

    res.json(response); // {result: true} 전달
  }
};
