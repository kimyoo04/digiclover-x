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

const DocuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 10rem;
  background-color: ${(props) => props.theme.bgColor};
`;

const FormWrapper = styled(motion.div)`
  position: absolute;
`;

const DocumentsStep = ({index}: {index: number}) => {
  const isBack = useAppSelector((state) => state.document.isBack);

  switch (index) {
    case 1:
      return (
        <FormWrapper
          variants={slide(isBack)}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          <Contractor />
        </FormWrapper>
      );

    case 2:
      return (
        <FormWrapper
          variants={slide(isBack)}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          <Docukind />
        </FormWrapper>
      );

    case 3:
      return (
        <FormWrapper
          variants={slide(isBack)}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          <Writing />
        </FormWrapper>
      );

    case 4:
      return (
        <FormWrapper
          variants={slide(isBack)}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          <Signning />
        </FormWrapper>
      );

    case 5:
      return (
        <FormWrapper
          variants={slide(isBack)}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          <SignaturePlacing />
        </FormWrapper>
      );

    case 6:
      return (
        <FormWrapper
          variants={slide(isBack)}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          <Email />
        </FormWrapper>
      );
    default:
      return <div></div>;
  }
};

const Document = () => {
  const documentStep = useAppSelector((state) => state.document.step);
  return (
    <DocuWrapper>
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6].map((i) =>
          i === documentStep ? <DocumentsStep index={i} key={i} /> : null
        )}
      </AnimatePresence>
    </DocuWrapper>
  );
};

export default Document;
