export const clear = (ctxRef, canvasRef, setIsDrawn) => {
  ctxRef.current.clearRect(
    0,
    0,
    canvasRef.current.width,
    canvasRef.current.height
  );

  // 서명을 하지 않은 상태 저장
  setIsDrawn(false);
};
export const onSaveClick = (canvasRef, isDrawn) => {
  if (isDrawn) {
    const url = canvasRef.current.toDataURL();
    const a = document.createElement("a"); // a 태그 임시 생성
    a.href = url; // href 어트리뷰트에 url 할당
    a.download = "myDrawing.png"; // 다운로드시 기본 파일명 설정
    a.click(); // a 테그 자동 클릭
  }
};
export const onFileChange = (event, ctxRef, canvasRef, fileInputRef) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    // 이미지 업로드 시, canvas의 size보다 작으면 업로드, 크면 에러 발생
    if (
      canvasRef.current.width >= this.width ||
      canvasRef.current.height >= this.height
    ) {
      ctxRef.current.save();
      //이미지 업로드 시, canvas에 그려지는 기준점을 가운데로 설정
      ctxRef.current.translate(
        canvasRef.current.width / 2 - this.width,
        canvasRef.current.height / 2 - this.height
      );

      ctxRef.current.drawImage(
        image,
        this.width / 2,
        this.height / 2,
        this.width,
        this.height
      );
      fileInputRef.current.value = null;
      ctxRef.current.restore();
    } else {
      alert(
        `Width must not exceed ${canvasRef.current.width}. Height must not exceed ${canvasRef.current.height}`
      );
    }
  };
};
export const onCanvasSubmit = async (canvasRef) => {
  const url = "/document/email"; // 서버 api 추후 수정
  const imgUrl = canvasRef.current.toDataURL(); // 이미지 url 생성
  const fetchData = {
    method: "POST",
    redirect: "error",
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
};
