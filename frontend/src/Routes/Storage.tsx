import styled from "styled-components";
import DocumentItem from "Components/Storage/DocumentItem";
import DocumentModal from "Components/Storage/DocumentModal";
import {Wrapper} from "Components/style/layout";
import {useQuery} from "@tanstack/react-query";
import DocumentDataService, {IDocumentData} from "services/document";

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
  const {data: documentsData, isLoading: isDocumentsLoading} = useQuery<
    IDocumentData[]
  >(["documents", "users"], DocumentDataService.getAllDocuments);
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
      <DocumentModal></DocumentModal>
    </StorageWrapper>
  );
};

export default Storage;
