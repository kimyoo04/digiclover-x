const listTags = document.querySelectorAll(".slide");

listTags.forEach((listTag) => {
  listTag.addEventListener("click", () => {
    //클릭한 li tag의 input 선택
    inputTag = listTag.querySelector("input");
    inputTag.checked = true;
  });
});
