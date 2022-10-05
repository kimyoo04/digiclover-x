import {useRef, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DocumentDataService from "services/document";

import {useAppDispatch, useAppSelector} from "app/hook";
import {documentActions} from "features/document/documentSlice";

import styled from "styled-components";
import Button from "Components/style/buttons";
import {getNodeText} from "@testing-library/react";

const CanvasItem = styled.canvas`
  background-color: white;
  border-radius: 20px;
  box-shadow: $box-shadow-2;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

const LabelButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  transition: 0.1s;
  color: black;
  background-color: ${(props) => props.theme.primaryGreenColor};
  border: none;
  cursor: pointer;
`;

const Canvas = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const prevClick = () => {
    navigate(-1);
  };
  const goEmail = async () => {
    navigate(`/document/email`); // 지우기
  };
  const nextClick = async () => {
    // 서명한 imgUrl 저장
    const imgUrl = await canvasRef.current.toDataURL();
    dispatch(documentActions.afterSignning(imgUrl));

    // 문서 이미지 pdf화 (미완)
    // const html2canvas = require("html2canvas");
    // let img;
    // html2canvas(document.querySelector("#capture")).then((canvas) => {
    //   img = canvas.toDataURL("image/png", 1.0);
    // });
    await goEmail();
  };

  const [drawing, setDrawing] = useState(false);
  const ctxRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // canvas screen size
    const width = 400;
    const height = 260;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // canvas config
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineWidth = 4;
    ctxRef.current = ctx;
  }, []);

  const startDraw = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
  };
  const stopDraw = () => {
    ctxRef.current.closePath();
    setDrawing(false);
  };
  const draw = ({nativeEvent}) => {
    if (!drawing) return;
    const {offsetX, offsetY} = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };
  const clear = () => {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };
  const onSaveClick = () => {
    const url = canvasRef.current.toDataURL();
    const a = document.createElement("a"); // a 태그 임시 생성
    a.href = url; // href 어트리뷰트에 url 할당
    a.download = "myDrawing.png"; // 다운로드시 기본 파일명 설정
    a.click(); // a 테그 자동 클릭
  };
  const onFileChange = (event) => {
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
  const onCanvasSubmit = async () => {
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

  return (
    <>
      <CanvasItem
        onMouseMove={draw}
        onMouseDown={startDraw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        ref={canvasRef}
      />
      <ButtonWrapper>
        <Button onClick={clear}>지우기</Button>
        <Button onClick={onSaveClick}>서명 저장</Button>
        <LabelButton htmlFor="file">서명 업로드</LabelButton>
        <input
          onChange={onFileChange}
          id="file"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{
            display: "none",
          }}
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <Button
          onClick={prevClick}
          whileHover={{scale: 1.1}}
          transition={{duration: 0.05}}
        >
          Prev
        </Button>
        <Button
          onClick={nextClick}
          whileHover={{scale: 1.1}}
          transition={{duration: 0.05}}
        >
          Next
        </Button>
        {/* // onCanvasSubmit 으로 추후 수정 */}
      </ButtonWrapper>
    </>
  );
};

export default Canvas;

// onMouseMove = {onMove};
// onMouseDown = {startPainting};
// onMouseUp = {cancelPainting};
// onMouseLeave = {cancelPainting};
