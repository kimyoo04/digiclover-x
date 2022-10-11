import Tiptap from "Components/Document/tiptap";

import styled from "styled-components";
import Button from "Components/Style/buttons";
import {documentActions} from "features/document/documentSlice";
import {useAppDispatch} from "app/hook";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin-bottom: 20px;
`;
const SignaturePlacing = () => {
  const dispatch = useAppDispatch();

  const prevClick = () => dispatch(documentActions.beforeSignaturePlacing());

  const nextClick = async () =>
    dispatch(documentActions.afterSignaturePlacing());

  return (
    <div>
      <Tiptap isEditable={false} />
      <ButtonWrapper>
        <Button
          onClick={prevClick}
          whileHover={{scale: 1.1}}
          transition={{duration: 0.05}}
        >
          Prev
        </Button>
        <Button
          onClick={nextClick}
          whileHover={{scale: 1.1}}
          transition={{duration: 0.05}}
        >
          Finish
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default SignaturePlacing;
