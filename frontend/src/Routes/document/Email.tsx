import styled from "styled-components";
import Button from "Components/style/buttons";
import {Wrapper} from "Components/style/document";
import {useNavigate} from "react-router-dom";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

const Email = () => {
  let navigate = useNavigate();
  function prevClick() {
    navigate(-1);
  }
  function finishClick() {
    navigate(`/storage`);
  }

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button onClick={prevClick}>Prev</Button>
        <Button onClick={finishClick}>Finish</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Email;
