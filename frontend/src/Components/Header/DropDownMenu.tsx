// modules
import {useState} from "react";
import {motion} from "framer-motion";
import styled from "styled-components";
// components
import {LinkDropDown} from "@components/Auth/authStyle";

const DropDownWrapper = styled(motion.ul)`
  position: fixed;
  top: 6.4rem;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;

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

  &.active {
    color: ${(props) => props.theme.primaryBlueColor};
  }
`;

const Overlay = styled.div`
  position: fixed;

  width: 100vw;
  height: 100vh;
`;

const DropDownMenu = () => {
  const [isView, setIsView] = useState(false);
  const variants = {
    closed: {opacity: 0, y: "-200%"},
    open: {opacity: 1, y: 0},
  };

  return (
    <>
      <MenuIcon
        className={isView ? "ri-menu-2-line active" : "ri-menu-2-line"}
        whileHover={{scale: 1.1}}
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
          <LinkDropDown to="/document">
            <i className="ri-edit-2-line"></i> 문서 작성
          </LinkDropDown>
        </li>
        <li>
          <LinkDropDown to="/storage">
            <i className="ri-suitcase-line"></i>문서 보관함
          </LinkDropDown>
        </li>
        <li>
          <LinkDropDown to="/profile">
            <i className="ri-settings-2-line"></i>회원정보 수정
          </LinkDropDown>
        </li>
      </DropDownWrapper>
    </>
  );
};

export default DropDownMenu;
