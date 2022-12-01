// modules
import styled from "styled-components";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// components
import DocumentsStep from "@components/Document/steps";
import DocumentHeader from "@components/Document/DocumentHeader";
import Alert from "@components/Util/Alert";

const DocuWrapper = styled.div.attrs((props: {index: number}) => ({
  index: props.index,
}))`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  min-height: 94vh;
  background-color: ${(props) => props.theme.bgColor};
  overflow: ${(props) => (props.index === 4 ? "none" : "auto")};
`;

const Document = () => {
  const documentStep = useAppSelector((state) => state.document.step);
  const isAlert = useAppSelector((state) => state.alert.isAlert);

  return (
    <>
      <DocumentHeader />
      {isAlert ? <Alert /> : null}

      {[1, 2, 3, 4, 5, 6].map((i) =>
        i === documentStep ? (
          <DocuWrapper key={i}>
            <DocumentsStep index={i} key={i} />
          </DocuWrapper>
        ) : null
      )}
    </>
  );
};

export default Document;
