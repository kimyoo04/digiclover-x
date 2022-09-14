import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 94vh;
  padding-top: 100px;
`;
