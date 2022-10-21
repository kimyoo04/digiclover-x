// modules
import {useRef, useState, useEffect} from "react";
// redux-toolkit
import {useAppDispatch} from "@app/hook";
import {documentActions} from "@features/document/documentSlice";
import {alertActions} from "@features/alert/alertSlice";
// components
import Button from "@components/Style/buttons";
// style
import {ButtonWrapper, CanvasItem, DivButton, LabelButton} from "./CanvasStyle";
// canvas functions
import {startDraw, draw, stopDraw} from "./CanvasMouseEvent";
import {stopTouchDraw, touchDraw, startTouchDraw} from "./CanvasTouchEvent";
import {clear, onFileChange, onSaveClick} from "./CanvasUtil";

const Canvas = () => {
  const dispatch = useAppDispatch();
  const prevClick = () => {
    dispatch(documentActions.beforeSignning());
  };

  const nextClick = async () => {
    if (isDrawn) {
      // 서명한 imgUrl 저장
      const imgUrl = await canvasRef.current.toDataURL();
      dispatch(documentActions.afterSignning(imgUrl));
    } else {
      dispatch(
        alertActions.alert({
          alertType: "Infomation",
          content: "서명을 해주세요.",
        })
      );
    }
  };

  // 서명 했는지 안했는지 체크
  const [isDrawn, setIsDrawn] = useState(false);
  // 그리는 중인지 체크
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

  return (
    <>
      <CanvasItem
        onMouseDown={({nativeEvent}) =>
          startDraw(ctxRef, setDrawing, setIsDrawn, {nativeEvent})
        }
        onMouseMove={({nativeEvent}) => draw(ctxRef, drawing, {nativeEvent})}
        onMouseUp={() => stopDraw(ctxRef, setDrawing)}
        onMouseLeave={() => stopDraw(ctxRef, setDrawing)}
        ref={canvasRef}
        onTouchStart={({nativeEvent}) =>
          startTouchDraw(canvasRef, ctxRef, setDrawing, setIsDrawn, {
            nativeEvent,
          })
        }
        onTouchMove={({nativeEvent}) =>
          touchDraw(canvasRef, ctxRef, drawing, {nativeEvent})
        }
        onTouchEnd={() => stopTouchDraw(ctxRef, setDrawing)}
      />

      <ButtonWrapper>
        <Button onClick={() => clear(ctxRef, canvasRef, setIsDrawn)}>
          지우기
        </Button>
        <Button onClick={() => onSaveClick(canvasRef, isDrawn)}>
          서명 저장
        </Button>
        <LabelButton htmlFor="file">서명 업로드</LabelButton>
        <input
          onChange={() => onFileChange(ctxRef, canvasRef, fileInputRef)}
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
        <DivButton
          onClick={prevClick}
          whileHover={{scale: 1.1}}
          transition={{duration: 0.05}}
        >
          Prev
        </DivButton>
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
