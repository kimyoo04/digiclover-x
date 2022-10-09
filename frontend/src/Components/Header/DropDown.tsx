import {LinkDropDown} from "Components/Auth/auth";
import {motion} from "framer-motion";
import {opacity} from "html2canvas/dist/types/css/property-descriptors/opacity";
import {useState} from "react";
import styled from "styled-components";

const DropDownWrapper = styled(motion.ul)`
  position: fixed;
  top: 64px;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: ${(props) => props.theme.bgColor};
  border-radius: 0.6rem;

  width: 100vw;
  padding: 1.4rem;

  & li {
    border-bottom: 1px solid ${(props) => props.theme.bgWhiteColor};
    padding-bottom: 1rem;
  }
`;

const MenuIcon = styled(motion.i)`
  color: ${(props) => props.theme.textColor};
  font-size: 1.8rem;
  font-weight: 700;
`;

const Overlay = styled.div`
  position: fixed;

  width: 100vw;
  height: 100vh;
`;

const DropDown = () => {
  const [isView, setIsView] = useState(false);
  const variants = {
    closed: {opacity: 0, y: "-200%"},
    open: {opacity: 1, y: 0},
  };

  return (
    <>
      <MenuIcon
        whileHover={{scale: 1.1}}
        className="ri-menu-2-line"
        onClick={() => setIsView((prev) => !prev)}
      ></MenuIcon>
      {isView ? (
        <Overlay onClick={() => setIsView((prev) => !prev)}></Overlay>
      ) : null}
      <DropDownWrapper
        initial={{opacity: 0}}
        animate={!isView ? "closed" : "open"}
        variants={variants}
      >
        <li>
          <LinkDropDown to="/document/start">
            <i className="ri-edit-2-fill"></i> 문서 작성
          </LinkDropDown>
        </li>
        <li>
          <LinkDropDown to="/storage">
            <i className="ri-suitcase-line"></i>문서 보관함
          </LinkDropDown>
        </li>
      </DropDownWrapper>
    </>
  );
};

export default DropDown;
