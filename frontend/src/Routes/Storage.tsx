import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useRecoilState} from "recoil";
import {isLoggedInState} from "atom/userAtom";

import styled from "styled-components";
import DocumentItem from "Components/Storage/DocumentItem";
import DocumentModal from "Components/Storage/DocumentModal";
import {Wrapper} from "Components/style/layout";

const StorageWrapper = styled(Wrapper)`
  justify-content: flex-start;
`;

const DocumentWrapper = styled.div`
  width: 100vw;
  padding: 20px;
`;

const DocumentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px 20px 20px;

  & div {
    width: 80px;
    display: flex;
    justify-content: center;
    margin: 0 10px;
  }

  /* 가운데 */
  & div:nth-child(2) {
  }

  & div span {
    color: ${(props) => props.theme.textColor};
  }
`;

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

  const documentsData = [
    {
      id: 5,

      // 문서 정보 (문서 양식, 문서 제목, 문서 내용)
      docukind: "자유형식",
      docuTitle: "2022년 김유 근로계약서",
      docuContent: "<p>문서 테스트입니다</p>",

      // 문서 파일 헤시값 A
      hashFile: "13asdasc2ce8dh977182gds871nbhd19shxoi1hx1sab181",

      // 계약자 갑, 을, 병, 정 정보
      UserId1: 3,
      UserId2: 0, // 참여하지만 서명이 안된 경우
      UserId3: 2,
      UserId4: null,

      createdAt: "2022-09-01",
    },
    {
      id: 1,

      // 문서 정보 (문서 양식, 문서 제목, 문서 내용)
      docukind: "자유형식",
      docuTitle: "2022년 김유 근로계약서",
      docuContent: "<p>문서 테스트입니다</p>",

      // 문서 파일 헤시값 A
      hashFile: "13asdasc2ce8dh977182gds871nbhd19shxoi1hx1sab181",

      // 계약자 갑, 을, 병, 정 정보
      UserId1: 3,
      UserId2: 0, // 참여하지만 서명이 안된 경우
      UserId3: null,
      UserId4: null,

      createdAt: "2022-09-01",
    },
    {
      id: 3,

      // 문서 정보 (문서 양식, 문서 제목, 문서 내용)
      docukind: "자유형식",
      docuTitle: "2022년 김유 근로계약서",
      docuContent: "<p>문서 테스트입니다</p>",

      // 문서 파일 헤시값 A
      hashFile: "13asdasc2ce8dh977182gds871nbhd19shxoi1hx1sab181",

      // 계약자 갑, 을, 병, 정 정보
      UserId1: 3,
      UserId2: 0, // 참여하지만 서명이 안된 경우
      UserId3: null,
      UserId4: null,

      createdAt: "2022-09-01",
    },
    {
      id: 665,

      // 문서 정보 (문서 양식, 문서 제목, 문서 내용)
      docukind: "자유형식",
      docuTitle: "2022년 김유 근로계약서",
      docuContent: "<p>문서 테스트입니다</p>",

      // 문서 파일 헤시값 A
      hashFile: "13asdasc2ce8dh977182gds871nbhd19shxoi1hx1sab181",

      // 계약자 갑, 을, 병, 정 정보
      UserId1: 3,
      UserId2: 0, // 참여하지만 서명이 안된 경우
      UserId3: null,
      UserId4: null,

      createdAt: "2022-09-01",
    },
    {
      id: 65,

      // 문서 정보 (문서 양식, 문서 제목, 문서 내용)
      docukind: "자유형식",
      docuTitle: "2022년 김유 근로계약서",
      docuContent: "<p>문서 테스트입니다</p>",

      // 문서 파일 헤시값 A
      hashFile: "13asdasc2ce8dh977182gds871nbhd19shxoi1hx1sab181",

      // 계약자 갑, 을, 병, 정 정보
      UserId1: 3,
      UserId2: 0, // 참여하지만 서명이 안된 경우
      UserId3: null,
      UserId4: null,

      createdAt: "2022-09-01",
    },
    {
      id: 25,

      // 문서 정보 (문서 양식, 문서 제목, 문서 내용)
      docukind: "자유형식",
      docuTitle: "2022년 김유 근로계약서",
      docuContent: "<p>문서 테스트입니다</p>",

      // 문서 파일 헤시값 A
      hashFile: "13asdasc2ce8dh977182gds871nbhd19shxoi1hx1sab181",

      // 계약자 갑, 을, 병, 정 정보
      UserId1: 3,
      UserId2: 0, // 참여하지만 서명이 안된 경우
      UserId3: null,
      UserId4: null,

      createdAt: "2022-09-01",
    },
  ];

  const signaturesData = [
    {
      id: 10,

      DocumentId: 5,
      UserId: 3,
      contractorPhone: "010-8131-5224",

      isSigned: 1,

      hashValue: "qwicmwl1289dj28091dj7y81h2hd1kshjkcbn1askasckljas",
      imgUrl: "12jildj12ijaw89adahscxlhckljq290cjaclkasjc2n",
    },
    {
      id: 11,

      DocumentId: 5,
      UserId: null,
      contractorPhone: "010-9999-9999",

      isSigned: 0,

      hashValue: null,
      imgUrl: null,
    },
  ];
  return (
    <StorageWrapper>
      <DocumentWrapper>
        <DocumentHeader>
          <div>
            <span>문서 정보</span>
          </div>

          <div>
            <span>서명 현황</span>
          </div>

          <div>
            <span>상세 기록</span>
          </div>
        </DocumentHeader>
        <DocumentItem
          onDocuClicked={onDocuClicked}
          documentsData={documentsData}
        ></DocumentItem>
      </DocumentWrapper>
      <DocumentModal></DocumentModal>
    </StorageWrapper>
  );
};

export default Storage;
