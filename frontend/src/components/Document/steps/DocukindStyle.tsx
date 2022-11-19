// modules
import styled from "styled-components";
// components
import {FormWrapper, Input, Label} from "@components/Document/documentStyles";

export const FormRadioWrapper = styled(FormWrapper)``;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
  margin-bottom: 20px;
`;

export const RadioLabel = styled(Label)`
  justify-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100px;
  margin: 0;

  background-color: white;
  border-radius: 6px;

  font-size: 22px;
  font-weight: 700;

  cursor: pointer;
`;

export const Span = styled.span`
  transition: 0.2s;
  white-space: nowrap;
`;

export const RadioInput = styled(Input)`
  display: none;

  &:checked + Span {
    transform: scale(1.2);
    color: ${(props) => props.theme.primaryGreenColor};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;
