import styled from "styled-components";
import Button from "Components/style/buttons";
import {Wrapper} from "Components/style/document";
import {useNavigate} from "react-router-dom";
import TiptapEditor from "Components/Document/Tiptap";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin: 0 10vw;
  margin-bottom: 20px;
`;

const Writing = () => {
  let navigate = useNavigate();
  function prevClick() {
    navigate(-1);
  }
  function nextClick() {
    navigate(`/document/signning`); //, {state: data}로 문서 html값을 넣을 것, recoil 이용할 것
  }

  return (
    <Wrapper>
      <TiptapEditor />
      <ButtonWrapper>
        <Button onClick={prevClick}>Prev</Button>
        <Button onClick={nextClick}>Next</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Writing;
