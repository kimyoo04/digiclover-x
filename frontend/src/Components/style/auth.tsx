import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 94vh;
  padding-top: 100px;
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
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
`;

export const ErrorMessage = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
  color: ${(props) => props.theme.dangerColor};
`;

export const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 6px;
  font-size: 14px;
  transition: 0.1s;
  color: black;
  border: none;
  padding-left: 10px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: 1px solid ${(props) => props.theme.grayscale4Color};
  }
`;

export interface ILogInForm {
  email: string;
  password: string;
  extraError?: string;
}

export interface ISignInForm {
  email: string;
  company: string;
  name: string;
  phone: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
}
