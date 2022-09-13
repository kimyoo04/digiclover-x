import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 80vh;
`;

export const FormWrapper = styled.div`
  border: 1px solid rgba(199, 199, 199, 0.4);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3%;
  padding: 50px;
`;

export const Label = styled.label`
  display: block;
  text-align: right;
  color: white;
  font-size: 16px;
  margin-bottom: 4px;
`;

export const ErrorMessage = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
  color: ${(props) => props.theme.dangerColor};
`;

export interface IForm {
  email: string;
  firstName: string;
  name: string;
  phone: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
}
