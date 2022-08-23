const addContentBtn = document.querySelector(".button--plus");

function mkDocuContent() {
  // div 테그, indx 초기화
  let docuComponent = document.querySelectorAll(".docu__content");
  let deleteBtns = document.querySelectorAll(".deleteBtn");
  let indx = docuComponent.length;
  let lastDocuComponent = docuComponent[indx - 1];
  indx++;

  // div 생성 기능
  createContentDIV(lastDocuComponent, indx);

  // div 삭제 기능 및 조항 indx 다시 정렬
  deleteContentDIV(deleteBtns, indx);

  // 조항 indx 다시 정렬
  indexingInputs(indx);
}

// -------------------------------------------------------------------

// div 생성 기능
function createContentDIV(lastDocuComponent, indx) {
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

  //textarea 테그 생성
  let tempTextarea = document.createElement("textarea");
  tempTextarea.name = `content`;

  // input 테그 button 생성
  let tempDeleteBtn = document.createElement("input");
  tempDeleteBtn.classList.add(`deleteBtn`);
  tempDeleteBtn.type = `button`;
  tempDeleteBtn.value = `삭제`;

  // div 테그 안에 넣기
  tempDiv.appendChild(tempInput);
  tempDiv.appendChild(tempDeleteBtn);
  temWrapDiv.appendChild(tempDiv);
  temWrapDiv.appendChild(tempTextarea);

  // 추가
  lastDocuComponent.parentNode.insertBefore(
    temWrapDiv,
    lastDocuComponent.nextSibling
  );
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
