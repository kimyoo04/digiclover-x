// splittext와 blockHeight 생성하는 함수
function textProcess(valueText, fontSize, maxLineWidth, doc) {
  let text = `${valueText}\n`;
  let textLine = doc.setFontSize(fontSize).splitTextToSize(text, maxLineWidth);
  let textHeight = doc.getLineHeight(text) / doc.internal.scaleFactor;
  let lines = textLine.length;
  let blockHeight = lines * textHeight;
  return [textLine, blockHeight];
}

module.exports = textProcess;
