// modules
import styled from "styled-components";
// components
import Button from "@components/Style/buttons";
import {Input} from "@components/Document/documentStyles";

export const ContractorWrapper = styled.ul`
  background-color: ${(props) => props.theme.bgWhiteColor};
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;

  & li {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const InputHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;

  & span {
    color: ${(props) => props.theme.textWhiteColor};
    font-weight: 700;
  }

  & button {
    background-color: transparent;
    border: none;
    padding: 0;

    & i {
      font-size: 20px;
      font-weight: 700;
      color: ${(props) => props.theme.textWhiteColor};
      cursor: pointer;
    }
  }
`;

export const EditButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const PlusButton = styled(Button)`
  background-color: ${(props) => props.theme.primaryBlueColor};
  & i {
    font-size: 20px;
  }
`;
export const ResetButton = styled(Button)`
  background-color: white;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

export const ContractorInput = styled(Input)``;
