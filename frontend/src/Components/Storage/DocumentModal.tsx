import {AnimatePresence, motion} from "framer-motion";
import {PathMatch, useMatch, useNavigate} from "react-router-dom";
import styled from "styled-components";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;

const Modal = styled(motion.div)`
  position: absolute;
  width: 44vw;
  height: 70vh;
  left: 0;
  right: 0;
  margin: auto auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgWhiteColor};
`;

const DocumentModal = () => {
  const navigate = useNavigate();
  const docuMatch: PathMatch<string> | null = useMatch("/storage/:id");
  const onOverlayClick = () => navigate("/storage");

  return (
    <AnimatePresence>
      {docuMatch ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{durationL: 0.2}}
          />
          <Modal
            exit={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{durationL: 0.2}}
          ></Modal>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default DocumentModal;
