const jsPDF = require("jspdf");

const doc = new jsPDF({
  orientation: "p",
  unit: "mm",
  format: [210, 297], //[210,297]
  filters: ["ASCIIHexEncode"],
}).setProperties({title: "String Splitting"});

const jsPDF = require("./layoutSettings");
const importFont = require("./font");
doc.importFont;
