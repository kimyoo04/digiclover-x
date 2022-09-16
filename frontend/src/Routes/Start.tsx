import Button from "Components/style/buttons";
import {Wrapper} from "Components/style/document";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const StartBtn = styled(Button)`
  padding: 10px;
`;

const Text = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const DocumentStart = () => {
  // 추후 로그인 분기 처리
  useEffect(() => console.log("작동"), []);

  return (
    <Wrapper>
      <Text>문서작성을 시작하시겠습니까?</Text>
      <Link to={{pathname: `/document/contractor`}}>
        <StartBtn whileHover={{scale: 1.1}} transition={{duration: 0.05}}>
          문서 작성 시작
        </StartBtn>
      </Link>
    </Wrapper>
  );
};

export default DocumentStart;
