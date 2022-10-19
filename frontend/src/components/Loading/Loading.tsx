//modules
import styled from "styled-components";
import {motion} from "framer-motion";
// components
import {Wrapper} from "@components/layout";
// img
import logoShort from "@public/assets/img/logo-short.png";
// styles
import {spin} from "@constants/styles/variants";

const Spinner = styled(motion.img)`
  width: 3.4rem;
  height: 3.4rem;
`;

const Loading = () => {
  return (
    <>
      <Wrapper>
        <Spinner
          variants={spin}
          initial="initial"
          animate="in"
          exit="out"
          src={logoShort}
        ></Spinner>
      </Wrapper>
    </>
  );
};

export default Loading;
