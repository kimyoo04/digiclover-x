import styled from "styled-components";
import DocumentItem from "Components/Storage/DocumentItem";
import DocumentModal from "Components/Storage/DocumentModal";
import {Wrapper} from "Components/style/layout";
import {useQuery} from "@tanstack/react-query";
import DocumentDataService, {IDocumentData} from "services/document";
import {PathMatch, useMatch} from "react-router-dom";

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
  const {data: documentsData, isLoading: isDocumentsLoading} = useQuery<
    IDocumentData[]
  >(["documents"], DocumentDataService.getAllDocuments);
  // console.log(documentsData);

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
        {isDocumentsLoading ? null : (
          <DocumentItem documentsData={documentsData}></DocumentItem>
        )}
      </DocumentWrapper>
      {docuMatch ? <DocumentModal></DocumentModal> : null}
    </StorageWrapper>
  );
};

export default Storage;
