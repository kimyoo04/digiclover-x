import styled from "styled-components";
import Button from "@components/Style/buttons";

export const Table = styled.table`
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;

  & td,
  th {
    font-size: 1.4rem;
    border-bottom: 1px solid ${(props) => props.theme.grayscale3Color};
    padding: 0.8rem;
  }

  & tr {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }

  & tr:hover {
    background-color: ${(props) => props.theme.bgWhiteTransColor1};
  }

  & th,
  tfoot td {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: ${(props) => props.theme.grayscale4Color};
    color: ${(props) => props.theme.textWhiteColor};
  }

  /* 중앙 정렬할 필드 */
  & th:first-child,
  & th:nth-child(2),
  & th:last-child,
  & tr td:first-child,
  & tr td:nth-child(2),
  & tr td:last-child {
    padding: 0;
    text-align: center;
  }
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
