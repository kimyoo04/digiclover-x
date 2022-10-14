// modules
import {motion} from "framer-motion";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
// redux-toolkit
import {useAppSelector} from "@app/hook";
import PreventUnload from "@util/PreventUnload";

const ProgressBar = styled.ul`
  position: sticky;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  padding: 2rem 20vw 6rem 20vw;
  height: 6vh;

  color: white;
  font-size: 14px;

  background-color: ${(props) => props.theme.bgColor};
  z-index: 20;
  & Link {
    font-style: none;
  }
`;

const StepWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 5.4rem;

  & span {
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
  }

  & span.unfinished {
    color: ${(props) => props.theme.grayscale3Color};
  }
  & span.active {
    color: ${(props) => props.theme.primaryBlueColor};
  }
  & span.finished {
    ${(props) => props.theme.textColor};
  }
`;

const UnfinishedCircle = styled(motion.div)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.grayscale4Color};
  border: 2px solid ${(props) => props.theme.grayscale3Color};
`;

const FinishedCircle = styled(UnfinishedCircle)`
  background-color: ${(props) => props.theme.primaryBlueColor};
  border: none;
`;

const OngoingCircle = styled(UnfinishedCircle)`
  border: 2px solid ${(props) => props.theme.primaryBlueColor};
  background-color: white;
`;

const DocumentHeader = () => {
  const documentStep = useAppSelector(
    (state: {document: {step: number}}) => state.document.step
  );

  const navigate = useNavigate();

  window.onpopstate = () => {
    navigate("/");
  };

  // 새로고침, 나가기 1차 방지
  PreventUnload();

  return (
    <ProgressBar>
      {[
        "계약자 입력",
        "문서 선택",
        "문서 작성",
        "요청자 서명",
        "위치 설정",
        "이메일 전송",
      ].map((title, index) =>
        documentStep === index + 1 ? (
          <StepWrapper>
            <OngoingCircle />
            <span className="active">{title}</span>
          </StepWrapper>
        ) : documentStep > index + 1 ? (
          <StepWrapper>
            <FinishedCircle />
            <span className="finished">{title}</span>
          </StepWrapper>
        ) : (
          <StepWrapper>
            <UnfinishedCircle />
            <span className="unfinished">{title}</span>
          </StepWrapper>
        )
      )}
    </ProgressBar>
  );
};

export default DocumentHeader;
