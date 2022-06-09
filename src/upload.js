const iconv = require("iconv-lite");
const multer = require("multer");
const _storage = multer.diskStorage({
  destination: function (request, file, cb) {
    if (file.mimetype.substring(0, "image".length) == "image") {
      console.log(file.filename);
      cb(null, "uploads/img");
    } else if (file.mimetype === "application/pdf") {
      cb(null, "uploads/pdf");
    } else if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/vnd.hancom.hwp"
    ) {
      cb(null, "uploads/docu");
    } else {
      cb(null, "uploads");
    }
  },
  filename: function (request, file, cb) {
    // cb(null, file.originalname + "-" + Date.now());
    // 한글 인코딩 해결
    cb(null, iconv.decode(file.originalname, "utf-8").toString());
  },
});
const upload = multer({storage: _storage});

module.exports = upload;
