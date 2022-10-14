// modules
import {NavLink} from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
`;

export const FormWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.bgWhiteTransColor2};
  background-color: ${(props) => props.theme.bgWhiteTransColor1};
  border-radius: 3%;
  padding: 3rem;
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
  font-size: 1.2rem;
  margin-bottom: 4px;
  color: ${(props) => props.theme.dangerColor};
`;

export const Input = styled.input`
  width: 70vw;
  max-width: 250px;
  height: 40px;
  border-radius: 6px;
  font-size: 1.4rem;
  transition: 0.1s;
  color: black;
  border: none;
  padding-left: 10px;

  &::placeholder {
    color: ${(props) => props.theme.primaryBlueColor};
    font-size: 1.2rem;
  }

  &:focus {
    outline: 1px solid ${(props) => props.theme.grayscale4Color};
  }
`;

export const Link = styled(NavLink)`
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  white-space: nowrap;

  display: flex;
  align-items: center;

  &.active {
    color: ${(props) => props.theme.primaryBlueColor};
  }

  & i {
    font-size: 2rem;
    margin-right: 0.6rem;
  }
`;
export const LinkDropDown = styled(Link)`
  &:hover {
    background-color: ${(props) => props.theme.bgBlackTransColor};
  }
`;

export const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-bottom: 60px;
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
