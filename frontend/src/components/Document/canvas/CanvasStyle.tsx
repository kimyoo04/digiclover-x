import {motion} from "framer-motion";
import styled from "styled-components";

export const CanvasItem = styled.canvas`
  background-color: white;
  box-shadow: $box-shadow-2;
  border-radius: 20px;
  margin-bottom: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  width: 100%;
  margin-bottom: 20px;
`;

export const LabelButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 35px;

  color: black;
  font-size: 14px;
  font-weight: 600;

  background-color: ${(props) => props.theme.primaryGreenColor};
  border-radius: 6px;
  border: none;

  transition: 0.1s;
  cursor: pointer;
`;

export const DivButton = styled(motion.a)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;

  background-color: ${(props) => props.theme.primaryGreenColor};
  border-radius: 6px;
  border: none;

  color: black;
  font-size: 14px;
  font-weight: 600;

  transition: 0.1s;
  cursor: pointer;
`;

export const Agreement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & label {
    display: block;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${(props) => props.theme.textColor};

    & input {
      margin-left: 20px;
    }
  }
`;
