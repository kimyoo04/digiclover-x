// customfont 작업
module.exports = function (doc) {
  let NanumGothicRegular = require("./assets/font/Nanum_Gothic/NanumGothic-Regular-normal.js"),
    NanumGothicBold = require("./assets/font/Nanum_Gothic/NanumGothic-Bold-normal.js"),
    NanumGothicExtraBold = require("./assets/font/Nanum_Gothic/NanumGothic-ExtraBold-normal.js");
  doc.addFileToVFS("NanumGothic-Regular-normal.ttf", NanumGothicRegular);
  doc.addFont("NanumGothic-Regular-normal.ttf", "NanumGothic", "normal");
  doc.addFileToVFS("NanumGothic-Bold-normal.ttf", NanumGothicBold);
  doc.addFont("NanumGothic-Bold-normal.ttf", "NanumGothic", "bold");
  doc.addFileToVFS("NanumGothic-ExtraBold-normal.ttf", NanumGothicExtraBold);
  doc.addFont("NanumGothic-ExtraBold-normal.ttf", "NanumGothic", "extrabold");
  doc.setFont("NanumGothic");
  return doc;
};
