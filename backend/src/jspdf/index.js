// ------------------------------------------------------------------
const pageWidth = 210,
  pageHeight = 297,
  margin = 20,
  maxLineWidth = pageWidth - margin * 2,
  centerXPos = maxLineWidth / 2 + margin;

// ------------------------------------------------------------------
const {jsPDF} = require("jspdf");

let doc = new jsPDF({
  orientation: "p",
  unit: "mm",
  format: [pageWidth, pageHeight], //[210,297]
  filters: ["ASCIIHexEncode"],
}).setProperties({title: "String Splitting"});

// customfont 가져오기 ----------------------------------------------
doc = require("./font")(doc);
// ------------------------------------------------------------------

module.exports = {
  margin,
  maxLineWidth,
  centerXPos,
  doc,
};
