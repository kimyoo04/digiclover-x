// modules
import {useRef, useState, useEffect} from "react";
// redux-toolkit
import {useAppDispatch, useAppSelector} from "@app/hook";
import {documentActions} from "@features/document/documentSlice";
import {alertActions} from "@features/alert/alertSlice";
// components
import Button from "@components/Style/buttons";
// style
import {
  Agreement,
  ButtonWrapper,
  CanvasItem,
  DivButton,
  LabelButton,
} from "./CanvasStyle";
// canvas functions
import {startDraw, draw, stopDraw} from "./CanvasMouseEvent";
import {stopTouchDraw, touchDraw, startTouchDraw} from "./CanvasTouchEvent";
import {clear, onFileChange, onSaveClick} from "./CanvasUtil";
// controllers
import {postOneDocument} from "@controllers/documents.controller";
import {deleteOneDraft} from "@controllers/drafts.controller";

const Canvas = () => {
  const [isCheck, setIsCheck] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const document = useAppSelector((state) => state.document);
  const dispatch = useAppDispatch();
  const prevClick = () => {
    dispatch(documentActions.beforeSignning());
  };

  const nextClick = async () => {
    if (isDrawn && user.id) {
      if (isCheck) {
        const {documentID} = document;

        // 서명한 imgUrl 저장
        const imgUrl = await canvasRef.current.toDataURL();

        // (추후) 서명 위치 설정 기능 구현 필요
        dispatch(documentActions.afterSignning(imgUrl));

        // drafts collection의 문서 삭제
        if (documentID !== "") await deleteOneDraft(documentID);

        // document doc & signature doc 생성
        const newDocumentID = await postOneDocument(user.id, document);
        if (newDocumentID)
          dispatch(documentActions.saveDocumentID(newDocumentID));
      } else {
        dispatch(
          alertActions.alert({
            alertType: "Infomation",
            content: "문서 저장 및 정보 이용 동의를 체크해 주세요.",
          })
        );
      }
    } else {
      dispatch(
        alertActions.alert({
          alertType: "Infomation",
          content: "서명을 해주세요.",
        })
      );
    }
  };

  const toggleChecking = () => setIsCheck((prev) => !prev);

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
      <Agreement>
        <label htmlFor="agree">
          이메일 전송 및 개인정보 이용 동의
          <input id="agree" type="checkbox" onChange={toggleChecking} />
        </label>
      </Agreement>
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
      </ButtonWrapper>
    </>
  );
};

export default Canvas;
