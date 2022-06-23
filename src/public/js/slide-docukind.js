let slides = document.querySelector(".slides"),
  slide = document.querySelectorAll(".slides li"),
  slideCount = slide.length, // 실제 슬라이드 수
  slideWidth = 200,
  slideMargin = 30,
  prevBtn = document.querySelector(".prevBtn"),
  nextBtn = document.querySelector(".nextBtn");
var currentIdx = 0;

function makeClone() {
  // 보이는 슬라이드 수 만큼 뒤에 추가
  for (let i = 0; i < slideCount; i++) {
    let cloneSlide = slide[i].cloneNode(true); //a..cloneNode(), a.cloneNode(true)
    cloneSlide.classList.add("clone");
    slides.appendChild(cloneSlide); //a.appendChild(b)
  }
  // 보이는 슬라이드 수 만큼 앞에 추가
  for (let i = slideCount - 1; i >= 0; i--) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.prepend(cloneSlide);
  }
  updateWidth();
  setInitialPos();
  setTimeout(() => {
    slides.classList.add("animated");
  }, 100);
}

// 복사한 li 태그들을 포함해서 width와 slide 개수를 구한다.
function updateWidth() {
  let currentSlides = document.querySelectorAll(".slides li");
  let newSlideCount = currentSlides.length;

  let newWidth =
    // 슬라이드 전체 길이 - 마지막 마진
    (slideWidth + slideMargin) * newSlideCount - slideMargin + "px";
  slides.style.width = newWidth;
}

// 보이는 페이지의 폭만큼 마이너스 이동
function setInitialPos() {
  let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
  slides.style.transform = `translateX(${initialTranslateValue}px)`;
}

// --------------------------- 슬라이드 버튼 클릭 ---------------------------
function moveSlide(num) {
  // slide의 width인 slideWidth + slideMargin에 한개씩 곱해준다.
  slides.style.left = `${-num * (slideWidth + slideMargin)}px`;
  currentIdx = num;

  // 칸 이동이 일정 이상 진행되면 리셋
  if (currentIdx === slideCount || currentIdx === -slideCount) {
    setTimeout(() => {
      slides.classList.remove("animated");
      slides.style.left = 0;
      currentIdx = 0;
    }, 300);
  }
  slides.classList.add("animated");
}

nextBtn.addEventListener("click", function () {
  moveSlide(currentIdx + 1);
});
prevBtn.addEventListener("click", function () {
  moveSlide(currentIdx - 1);
});

makeClone();
