// modules
import {Link} from "react-router-dom";
import styled from "styled-components";
// redux-toolkit
import {useAppDispatch} from "@app/hook";
import {documentActions} from "@features/document/documentSlice";
// components
import Button from "@components/Style/buttons";
import {Wrapper} from "@components/layout";

const StartBtn = styled(Button)`
  width: 200px;
  padding: 10px;
`;

const Text = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
`;

const DocumentStart = () => {
  const dispatch = useAppDispatch();
  return (
    <Wrapper>
      <Text>문서작성을 시작하시겠습니까?</Text>
      <Link to={{pathname: `/document/write`}}>
        <StartBtn
          whileHover={{scale: 1.1}}
          transition={{duration: 0.05}}
          onClick={() => dispatch(documentActions.initialDocumentData())}
        >
          문서 작성 시작
        </StartBtn>
      </Link>
    </Wrapper>
  );
};

export default DocumentStart;
