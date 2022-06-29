let els = document.getElementsByClassName("step");

//steps에 배열로 step element 넣기
let steps = [];
Array.prototype.forEach.call(els, (e) => {
  steps.push(e);
});

// id의 값 만큼 효과 적용하는 함수
function progress(stepNum) {
  // stepe들의 개수만큼 percentage 얻기
  let pNum = stepNum * (100 / (steps.length - 1));
  // 진행된 선 높이 길이 조절
  document.getElementsByClassName("percent")[0].style.height = `${pNum}%`;
  steps.forEach((e) => {
    // 선택한 id의 값이 기존과 같으면 selected 추가
    if (e.id === stepNum) {
      e.classList.add("selected");
      e.classList.remove("completed");
      e.nextSibling.classList.add("focused"); // h2
    }
    // 선택한 id의 값이 기존보다 크면 completed 추가
    if (e.id < stepNum) {
      e.classList.add("completed");
      e.nextSibling.classList.add("focused"); // h2
    }
    // 선택한 id의 값이 기존보다 작으면 selected, completed 제거
    if (e.id > stepNum) {
      e.classList.remove("selected", "completed");
      e.nextSibling.classList.remove("focused"); //h2
    }
  });
}

// 현재 페이지의 인덱스 숫자 만큼 프로그레스 인디케이터 적용
const pageIndx = document.getElementById("pages").className.slice(-1);

progress(pageIndx);
