// modules
import styled from "styled-components";

export const EmailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

export const AgreeLabel = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${(props) => props.theme.textColor};

  & input {
    margin-left: 20px;
  }
`;
