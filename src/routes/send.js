//------------------------------ 4. PDF에 서명 ------------------------------
router.get("/signning", (req, res) => {
  res.render("./pages/3_sending/signning");
});

//------------------------------ 5. 이메일 전송 ------------------------------
router.get("/sending", (req, res) => {
  res.render("./pages/3_sending/send");
});
