import SignaturesDAO from "../dao/signaturesDAO";
const Signatures = require("../models/signature");

module.exports = class SignaturesController {
  static async apiUpdateSignature(req, res, next) {
    let {id} = req.params;
    const DocumentId = id;

    // 가장 최신 해시값 찾기
    async function findLatestHashValue(DocumentId) {
      const LatestHashValue = await Signatures.findOne({
        attributes: "hashValue",
        where: {
          DocumentId,
        },
        order: [["updatedAt", "DESC"]],
        raw: true,
      }).catch((error) => next(error));
      return LatestHashValue;
    }
    // newHashValue 만들기
    function makeNewHashValue(LatestHashValue) {
      const nowDate = Date.now();
      if (LatestHashValue) {
        hash.update(LatestHashValue + nowDate);
        console.log(`hashB 는 -->`, hash.copy().digest("hex"));
      }
      return hash.copy().digest("hex");
    }
    const LatestHashValue = findLatestHashValue(DocumentId);
    const newHashValue = makeNewHashValue(LatestHashValue);

    // req.user.id + req.user.contractorPhone

    // req.body.imgUrl

    const response = await SignaturesDAO.updateSignature(
      UserID,
      DocumentId,
      newHashValue,
      imgUrl,
      contractorPhone
    ); // req.user.id 인자 넣기

    res.json(response); // {result: true} 전달
  }
};
