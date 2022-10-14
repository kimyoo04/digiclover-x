// modules
import styled from "styled-components";
// components
import Canvas from "@components/Document/Canvas";

const FormWrapper = styled.div``;

const Signning = () => {
  // 앞 1,2,3 과정과 현 4 과정의 데이터들을 모두 db에 입력 및 5 과정으로 리다이렉트

  return (
    <FormWrapper>
      <Canvas />
    </FormWrapper>
  );
};

export default Signning;
