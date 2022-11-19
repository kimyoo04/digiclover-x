// modules
import styled from "styled-components";
// redux-toolkit
import {useAppDispatch} from "@app/hook";
import {documentActions} from "@features/document/documentSlice";
// components
import Button from "@components/Style/buttons";
import Tiptap from "@components/Document/tiptap";

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
      {/* 텍스트 에디터 */}
      <Tiptap isEditable={true} />

      {/* 전 후 버튼 */}
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
