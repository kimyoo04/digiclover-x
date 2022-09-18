import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useRecoilState} from "recoil";
import {isLoggedInState} from "atom/userAtom";

import styled from "styled-components";
import DocumentItem from "Components/Storage/DocumentItem";
import DocumentModal from "Components/Storage/DocumentModal";
import {Wrapper} from "Components/style/layout";

const Storage = () => {
  const navigate = useNavigate();
  function onDocuClicked(docuId: number) {
    // 선택한 문서 아이디로 이동 (DocumentModal 컴포넌트)
    navigate(`/storage/${docuId}`);
  }
  function goHome() {
    navigate(`/`);
  }

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  // 로그인 분기 처리
  useEffect(() => {
    if (!isLoggedIn) {
      goHome();
    }
  }, []);

  return (
    <Wrapper>
      <DocumentItem onDocuClicked={onDocuClicked}></DocumentItem>
      <DocumentModal></DocumentModal>
    </Wrapper>
  );
};

export default Storage;
