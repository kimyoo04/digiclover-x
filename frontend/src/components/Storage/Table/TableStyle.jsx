import styled from "styled-components";

export const Table = styled.table`
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;

  td,
  th,
  td,
  tfoot {
    font-size: 1.4rem;
    color: ${(props) => props.theme.textColor};
    padding: 0.8rem;
  }

  th {
    border-bottom: 1px solid ${(props) => props.theme.grayscale5Color};
  }

  td {
    border-bottom: 1px solid ${(props) => props.theme.grayscale5Color};
    justify-content: space-between;
  }

  & tr {
    background-color: ${(props) => props.theme.bgColor};
  }

  & tbody tr:hover {
    background-color: ${(props) => props.theme.bgWhiteTransColor1};
  }

  & th,
  tfoot td {
    text-align: left;
  }

  /* 중앙 정렬할 필드 */
  & th:first-child,
  & th:nth-child(2),
  & th:last-child,
  & tr td:first-child,
  & tr td:nth-child(2),
  & tr td:last-child {
    padding: auto;
    text-align: center;
  }

  .resizer {
    display: inline-block;
    border-left: 1px solid ${(props) => props.theme.bgWhiteColor};
    border-right: 1px solid ${(props) => props.theme.bgWhiteColor};
    width: 0.6rem;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 1;
    /* prevent scroll on touch devices */
    touch-action: none;
  }

  .isResizing {
    background: red;
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
