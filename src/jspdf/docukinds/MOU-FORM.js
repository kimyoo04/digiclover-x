module.exports = function (req, res, title, describe, indx, content) {
  const {margin, maxLineWidth, centerXPos, doc} = require("../index");
  const textProcess = require("../functions/textProcess");
  const indxLength = indx.length;

  doc.setFontSize(12);

  // 레이아웃 세팅
  let yPos = margin;

  // 텍스트 데이터 pdf에 입력
  // title 입력
  let [textLine, blockHeight] = textProcess(title, 16, maxLineWidth);
  doc.text(textLine, centerXPos, yPos, {align: "center"});
  yPos += blockHeight;

  // describe 입력
  [textLine, blockHeight] = textProcess(describe, 10, maxLineWidth);
  doc.text(textLine, centerXPos, yPos, {align: "center"});
  yPos += blockHeight;

  // indx와 content 입력 반복
  for (let i = 0; i < indxLength; i++) {
    [textLine, blockHeight] = textProcess(indx[i], 12, maxLineWidth);
    doc.text(textLine, margin, yPos + 2);
    yPos += blockHeight;

    [textLine, blockHeight] = textProcess(content[i], 10, maxLineWidth);
    doc.text(textLine, margin, yPos - 2);
    yPos += blockHeight;
  }
  // 서명란 위의 선 입력
  blockHeight = 100;
  yPos += blockHeight;
  doc.setLineWidth(0.1);
  doc.line(margin, yPos, margin + 60, yPos);
  doc.line(centerXPos + 20, yPos, centerXPos + 80, yPos);
  blockHeight = 5;
  yPos += blockHeight;

  // 서명란 입력
  let textValue1 = `${req.session.info.companyName1}  서명자:         ${req.session.info.contractorName1}`;
  [textLine, blockHeight] = textProcess(textValue1, 10, maxLineWidth);
  doc.text(textLine, margin, yPos);
  doc.text("(인)", margin + 53, yPos);

  let textValue2 = `${req.session.info.companyName2}  서명자:         ${req.session.info.contractorName2}`;
  [textLine, blockHeight] = textProcess(textValue2, 10, maxLineWidth);
  doc.text(textLine, centerXPos + 20, yPos);
  doc.text("(인)", centerXPos + 73, yPos);
  yPos += blockHeight;

  // doc 반환
  return doc;
};
