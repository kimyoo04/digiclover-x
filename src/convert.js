const jsPDF = require("jspdf");

document.getElementById("export").addEventListener("click", exportPDF);

function exportPDF() {
  var doc = new jsPDF();

  const pageWidth = 8.5,
    lineHeight = 1.2,
    margin = 0.5,
    maxLineWidth = pageWidth - margin * 2,
    fontSize = 24,
    ptsPerInch = 72,
    oneLineHeight = (fontSize * lineHeight) / ptsPerInch;

  const textLines = document.querySelector(".content").innerText;

  doc.html(document.body, {
    callback: function (doc) {
      doc.save();
    },
    x: 10,
    y: 10,
  });
}
