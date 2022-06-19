// // will automatically load the node version
// const {jsPDF} = require("jspdf");

// //------------------------------ 플롯 조절 ------------------------------
// // Change orientation, units, (format)paper size
// const doc = new jsPDF({
//   orientation: "p", // "portrait" or "landscape" (or shortcuts "p" or "l").
//   unit: "mm", // "in" <-- inch
//   lineHeight,
//   format: "a4", // [4, 2],
// }).setProperties({title: "String Splitting"});

// //------------------------------ 폰트 선택 ------------------------------
// // add the font to jsPDF
// doc.addFileToVFS("helvetica.ttf", myFont);
// doc.addFont("helvetica.ttf", "helvetica", "normal");
// doc.setFont("helvetica");
// doc.setFontSize(40);

// //------------------------------ PDF 작성 ------------------------------

// // Change text color
// doc.setTextColor(255, 0, 0);
// doc.setTextColor("red");
// doc.setTextColor(150);

// const pageWidth = 8.5,
//   lineHeight = 1.2,
//   margin = 0.5,
//   maxLineWidth = pageWidth - margin * 2,
//   fontSize = 24,
//   ptsPerInch = 72,
//   oneLineHeight = (fontSize * lineHeight) / ptsPerInch;

// const contentText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati eos possimus fuga, accusantium, consequuntur cumque nemo nulla animi id ullam magnam in velit sed rem, nisi eveniet. Aperiam, soluta quisquam?
// Eos, dolorum excepturi temporibus nam voluptatibus, fuga sed recusandae iusto cupiditate aut, molestiae nihil beatae maxime soluta natus deserunt itaque consectetur? Nam mollitia veritatis, nisi enim aperiam debitis quas dicta.`;

// const textLines = doc
//   .setFont("helvetica")
//   .setFontSize(fontSize)
//   .splitTextToSize(contentText, maxLineWidth);

// // text(text, x, y, optionsopt(표현), transform(회전)) → {jsPDF}
// // doc.text("Hello world!", 10, 10);
// doc.text(textLines, margin, margin + 2 * oneLineHeight);

// // addImage(imageData, format, x, y, width, height, alias, compression, rotation)
// // doc.addImage(imgData, "JPEG", 15, 40, 180, 180);

// //------------------------------ PDF 저장 ------------------------------
// // will save the file in the current working directory
// const savingBtn = document.querySelector(".savingBtn");
// savingBtn.addEventListener("click", doc.save("a4.pdf"));

// //------------------------------ PDF print 창 활성 ------------------------------
// const printingBtn = document.querySelector(".printingBtn");
// printingBtn.addEventListener("click", doc.autoPrint());

/*       
      제 ${}조 (${})
      본 MOU는 ${}와(과) ${}가 ${}관한 협력관계를 갖는 것을 목적으로 한다.

      제 ${}조 (${})
      ${}는 ${}와(과) ${}에 적극 협력한다.

      제 ${}조 (${})
      본 MOU를 위해 양측은 제공된 정보 중 비밀로 표시된 것은 서로간의 보안을 유지해야하며, 만약 이중 위반하여 그 정보를 유출한 자는 그로인한 손해배상금을 지급해야한다.

      제 ${}조 (${})
      양 측은 신의 성실의 원칙에 입각하여 본 양해각서의 내용을 성실히 이행한다.
      
      제 ${}조 (${})
      본 양해각서는 양측의 연구기간 ${}간 효력을 발휘하며 연구기간이 확정될 경우 확정된 기간에도 같은 효력이 발휘된다.`;
 */

/*
 * Let's demonstrate string splitting with the first page of Shakespeare's Romeo and Juliet!
 * We'll use a 8.5 x 11 inch sheet, measuring everything in inches.
 */
const pageWidth = 794, //용지 너비
  pageHeight = 1122, //용지 높이
  margin = 20,
  maxLineWidth = pageWidth - margin * 2, //최대길이
  lineHeight = 1, //줄높이
  fontSize = 12,
  ptsPerMm = 3.781,
  oneLineHeight = (fontSize * lineHeight) / ptsPerMm,
  text =
    "Two households, both alike in dignity,\n" +
    "In fair Verona, where we lay our scene,\n" +
    "From ancient grudge break to new mutiny,\n" +
    "Where civil blood makes civil hands unclean.\n" +
    "From forth the fatal loins of these two foes\n",
  doc = new jsPDF({
    unit: "in",
    lineHeight: lineHeight,
  }).setProperties({title: "String Splitting"});

// splitTextToSize takes your string and turns it in to an array of strings,
// each of which can be displayed within the specified maxLineWidth.
var textLines = doc
  .setFont("helvetica")
  .setFontSize(fontSize)
  .splitTextToSize(text, maxLineWidth);

// doc.text can now add those lines easily; otherwise, it would have run text off the screen!
doc.text(textLines, margin, margin + 2 * oneLineHeight);

// You can also calculate the height of the text very simply:
var textHeight = (textLines.length * fontSize * lineHeight) / ptsPerMm;
doc
  .setFont("Helvetica", "bold")
  .text(
    "Text Height: " + textHeight + " inches",
    margin,
    margin + oneLineHeight
  );
