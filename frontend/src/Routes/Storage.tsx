import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import DocumentItem from "Components/Storage/DocumentItem";
import DocumentModal from "Components/Storage/DocumentModal";
import {useEffect} from "react";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgWhiteColor};
  padding-top: 100px;
  min-height: 94vh;
`;

const Storage = () => {
  const navigate = useNavigate();
  const onDocuClicked = (docuId: number) => {
    navigate(`/storage/${docuId}`);
  };

  // 추후 로그인 분기 처리
  useEffect(() => console.log("작동"), []);

  return (
    <Wrapper>
      <DocumentItem onDocuClicked={onDocuClicked}></DocumentItem>
      <DocumentModal></DocumentModal>
    </Wrapper>
  );
};

export default Storage;
