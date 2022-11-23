// modules
import styled from "styled-components";
// components
import {Input, Label} from "@components/Auth/authStyle";

export const ProfileWrapper = styled.div``;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  & span {
    color: ${(props) => props.theme.textColor};
    font-weight: 700;
    font-size: 1.8rem;
  }

  & button {
    display: flex;
    align-items: center;

    background-color: transparent;
    border: none;

    font-size: 26px;
    color: ${(props) => props.theme.bgWhiteColor};

    & i {
      font-size: 2.2rem;
    }

    &.readOnly {
      color: ${(props) => props.theme.bgWhiteTransColor2};
    }
  }
`;

export const InputLabel = styled(Label)`
  font-size: 1.4rem;
`;

export const SaveButton = styled(Input)`
  margin-top: 10px;
  background-color: ${(props) => props.theme.primaryGreenColor};
  font-size: 16px;
  font-weight: 500;
`;
