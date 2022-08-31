const slideItems = Array.from(document.querySelectorAll(".slide__item"));
const slideRadios = Array.from(document.querySelectorAll(".slide__radio"));

slideItems.forEach((slideItem) => {
  let slideRadio = slideItem.querySelector("input");

  slideItem.addEventListener("click", () => {
    //클릭한 li tag의 input 선택
    slideRadio.checked = true;

    //radio가 checked 된 객체만 slide__item--selected 클래스를 추가
    slideRadios.forEach((slideRadio) => {
      const slideItem = slideRadio.parentNode;
      if (slideRadio.checked === true) {
        slideItem.className += " slide__item--selected";
      } else {
        // true가 아닌 radio 객체는 클래스 초기화
        slideItem.className = "slide__item";
      }
    });
  });
});
