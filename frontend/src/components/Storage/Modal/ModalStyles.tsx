import styled from "styled-components";
import Button from "@components/Style/buttons";
import {motion} from "framer-motion";

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 100;
`;

export const DocumentModal = styled(motion.div)`
  position: absolute;
  width: 44vw;
  height: 70vh;
  left: 0;
  right: 0;
  margin: auto auto;
  padding: 30px;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgWhiteColor};
  z-index: 100;
`;

export const DocumentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 40px;
`;

export const DocuButton = styled(Button)`
  width: 100%;
  height: 100%;
  font-size: 18px;
`;
