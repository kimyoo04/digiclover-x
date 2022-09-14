import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import DocumentItem from "Components/DocumentItem";
import DocumentModal from "Components/DocumentModal";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgWhiteColor};
  padding-top: 100px;
  height: 200vh;
`;

const Storage = () => {
  const navigate = useNavigate();
  const onDocuClicked = (docuId: number) => {
    navigate(`/storage/${docuId}`);
  };

  return (
    <Wrapper>
      <DocumentItem onDocuClicked={onDocuClicked}></DocumentItem>
      <DocumentModal></DocumentModal>
    </Wrapper>
  );
};

export default Storage;
