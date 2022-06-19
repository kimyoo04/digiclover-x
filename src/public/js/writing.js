const docuComponents = document.querySelector(".docu-contents");
const docuComponent = document.querySelectorAll(".docu-content");
const addContentBtn = document.querySelector(".addContentBtn");

let indx = docuComponent.length;

tag = `.docu-content
    span 제 ${indx}조 (항의 이행)
    input(type="textarea" name="additionalText")
    `;

addContentBtn.addEventListener("click", () => {
  let tempDiv = document.createElement("div");
  tempDiv.classList.add("docu-content");

  indx++;
  let tempSpan = document.createElement("span");
  let node = document.createTextNode(`span 제 ${indx}조 (항의 이행)`);
  tempSpan.appendChild(node);

  let tempTextarea = document.createElement("textarea");
  tempTextarea.name = indx;

  tempDiv.appendChild(tempSpan);
  tempDiv.appendChild(tempTextarea);

  docuComponents.appendChild(tempDiv);
});
