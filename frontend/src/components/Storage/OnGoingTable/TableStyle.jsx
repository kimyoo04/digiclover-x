import {breakpoints} from "@components/Util/breakPoints";
import styled from "styled-components";

export const Table = styled.table`
  width: 100%;

  td,
  th,
  td,
  tfoot {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    ${breakpoints("font-size", "rem", [{300: 1.2}, {600: 1.4}])}
    color: ${(props) => props.theme.textColor};
    padding: 0.8rem;
    vertical-align: middle;
    border-bottom: 1px solid ${(props) => props.theme.grayscale4Color};
    overflow: hidden;
  }

  th {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  td {
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
    justify-content: center;
  }

  /* column resize class */
  .resizer {
    display: inline-block;
    border-left: 1px solid ${(props) => props.theme.grayscale4Color};
    width: 1rem;
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
    background: ${(props) => props.theme.primaryBlueColor};
  }

  /* sticky setting */

  &.sticky {
    overflow: scroll;

    thead {
      position: sticky;
      z-index: 1;
      width: fit-content;
      top: 0;
    }

    tbody {
      position: relative;
      z-index: 0;
    }
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
