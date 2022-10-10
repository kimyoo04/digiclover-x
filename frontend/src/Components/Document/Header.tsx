import {motion} from "framer-motion";
import styled from "styled-components";

import {useAppSelector} from "app/hook";

const Nav = styled.ul`
  position: fixed;
  top: 0;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

  width: 100%;
  height: 6vh;
  padding: 0 30px;

  color: white;
  font-size: 14px;

  background-color: ${(props) => props.theme.bgColor};
  z-index: 100;
  & Link {
    font-style: none;
  }
`;

const Item = styled.li`
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${(props) => props.theme.textColor};
`;

const StepWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & span {
    font-size: 1.4rem;
    font-weight: 700;
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

const UnfinishedStep = styled(motion.div)`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.grayscale4Color};
  border: 2px solid ${(props) => props.theme.grayscale3Color};
`;

const FinishedStep = styled(UnfinishedStep)`
  background-color: ${(props) => props.theme.primaryBlueColor};
  border: none;
`;

const OngoingStep = styled(UnfinishedStep)`
  border: 2px solid ${(props) => props.theme.primaryBlueColor};
  background-color: white;
`;

const DocumentHeader = () => {
  const documentStep = useAppSelector((state) => state.document.step);

  return (
    <Nav>
      <Item>
        {documentStep === 1 ? (
          <StepWrapper>
            <OngoingStep />
            <span className="active">계약자 입력</span>
          </StepWrapper>
        ) : documentStep > 1 ? (
          <StepWrapper>
            <FinishedStep />
            <span className="finished">계약자 입력</span>
          </StepWrapper>
        ) : (
          <StepWrapper>
            <UnfinishedStep />
            <span className="unfinished">계약자 입력</span>
          </StepWrapper>
        )}
      </Item>

      <Item>
        {documentStep === 2 ? (
          <StepWrapper>
            <OngoingStep />
            <span className="active">문서 선택</span>
          </StepWrapper>
        ) : documentStep > 2 ? (
          <StepWrapper>
            <FinishedStep />
            <span className="finished">문서 선택</span>
          </StepWrapper>
        ) : (
          <StepWrapper>
            <UnfinishedStep />
            <span className="unfinished">문서 선택</span>
          </StepWrapper>
        )}
      </Item>

      <Item>
        {documentStep === 3 ? (
          <StepWrapper>
            <OngoingStep />
            <span className="active">문서 작성</span>
          </StepWrapper>
        ) : documentStep > 3 ? (
          <StepWrapper>
            <FinishedStep />
            <span className="finished">문서 작성</span>
          </StepWrapper>
        ) : (
          <StepWrapper>
            <UnfinishedStep />
            <span className="unfinished">문서 작성</span>
          </StepWrapper>
        )}
      </Item>

      <Item>
        {documentStep === 4 ? (
          <StepWrapper>
            <OngoingStep />
            <span className="active">서명</span>
          </StepWrapper>
        ) : documentStep > 4 ? (
          <StepWrapper>
            <FinishedStep />
            <span className="finished">서명</span>
          </StepWrapper>
        ) : (
          <StepWrapper>
            <UnfinishedStep />
            <span className="unfinished">서명</span>
          </StepWrapper>
        )}
      </Item>

      <Item>
        {documentStep === 5 ? (
          <StepWrapper>
            <OngoingStep />
            <span className="active">서명 위치 설정</span>
          </StepWrapper>
        ) : documentStep > 5 ? (
          <StepWrapper>
            <FinishedStep />
            <span className="finished">서명 위치 설정</span>
          </StepWrapper>
        ) : (
          <StepWrapper>
            <UnfinishedStep />
            <span className="unfinished">서명 위치 설정</span>
          </StepWrapper>
        )}
      </Item>

      <Item>
        {documentStep === 6 ? (
          <StepWrapper>
            <OngoingStep />
            <span className="active">이메일 전송</span>
          </StepWrapper>
        ) : documentStep > 6 ? (
          <StepWrapper>
            <FinishedStep />
            <span className="finished">이메일 전송</span>
          </StepWrapper>
        ) : (
          <StepWrapper>
            <UnfinishedStep />
            <span className="unfinished">이메일 전송</span>
          </StepWrapper>
        )}
      </Item>
    </Nav>
  );
};

export default DocumentHeader;
