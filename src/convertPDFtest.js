import jsPDF from "jspdf";

document.getElementById("export").addEventListener("click", exportPDF);

var specialElementHandlers = {
  ".no-export": function (element, renderer) {
    return true;
  },
};

function exportPDF() {
  var doc = new jsPDF("p", "pt", "a4");

  var source = document.getElementById("content").innerHTML;

  var margins = {
    top: 10,

    bottom: 10,
    left: 10,
    width: 595,
  };

  doc.fromHTML(
    source,
    margins.left,
    margins.top,
    {
      width: margins.width,
      elementHandlers: specialElementHandlers,
    },

    function (dispose) {
      doc.save("Test.pdf");
    },
    margins
  );
}
