const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasForm = document.querySelector(".signning-form");

//--------------------------------------------------------------------------------
// inputs
//--------------------------------------------------------------------------------
// file input
const fileInput = document.getElementById("file");

//--------------------------------------------------------------------------------
// buttons
//--------------------------------------------------------------------------------
// 전체 지우기
const destroyBtn = document.getElementById("destroy-btn");
// 이미지 다운로드
const saveBtn = document.getElementById("save");

//--------------------------------------------------------------------------------
// variables
//--------------------------------------------------------------------------------
// canvas size
const rect = canvas.getBoundingClientRect(); // 처음 get 요청 후의 canvas의 width
let CANVAS_WIDTH = rect.width; // 실질적인 canvas의 폭 사이즈
const CANVAS_HEIGHT = 200;
canvas.style.height = "200px"; // front 상의 높이 사이즈
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT; // 실질적인 canvas의 높이 사이즈

//--------------------------------------------------------------------------------
// init settings
//--------------------------------------------------------------------------------
ctx.lineCap = "round";
ctx.lineWidth = 3;
//--------------------------------------------------------------------------------
// states
//--------------------------------------------------------------------------------
let isPainting = false;

//--------------------------------------------------------------------------------
// onWidthChange function - 브라우저의 사이즈가 변경될 때마다 canvas의 width를 변경
//--------------------------------------------------------------------------------
function onWidthChange() {
  const rect = canvas.getBoundingClientRect();
  CANVAS_WIDTH = rect.width;
  canvas.width = CANVAS_WIDTH;

  //--------------------------------------------------------------------------------
  // init settings
  //--------------------------------------------------------------------------------
  ctx.lineCap = "round";
  ctx.lineWidth = 3;
}

//--------------------------------------------------------------------------------
// onMove function - isPainting이 true 일 때 선을 그린다.
//--------------------------------------------------------------------------------
function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

//--------------------------------------------------------------------------------
// startPainting function - isPainting을 false에서 true로 바꾼다.
//--------------------------------------------------------------------------------
function startPainting() {
  isPainting = true;
}

//--------------------------------------------------------------------------------
// cancelPainting function - isPainting을 true에서 false로 바꾼다..
//--------------------------------------------------------------------------------
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

//--------------------------------------------------------------------------------
// onDestroyClick function - destroyBtn 클릭했을 때, 흰색으로 캔버스 칠하기
//--------------------------------------------------------------------------------
function onDestroyClick() {
  ctx.save();
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
}

//--------------------------------------------------------------------------------
// onFileChange function - 이미지 파일 업로드 시, 이미지를 캔버스에 그리기
//--------------------------------------------------------------------------------
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    // 이미지 업로드 시, canvas의 size보다 작으면 업로드, 크면 에러 발생
    if (canvas.width >= this.width || canvas.height >= this.height) {
      ctx.save();
      //이미지 업로드 시, canvas에 그려지는 기준점을 가운데로 설정
      ctx.translate(
        canvas.width / 2 - this.width,
        canvas.height / 2 - this.height
      );
      ctx.drawImage(
        image,
        this.width / 2,
        this.height / 2,
        this.width,
        this.height
      );
      fileInput.value = null;
      ctx.restore();
    } else {
      alert(
        `Width must not exceed ${canvas.width}. Height must not exceed ${canvas.height}`
      );
    }
  };
}

//--------------------------------------------------------------------------------
// onSaveClick function - saveBtn 클릭할 때, 이미지 png로 다운로드
//--------------------------------------------------------------------------------
function onSaveClick() {
  const url = canvas.toDataURL(); // 이미지 url 생성
  const a = document.createElement("a"); // a 태그 임시 생성
  a.href = url; // href 어트리뷰트에 url 할당
  a.download = "myDrawing.png"; // 다운로드시 기본 파일명 설정
  a.click(); // a 테그 자동 클릭
}

//--------------------------------------------------------------------------------
// onCanvasSubmit function - 서명 완료 버튼을 눌렀을 때 서버로 img의 url 전송
//--------------------------------------------------------------------------------
async function onCanvasSubmit() {
  const url = "/send/signning";
  const imgUrl = canvas.toDataURL(); // 이미지 url 생성
  const fetchData = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({photo: imgUrl}),
  };

  return fetch(url, fetchData)
    .then(function (value) {
      if (value.ok) {
        return value.json();
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

//--------------------------------------------------------------------------------
// addEventListener
//--------------------------------------------------------------------------------
// 그리기 기능
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

// 이미지 파일 기능
fileInput.addEventListener("change", onFileChange);

// 버튼 클릭 기능
destroyBtn.addEventListener("click", onDestroyClick);
saveBtn.addEventListener("click", onSaveClick);

// 캔버스 width 추적 기능
window.addEventListener("resize", onWidthChange);

// Form Submit 기능
canvasForm.addEventListener("submit", onCanvasSubmit);
