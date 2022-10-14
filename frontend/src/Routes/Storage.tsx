// modules
import {useState, useEffect} from "react";
import {PathMatch, useMatch} from "react-router-dom";
import styled from "styled-components";
import {useQuery} from "react-query";
// services
import DocumentDataService, {IDocumentData} from "@services/document";
// components
import DocumentItem from "@components/Storage/DocumentItem";
import DocumentModal from "@components/Storage/DocumentModal";
import {Wrapper} from "@components/layout";
import Button from "@components/Style/buttons";

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
const PagesButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.theme.bgWhiteColor};
  }
`;

const PagesButton = styled(Button)`
  background-color: transparent;

  & i {
    font-size: 24px;
    color: ${(props) => props.theme.bgWhiteColor};
  }
`;

const Storage = () => {
  const [pages, setPages] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const docuMatch: PathMatch<string> | null = useMatch("/storage/:id");

  // 마지막 페이지 넘김 처리 함수
  const onSuccess = (data: IDocumentData[]) => {
    setIsLastPage(false);
    if (data.length === 0) {
      console.log("마지막 페이지입니다.");
      setIsLastPage(true);
    }
  };

  const {
    data: documentsData,
    isLoading: isDocumentsDataLoading,
    refetch,
  } = useQuery<IDocumentData[]>(
    ["documentsData"],
    () => DocumentDataService.getAllDocuments(4, pages),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess,
    }
  );

  useEffect(() => {
    refetch();
  }, [pages]);

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
        {isDocumentsDataLoading ? null : documentsData ? (
          <DocumentItem documentsData={documentsData}></DocumentItem>
        ) : (
          <span>마지막 페이지입니다.</span>
        )}
        <PagesButtonWrapper>
          <PagesButton
            onClick={() => {
              setPages((page) => page - 1);
            }}
            disabled={pages === 1}
          >
            <i className="ri-arrow-left-s-line"></i>
          </PagesButton>
          <span>{pages}</span>
          <PagesButton
            onClick={() => {
              setPages((page) => page + 1);
            }}
            disabled={!!isLastPage}
          >
            <i className="ri-arrow-right-s-line"></i>
          </PagesButton>
        </PagesButtonWrapper>
      </DocumentWrapper>

      {docuMatch ? <DocumentModal></DocumentModal> : null}
    </StorageWrapper>
  );
};

export default Storage;
