import styled from "styled-components";
import Button from "Components/style/buttons";
import {Wrapper} from "Components/style/document";
import {useNavigate} from "react-router-dom";

const Email = () => {
  let navigate = useNavigate();
  function prevClick() {
    navigate(-1);
  }
  function nextClick() {
    navigate(1);
  }

  return (
    <Wrapper>
      <Button onClick={prevClick}>Next</Button>
      <Button onClick={nextClick}>Next</Button>
    </Wrapper>
  );
};

export default Email;
