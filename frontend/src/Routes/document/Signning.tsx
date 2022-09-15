import styled from "styled-components";
import Button from "Components/style/buttons";
import {Wrapper} from "Components/style/document";
import {useNavigate} from "react-router-dom";
import Canvas from "Components/Document/Canvas";

const Main = styled.div`
  max-width: 400px;
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

const Signning = () => {
  let navigate = useNavigate();
  function prevClick() {
    navigate(-1);
  }
  function nextClick() {
    navigate(`/document/email`);
  }

  return (
    <Wrapper>
      <Main>
        <Canvas />
        <ButtonWrapper>
          <Button>지우기</Button>
          <Button>서명 저장</Button>
          <LabelButton htmlFor="file">서명 업로드</LabelButton>
          <input
            id="file"
            type="file"
            accept="image/*"
            style={{
              display: "none",
            }}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={prevClick}>Prev</Button>
          <Button onClick={nextClick}>Next</Button>
        </ButtonWrapper>
      </Main>
    </Wrapper>
  );
};

export default Signning;
