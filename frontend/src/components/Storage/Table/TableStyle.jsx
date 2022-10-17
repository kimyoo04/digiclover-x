import styled from "styled-components";
import Button from "@components/Style/buttons";

export const Table = styled.table`
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;

  & td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  & tr:nth-child(even) {
    background-color: ${(props) => props.theme.secondaryLightBlueColor};
    color: ${(props) => props.theme.textBlackColor};
  }
  & tr:nth-child(odd) {
    background-color: ${(props) => props.theme.secondaryLightMintColor};
    color: ${(props) => props.theme.textBlackColor};
  }

  & tr:hover {
    background-color: #dce5e9;
  }

  & th,
  tfoot td {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: ${(props) => props.theme.grayscale4Color};
    color: ${(props) => props.theme.textWhiteColor};
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.2rem;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & div label {
    & span {
      color: ${(props) => props.theme.textColor};
      font-size: 1.4rem;
      font-weight: 500;
    }

    & input {
      margin-left: 2rem;
    }
  }
`;

export const DeleteButton = styled(Button)`
  height: 40px;
`;

export const ModalButton = styled(Button)`
  height: 40px;
`;

export const StatusIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.color};
  border-radius: 6px;

  width: 100%;
  height: 40px;

  font-size: 14px;
  font-weight: 500;

  color: black;

  transition: 0.1s;
  border: none;
`;
