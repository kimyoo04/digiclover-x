import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoggedInState} from "atom/userAtom";

import styled from "styled-components";
import {Wrapper} from "Components/style/document";
import Canvas from "Components/Document/Canvas";
import {docuContentState, docuKindState} from "atom/documentAtom";

const Main = styled.div`
  max-width: 400px;
`;

const Signning = () => {
  const navigate = useNavigate();

  function goHome() {
    navigate(`/`);
  }

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const docuKind = useRecoilValue(docuKindState);
  const docuContent = useRecoilValue(docuContentState);

  // 로그인 분기 처리
  useEffect(() => {
    if (!isLoggedIn) {
      goHome();
    }
  }, []);

  console.log(docuContent);
  // 앞 1,2,3 과정과 현 4 과정의 데이터들을 모두 db에 입력 및 5 과정으로 리다이렉트

  return (
    <Wrapper>
      <Main>
        <Canvas />
      </Main>
    </Wrapper>
  );
};

export default Signning;
