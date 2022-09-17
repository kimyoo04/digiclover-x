import {isDarkState} from "atom/themeAtom";
import {motion} from "framer-motion";
import {useRecoilState} from "recoil";

import styled from "styled-components";
import Button from "./style/buttons";

const ToggleButton = styled(Button)`
  position: absolute;
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
  const [isDark, setIsDark] = useRecoilState(isDarkState);

  return (
    <ToggleButton
      onClick={() => setIsDark((prev) => !prev)}
      color={isDark ? "#233e4d" : "#fff"}
    >
      {isDark ? (
        <LightIcon
          className="ri-sun-fill"
          exit={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.01}}
        ></LightIcon>
      ) : (
        <DarkIcon
          className="ri-moon-fill"
          exit={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.01}}
        ></DarkIcon>
      )}
    </ToggleButton>
  );
};

export default ToggleIsDark;
