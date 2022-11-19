// modules
import styled from "styled-components";

export const ButtonWrapper = styled.div`
  margin-left: 1rem;
`;

export const SaveBtn = styled.div`
  background-color: ${(props) => props.theme.primaryBlueColor};
  padding: 0 0.6rem;
  border-radius: 0.6rem;

  & span {
    font-size: 1.6rem;
    font-weight: 500;
  }
`;
