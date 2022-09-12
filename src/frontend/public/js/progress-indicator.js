const steps = Array.from(document.querySelectorAll(".step"));
// html 상의 숨겨진 텍스트
const title = document.querySelector("h2").innerText;
const pageNum = document.querySelector("h2").className.slice(-1);

// progress-bar의 h1 title을 삽입
const pageTitle = document.createElement("h1");
pageTitle.innerText = title;
const progressTitle = document.querySelector(".progress__title");

//step 별 클래스 추가
setTimeout(
  steps.forEach((step) => {
    const stepNum = step.id.slice(-1);
    progressTitle.appendChild(pageTitle);

    if (stepNum === pageNum) {
      step.classList += " step--now";
    } else if (pageNum > stepNum) {
      step.classList += " step--finished";
    }
  }),
  2000
);
