import styled from "styled-components";
import Button from "@components/Style/buttons";

export const HookForm = styled.form`
  margin-bottom: 30px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const SnsLogin = styled.span`
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
`;

export const KakaoBtn = styled(Button)`
  background-color: #fae100;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

export const GoogleBtn = styled(Button)`
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

export const GoHomeText = styled.span`
  display: block;
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;
