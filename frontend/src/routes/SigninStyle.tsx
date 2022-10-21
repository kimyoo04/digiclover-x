// modules
import {Link} from "react-router-dom";
import styled from "styled-components";
// components
import Button from "@components/Style/buttons";

export const HookForm = styled.form``;

export const ButtonWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const GoHomeText = styled.span`
  display: block;
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const SignupLink = styled(Link)`
  display: flex;
  flex-direction: center;
  align-items: center;

  & span {
    color: ${(props) => props.theme.grayscale4Color};
    font-size: 1.4rem;
    font-weight: 300;
  }
`;

// ------------------------------------------------------------
// Oauth Components

export const SnsLogin = styled.span`
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
`;

export const GoogleBtn = styled(Button)`
  width: 100%;

  background-color: ${(props) => props.theme.GoogleBtrColor};
  color: ${(props) => props.theme.GoogleTextColor};
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

export const GoogleImg = styled.img`
  position: relative;
  left: 8px;
`;
export const FacebookBtn = styled(Button)`
  width: 100%;

  background-color: #4267b2;
  color: ${(props) => props.theme.textColor};
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

export const FacebookImg = styled.img`
  position: relative;
  left: 8px;
`;

export const KakaoBtn = styled(Button)`
  background-color: #fae100;
  color: ${(props) => props.theme.textColor};
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

export const KakaoImg = styled.img`
  position: relative;
  left: 8px;
`;
