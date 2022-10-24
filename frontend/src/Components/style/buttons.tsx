// modules
import {motion} from "framer-motion";
import styled from "styled-components";

const Button = styled(motion.button)`
  width: 100%;
  height: 4rem;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  transition: 0.1s;
  color: black;
  background-color: ${(props) => props.theme.primaryGreenColor};
  border: none;
  cursor: pointer;
`;

export default Button;
