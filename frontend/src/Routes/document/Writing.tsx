import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useRecoilState} from "recoil";

import styled from "styled-components";
import Button from "Components/style/buttons";
import {Wrapper} from "Components/style/layout";
import Tiptap from "Components/Document/tiptap";

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

const WritingWrapper = styled(Wrapper)`
  gap: 0;
`;

const Writing = () => {
  const navigate = useNavigate();
  function prevClick() {
    navigate(-1);
  }

  return (
    <WritingWrapper>
      <Tiptap isEditable={true} />
      <ButtonWrapper>
        <Button
          onClick={prevClick}
          whileHover={{scale: 1.1}}
          transition={{duration: 0.05}}
        >
          Prev
        </Button>
        <Button
          form="docuTitleForm"
          whileHover={{scale: 1.1}}
          transition={{duration: 0.05}}
        >
          Next
        </Button>
      </ButtonWrapper>
    </WritingWrapper>
  );
};

export default Writing;
