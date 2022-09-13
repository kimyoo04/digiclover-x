const addContentBtn = document.querySelector(".button--plus");
let docuComponent = document.querySelectorAll(".docu__content");
let deleteBtns = document.querySelectorAll(".deleteBtn");
let indx = docuComponent.length;

function mkDocuContent() {
  // div 테그, indx 초기화
  let docuComponentWrap = document.querySelector(".docu__content-wrap");
  deleteBtns = document.querySelectorAll(".deleteBtn");
  docuComponent = document.querySelectorAll(".docu__content");
  indx = docuComponent.length;
  indx++;

  // div 생성 기능
  createContentDIV(docuComponentWrap, indx);
  // div 삭제 기능 및 조항 indx 다시 정렬
  deleteContentDIV(deleteBtns, indx);
  // 조항 indx 다시 정렬
  indexingInputs(indx);
}

// -------------------------------------------------------------------

// div 생성 기능
function createContentDIV(docuComponentWrap, indx) {
  // div 테그 생성
  let temWrapDiv = document.createElement("div");
  temWrapDiv.classList.add("docu__content");

  // div 테그 생성
  let tempDiv = document.createElement("div");
  tempDiv.classList.add("docu__content__header");

  // input 테그 생성
  let tempInput = document.createElement("input");
  tempInput.name = `indx`;
  tempInput.type = `text`;
  tempInput.value = `제 ${indx}조 (직접 작성)`;

  // textarea 테그 생성
  let tempTextarea = document.createElement("textarea");
  tempTextarea.name = `content`;

  // Close.svg img 테그 생성
  let tempDeleteBtn = document.createElement("img");
  tempDeleteBtn.className = "deleteBtn";
  tempDeleteBtn.src = "/assets/img/close.svg";

  // div 테그 안에 다 넣기
  tempDiv.appendChild(tempInput);
  tempDiv.appendChild(tempDeleteBtn);
  temWrapDiv.appendChild(tempDiv);
  temWrapDiv.appendChild(tempTextarea);

  // 생성한 것을 docu__content-wrap 에 추가
  docuComponentWrap.appendChild(temWrapDiv);
}

// div 삭제 기능 및 조항 indx 다시 정렬
function deleteContentDIV(deleteBtns, indx) {
  //재할당
  deleteBtns = document.querySelectorAll(".deleteBtn");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      // 삭제 후 재할당
      const p = deleteBtn.parentElement.parentElement;
      p.remove();
      indx--;

      // 조항 indx 다시 정렬
      indexingInputs(indx);
    });
  });
}

// 조항 indx 다시 정렬
function indexingInputs(indx) {
  // 재할당
  let indxInputs = document.querySelectorAll("[name='indx']");
  let contentTextareas = document.querySelectorAll("[name='content']");

  for (let i = 0; i < indx; i++) {
    if (contentTextareas[i].value === "")
      indxInputs[i].value = `제 ${i + 1}조 (직접 작성)`;
  }
}

// -------------------------------------------------------------------

addContentBtn.addEventListener("click", () => {
  mkDocuContent();
});

// 기존 deletBtns 버튼 작동 기능
deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", () => {
    // 삭제 후 재할당
    const p = deleteBtn.parentElement.parentElement;
    p.remove();
    indx--;

    // 조항 indx 다시 정렬
    indexingInputs(indx);
  });
});
