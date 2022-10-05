import {useAppDispatch, useAppSelector} from "app/hook";
import {toggleTheme} from "features/theme/themeSlice";

import {motion} from "framer-motion";

import styled from "styled-components";
import Button from "./style/buttons";

const ToggleButton = styled(Button)`
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color};
  border-radius: 20px;
`;

const DarkIcon = styled(motion.i)`
  font-size: 20px;
`;

const LightIcon = styled(motion.i)`
  font-size: 20px;
  color: white;
`;

const ToggleIsDark = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const dispatch = useAppDispatch();

  return (
    <ToggleButton
      onClick={() => dispatch(toggleTheme())}
      color={!isDark ? "#233e4d" : "#fff"}
    >
      {!isDark ? (
        <LightIcon
          className="ri-moon-fill"
          exit={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.01}}
        ></LightIcon>
      ) : (
        <DarkIcon
          className="ri-sun-fill"
          exit={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.01}}
        ></DarkIcon>
      )}
    </ToggleButton>
  );
};

export default ToggleIsDark;
