// modules
import styled from "styled-components";

export const Col = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-height: 100vh;
  padding-top: 100px;
  background-color: ${(props) => props.theme.bgColor};
`;
