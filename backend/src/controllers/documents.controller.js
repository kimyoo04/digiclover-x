import documentsDAO from "../dao/documentsDAO";

module.exports = class DocumentsCtrl {
  static async apiGetDocuments(req, res, next) {
    let documentsData = await documentsDAO.getDocuments();
    res.json(documentsData);
  }

  static async apiPostOneDocument(req, res, next) {
    const crypto = require("crypto");
    const hash = crypto.createHash("md5");

    // pdf 파일 만들기

    // hashFile 만들기 (hashValue A)
    function makeHashValueA(filePath) {
      const fs = require("fs");

      const input = fs.createReadStream(filePath);
      input.on("readable", () => {
        const data = input.read();
        if (data) hash.update(data);
        else {
          console.log(`hashValue A 완료 --> `, hash.digest("hex"));
        }
      });
      return hash.copy().digest("hex");
    }
    // hashValue 만들기 (hashValue B)
    function makeHashValueB(hashFile) {
      const nowDate = Date.now();
      if (hashFile) {
        hash.update(hashFile + nowDate);
        console.log(`hashB 는 -->`, hash.copy().digest("hex"));
      }
      return hash.copy().digest("hex");
    }

    const hashFile = makeHashValueA(filePath);
    const hashValue = makeHashValueB(hashFile);

    let response = documentsDAO.postOneDocument(
      req.body.docuAll,
      hashFile,
      hashValue,
      UserId
    );

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
