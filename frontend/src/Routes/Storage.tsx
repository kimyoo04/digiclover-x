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
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";
import {Text} from "@components/Style/text";
import Preview from "@components/Storage/Modal/DocuView";
import chunkArray from "@components/Util/chunkArray";
import Page from "@components/Storage/Page";

const StorageWrapper = styled(Wrapper)`
  justify-content: flex-start;
  padding-right: 3rem;
  padding-left: 3rem;
`;

const Storage = () => {
  const docuMatch: PathMatch<string> | null = useMatch("/storage/:id");
  const previewMatch: PathMatch<string> | null = useMatch(
    "/storage/docuview/:id"
  );

  // firebase
  const [documents, setDocuments] = useState<IDocumentData[] | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const getDocuments = async () => {
      let documentsIdArr: string[] = [];
      let documentsArr: any = [];

      // 1. 유저 아이디와 일치하는 서명 찾기
      const signautesQuery = query(
        collection(dbService, "signatures"),
        where("UserId", "==", user.id),
        orderBy("createdAt", "desc")
      );

      // 2. 서명에서 DocumentId만 추출 후 배열 생성
      const signautesQuerySnapshot = await getDocs(signautesQuery);
      signautesQuerySnapshot.forEach((doc) => {
        documentsIdArr.push(doc.data().DocumentId);
      });

      // 3. 10개씩 배열 분할
      let chunks = chunkArray(documentsIdArr, 10);
      setLastPage(Math.ceil(chunks.length));

      // 4. 서명했던 or 서명할 문서가 있다면
      if (documentsIdArr.length !== 0) {
        // 5. chunks[pageNum-1]로 쿼리 생성
        const documentsQuery = query(
          collection(dbService, "documents"),
          where(documentId(), "in", chunks[pageNum - 1])
        );
        console.log(chunks);

        // 6. 페이지 번호마다 10개의 문서 조회 및 documents에 저장
        const documentsQuerySnapshot = await getDocs(documentsQuery);
        documentsQuerySnapshot.forEach((doc) => {
          documentsArr.push({id: doc.id, ...doc.data()});
        });
        setDocuments(documentsArr);
      }
    };

    // 함수 호출
    getDocuments().catch((error) =>
      console.error("getDocuments - failure\n", error)
    );
  }, [user.id, pageNum]);

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
      <Page pageNum={pageNum} lastPage={lastPage} setPageNum={setPageNum} />
    </StorageWrapper>
  );
};

export default Storage;
