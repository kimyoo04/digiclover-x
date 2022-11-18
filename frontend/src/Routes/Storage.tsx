// modules
import {useState, useEffect} from "react";
import {PathMatch, useMatch} from "react-router-dom";
import styled from "styled-components";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// services
import {IDocumentData} from "@constants/types/document";
// components
import Modal from "@components/Storage/Modal/Modal";
import StorageTable from "@components/Storage/Table/Table";
import {Wrapper} from "@components/layout";
// firebase
import {
  collection,
  documentId,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";
import {Text} from "@components/Style/text";
import Preview from "@components/Storage/Modal/DocuView";
import chunkArray from "@components/Util/chunkArray";

const StorageWrapper = styled(Wrapper)`
  justify-content: flex-start;
  padding-right: 3rem;
  padding-left: 3rem;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;

  & span {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.bgWhiteColor};
  }
  & i {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.bgWhiteColor};
  }

  & i.disabled {
    color: ${(props) => props.theme.grayscale3Color};
  }
`;

const Storage = () => {
  const docuMatch: PathMatch<string> | null = useMatch("/storage/:id");
  const previewMatch: PathMatch<string> | null = useMatch(
    "/storage/docuview/:id"
  );

  const goPrev = () => {
    setPageNum(pageNum - 1);
  };
  const goNext = () => {
    setPageNum(pageNum + 1);
  };

  // firebase
  const [documentIds, setDocumentIds] = useState<string[]>([]);
  const [documents, setDocuments] = useState<IDocumentData[] | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const getDocumentIds = async () => {
      let documentsIdArr: string[] = [];

      // 유저 아이디와 일치하는 서명 찾기
      const signautesQuery = query(
        collection(dbService, "signatures"),
        where("UserId", "==", user.id),
        orderBy("createdAt", "desc")
      );

      // 서명에서 DocumentId만 추출 후 배열 생성
      const signautesQuerySnapshot = await getDocs(signautesQuery);
      signautesQuerySnapshot.forEach((doc) => {
        documentsIdArr.push(doc.data().DocumentId);
      });

      let chunks = chunkArray(documentsIdArr, 10);
      setLastPage(Math.ceil(chunks.length));
    };

    const getDocuments = async () => {
      const documentsQuery = query(
        collection(dbService, "documents"),
        where(documentId(), "in", documentIds)
      );

      // DocumentId로 이루어진 배열로 쿼리 생성
      onSnapshot(documentsQuery, (querySnapshot) => {
        const documentsArr: any = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(documentsArr);
      });
    };

    const getData = async () => {
      await getDocumentIds();
      await getDocuments();
    };

    getData();
  }, [pageNum]);

  return (
    <StorageWrapper>
      {/* table */}
      {documents ? (
        <StorageTable documents={documents} />
      ) : (
        <Text>전자 문서를 생성해 주세요!</Text>
      )}

      {/* modal */}
      {docuMatch ? <Modal /> : null}
      {previewMatch ? <Preview /> : null}

      {/* pages */}
      <PageWrapper>
        {pageNum === 1 ? (
          <>
            <i className="ri-arrow-left-s-fill disabled"></i>
          </>
        ) : (
          <>
            <i className="ri-arrow-left-s-fill" onClick={goPrev}></i>
          </>
        )}

        <span>{pageNum}</span>

        {pageNum === lastPage ? (
          <>
            <i className="ri-arrow-right-s-fill disabled"></i>
          </>
        ) : (
          <>
            <i className="ri-arrow-right-s-fill" onClick={goNext}></i>
          </>
        )}
      </PageWrapper>
    </StorageWrapper>
  );
};

export default Storage;
