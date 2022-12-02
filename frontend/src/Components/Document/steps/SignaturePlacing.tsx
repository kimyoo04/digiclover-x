// modules
import styled from "styled-components";
// redux-toolkit
import {documentActions} from "@features/document/documentSlice";
import {useAppDispatch} from "@app/hook";
// components
import Tiptap from "@components/Document/tiptap";
import Button from "@components/Style/buttons";
import {useNavigate} from "react-router-dom";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
`;

const SignaturePlacing = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const prevClick = () => navigate("/");

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
          Go Home
        </Button>

        <Button
          onClick={nextClick}
          whileHover={{scale: 1.1}}
          transition={{duration: 0.05}}
        >
          Next
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default SignaturePlacing;
