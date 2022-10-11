import {useAppSelector} from "app/hook";
import {AnimatePresence, motion} from "framer-motion";

import styled from "styled-components";
import Contractor from "../../Components/Document/steps/Contractor";
import Docukind from "Components/Document/steps/Docukind";
import Writing from "Components/Document/steps/Writing";
import Signning from "Components/Document/steps/Signning";
import SignaturePlacing from "Components/Document/steps/SignaturePlacing";
import Email from "Components/Document/steps/Email";
import {slide} from "variants";
import DocumentHeader from "Components/Document/DocumentHeader";

const DocuWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  overflow: auto;
`;

const Animation = styled(AnimatePresence)`
  position: relative;
`;

const StepWrapper = styled(motion.div)`
  position: absolute;
`;

const DocumentsStep = ({index}: {index: number}) => {
  const isBack = useAppSelector((state) => state.document.isBack);

  switch (index) {
    case 1:
      return (
        <StepWrapper
          variants={slide(isBack)}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          <Contractor />
        </StepWrapper>
      );

    case 2:
      return (
        <StepWrapper
          variants={slide(isBack)}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          <Docukind />
        </StepWrapper>
      );

    case 3:
      return (
        <StepWrapper
          variants={slide(isBack)}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          <Writing />
        </StepWrapper>
      );

    case 4:
      return (
        <StepWrapper
          variants={slide(isBack)}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          <Signning />
        </StepWrapper>
      );

    case 5:
      return (
        <StepWrapper
          variants={slide(isBack)}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          <SignaturePlacing />
        </StepWrapper>
      );

    case 6:
      return (
        <StepWrapper
          variants={slide(isBack)}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          <Email />
        </StepWrapper>
      );
    default:
      return <div></div>;
  }
};

const Document = () => {
  const documentStep = useAppSelector((state) => state.document.step);
  return (
    <>
      <DocumentHeader />

      <DocuWrapper
        style={
          documentStep !== 3 && documentStep !== 5
            ? {alignItems: "center"}
            : {alignItems: "flex-start"}
        }
      >
        <Animation>
          {[1, 2, 3, 4, 5, 6].map((i) =>
            i === documentStep ? <DocumentsStep index={i} key={i} /> : null
          )}
        </Animation>
      </DocuWrapper>
    </>
  );
};

export default Document;
