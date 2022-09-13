import styled from "styled-components";
import DocumentItem from "Components/DocumentItem";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgWhiteColor};
  padding-top: 100px;
  height: 200vh;
`;

const Storage = () => {
  return (
    <Wrapper>
      <DocumentItem></DocumentItem>
    </Wrapper>
  );
};

export default Storage;
