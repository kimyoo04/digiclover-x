// modules
import styled from "styled-components";
// public
import arrowIcon from "@public/assets/img/arrow-down-s-line.svg";

export const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Select = styled.select`
  background-color: ${(props) => props.theme.secondaryLightBlueColor};
  border-radius: 6px;
  height: 100%;
  font-size: 16px;
  font-weight: 600;
  font-family: "Roboto", sans-serif;

  border: none;
  appearance: none;
  -webkit-appearance: none;
  outline: none;

  padding: 0 28px 0 6px;
  margin-left: 4px;

  cursor: pointer;

  background-image: url(${arrowIcon});
  background-repeat: no-repeat;
  background-position: calc(90%) center;
  background-size: 24px;
`;

export const Option = styled.option``;
