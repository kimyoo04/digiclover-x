// modules
import styled from "styled-components";
// components
import {Text} from "@components/Style/text";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  & div:first-child {
    align-items: flex-start;

    font-weight: 500;
  }

  & div:first-child {
    align-items: flex-start;
  }
`;

export const DateText = styled(Text)`
  display: block;
  color: ${(props) => props.theme.textWhiteColor};
`;

export const HText = styled(Text)`
  display: block;
  color: ${(props) => props.theme.textWhiteColor};
  font-size: 18px;
  font-weight: 700;
`;

export const SignatureImg = styled.img`
  width: 200px;
  height: 100px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;
