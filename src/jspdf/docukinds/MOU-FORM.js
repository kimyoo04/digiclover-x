module.exports = function (req, title, describe, indx, content) {
  const {margin, maxLineWidth, centerXPos, doc} = require("../index");
  const indxLength = indx.length;

  // splittext와 blockHeight 생성하는 함수
  function textProcess(valueText, fontSize, maxLineWidth) {
    let text = `${valueText}\n`;
    let textLine = doc
      .setFontSize(fontSize)
      .splitTextToSize(text, maxLineWidth);
    let textHeight = doc.getLineHeight(text) / doc.internal.scaleFactor;
    let lines = textLine.length;
    let blockHeight = lines * textHeight;
    return [textLine, blockHeight];
  }

  module.exports = textProcess;

  doc.setFontSize(12);

  // 레이아웃 세팅
  let yPos = margin;

  // 텍스트 데이터 pdf에 입력
  // title 입력
  let [textLine, blockHeight] = textProcess(title, 16, maxLineWidth, doc);
  doc.text(textLine, centerXPos, yPos, {align: "center"});
  yPos += blockHeight;

  // describe 입력
  [textLine, blockHeight] = textProcess(describe, 10, maxLineWidth, doc);
  doc.text(textLine, centerXPos, yPos, {align: "center"});
  yPos += blockHeight;

  // indx와 content 입력 반복
  for (let i = 0; i < indxLength; i++) {
    [textLine, blockHeight] = textProcess(indx[i], 12, maxLineWidth, doc);
    doc.text(textLine, margin, yPos + 2);
    yPos += blockHeight;

    [textLine, blockHeight] = textProcess(content[i], 10, maxLineWidth, doc);
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
