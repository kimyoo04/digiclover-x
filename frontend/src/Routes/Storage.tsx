// modules
import {useState, useEffect} from "react";
import {PathMatch, useMatch} from "react-router-dom";
import styled from "styled-components";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// services
import DocumentDataService, {IDocumentData} from "@services/document";
// components
import DocumentItem from "@components/Storage/DocumentItem";
import DocumentModal from "@components/Storage/DocumentModal";
import {Wrapper} from "@components/layout";
// firebase
import Page from "@components/Storage/Page";
import {getQueryData} from "src/firebaseCRUD";

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
  const docuMatch: PathMatch<string> | null = useMatch("/storage/:id");
  // const [pages, setPages] = useState(1);
  // const [isLastPage, setIsLastPage] = useState(false);

  // firebase
  const [documents, setDocuments] = useState(null);
  const [signatures, setSignatures] = useState(null);
  const user = useAppSelector((state) => state.auth.user);

  // 실시간 데이터
  useEffect(() => {
    if (user) {
      getQueryData(user.id, setDocuments, "documents");
      getQueryData(user.id, setSignatures, "signatures");
    }
  }, []);

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
        {documents && signatures ? (
          <DocumentItem documentsData={documents}></DocumentItem>
        ) : (
          <span>마지막 페이지입니다.</span>
        )}
        <Page />
      </DocumentWrapper>

      {docuMatch ? <DocumentModal></DocumentModal> : null}
    </StorageWrapper>
  );
};

export default Storage;
