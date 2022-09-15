import styled from "styled-components";
import {Wrapper} from "Components/style/document";
import Canvas from "Components/Document/Canvas";

const Main = styled.div`
  max-width: 400px;
`;

const Signning = () => {
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
