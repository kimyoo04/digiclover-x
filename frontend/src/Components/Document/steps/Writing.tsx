import {useAppDispatch} from "app/hook";
import {documentActions} from "features/document/documentSlice";

import styled from "styled-components";
import Button from "Components/Style/buttons";
import Tiptap from "Components/Document/tiptap";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin-top: 2rem;
`;

const Writing = () => {
  const dispatch = useAppDispatch();

  function prevClick() {
    dispatch(documentActions.beforeWriting());
  }

  return (
    <>
      <Tiptap isEditable={true} />
      <ButtonWrapper>
        <Button
          onClick={prevClick}
          whileHover={{scale: 1.1}}
          transition={{duration: 0.05}}
        >
          Prev
        </Button>
        <Button
          form="docuTitleForm"
          whileHover={{scale: 1.1}}
          transition={{duration: 0.05}}
        >
          Next
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default Writing;
