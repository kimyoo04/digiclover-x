const fs = require("fs");
const iconv = require("iconv-lite");
const multer = require("multer");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.log("multer용 uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(request, file, done) {
      if (file.mimetype.substring(0, "image".length) == "image") {
        // 이미지 파일 -> uploads/img
        console.log(file.filename);
        done(null, "uploads/img");
      } else if (file.mimetype === "application/pdf") {
        // PDF 파일 -> uploads/pdf
        done(null, "uploads/pdf");
      } else if (
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.mimetype === "application/vnd.hancom.hwp"
      ) {
        // 워드, 한글 파일 -> uploads/docu
        done(null, "uploads/docu");
      } else {
        // 기타 파일 -> uploads
        done(null, "uploads");
      }
    },
    filename(request, file, done) {
      // 한글 인코딩 해결 및 저장 시간 이름 적용
      const ext = path.extname(file.originalname);
      done(
        // null, iconv.decode(file.originalname, "utf-8").toString() + "-" + Date.now()
        null,
        path.basename(file.originalname, ext) + "-" + Date.now()
      );
    },
    // 파일크기 10MB 용량 제한
    limits: {fileSize: 10 * 1024 * 1024},
  }),
});

module.exports = upload;
