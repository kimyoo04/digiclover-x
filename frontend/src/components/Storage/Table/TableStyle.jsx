import styled from "styled-components";

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
