import styled from "styled-components";

import {useEffect} from "react";
import {useRecoilState} from "recoil";

import {useNavigate} from "react-router-dom";
import Button from "Components/style/buttons";
import {Wrapper} from "Components/style/document";
import {isLoggedInState} from "atom/userAtom";
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

const Writing = () => {
  const navigate = useNavigate();
  function prevClick() {
    navigate(-1);
  }
  function goHome() {
    navigate(`/`);
  }

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  // 로그인 분기 처리
  useEffect(() => {
    if (!isLoggedIn) {
      goHome();
    }
  }, []);

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Writing;
