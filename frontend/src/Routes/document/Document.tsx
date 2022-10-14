// modules
import {motion} from "framer-motion";
import styled from "styled-components";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// constants
import {pageVariants, smallPageVariants} from "@constants/variants";
// components
import Contractor from "@components/Document/steps/Contractor";
import Docukind from "@components/Document/steps/Docukind";
import Writing from "@components/Document/steps/Writing";
import Signning from "@components/Document/steps/Signning";
import SignaturePlacing from "@components/Document/steps/SignaturePlacing";
import Email from "@components/Document/steps/Email";
import DocumentHeader from "@components/Document/DocumentHeader";
import Alert from "@components/Util/Alert";

const DocuWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  overflow: auto;
`;

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

const Document = () => {
  const documentStep = useAppSelector((state) => state.document.step);
  const isAlert = useAppSelector((state) => state.alert.isAlert);

  return (
    <>
      <DocumentHeader />
      {isAlert ? <Alert /> : null}
      <DocuWrapper>
        {[1, 2, 3, 4, 5, 6].map((i) =>
          i === documentStep ? <DocumentsStep index={i} key={i} /> : null
        )}
      </DocuWrapper>
    </>
  );
};

export default Document;
