// modules
import {motion} from "framer-motion";
import styled from "styled-components";
// constants
import {pageVariants, smallPageVariants} from "@constants/styles/variants";
// components
import Contractor from "@components/Document/steps/Contractor";
import Docukind from "@components/Document/steps/Docukind";
import Writing from "@components/Document/steps/Writing";
import Signning from "@components/Document/steps/Signning";
import SignaturePlacing from "@components/Document/steps/SignaturePlacing";
import Email from "@components/Document/steps/Email";

const StepWrapper = styled(motion.div)`
  position: absolute;
`;

const DocumentsStep = ({index}: {index: number}) => {
  switch (index) {
    case 1:
      window.scrollTo(0, 0);
      return (
        <StepWrapper
          variants={smallPageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <Contractor />
        </StepWrapper>
      );

    case 2:
      window.scrollTo(0, 0);
      return (
        <StepWrapper
          variants={smallPageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <Docukind />
        </StepWrapper>
      );

    case 3:
      window.scrollTo(0, 0);
      return (
        <StepWrapper
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <Writing />
        </StepWrapper>
      );

    case 4:
      window.scrollTo(0, 0);
      return (
        <StepWrapper
          variants={smallPageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <Signning />
        </StepWrapper>
      );

    case 5:
      window.scrollTo(0, 0);
      return (
        <StepWrapper
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <SignaturePlacing />
        </StepWrapper>
      );

    case 6:
      window.scrollTo(0, 0);
      return (
        <StepWrapper
          variants={smallPageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <Email />
        </StepWrapper>
      );
    default:
      return <div></div>;
  }
};

export default DocumentsStep;
