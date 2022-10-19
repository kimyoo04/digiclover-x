// modules
import {useState, useEffect} from "react";
import {PathMatch, useMatch} from "react-router-dom";
import styled from "styled-components";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// services
import {IDocumentData} from "@constants/types/document";
// components
import DocumentModal from "@components/Storage/Modal/DocumentModal";
import StorageTable from "@components/Storage/Table/Table";
import {Wrapper} from "@components/layout";
// firebase
import {
  collection,
  documentId,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";
import {Text} from "@components/Style/text";

const StorageWrapper = styled(Wrapper)`
  justify-content: flex-start;
  padding-right: 3rem;
  padding-left: 3rem;
`;

const Storage = () => {
  const docuMatch: PathMatch<string> | null = useMatch("/storage/:id");
  // const [pages, setPages] = useState(1);
  // const [isLastPage, setIsLastPage] = useState(false);

  // firebase
  const [documents, setDocuments] = useState<IDocumentData[] | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      // 1----------------------------------------------------
      const getDocumentsArr = async () => {
        let documentsIdArr: string[] = [];

        // 유저 아이디와 일치하는 서명 찾기
        const signautesQuery = query(
          collection(dbService, "signatures"),
          where("UserId", "==", user.id)
        );

        // 서명에서 DocumentId만 추출 후 배열 생성
        const signautesQuerySnapshot = await getDocs(signautesQuery);
        signautesQuerySnapshot.forEach((doc) => {
          documentsIdArr.push(doc.data().DocumentId);
        });

        // 서명했던 or 서명할 문서가 있다면
        if (documentsIdArr.length !== 0) {
          // DocumentId로 이루어진 배열로 쿼리 생성
          const documentsQuery = query(
            collection(dbService, "documents"),
            where(documentId(), "in", documentsIdArr)
          );

          // DocumentId로 이루어진 배열로 쿼리 생성
          onSnapshot(documentsQuery, (snapshot) => {
            const documentsArr: any = snapshot.docs.map((document) => ({
              id: document.id,
              ...document.data(),
            }));
            setDocuments(documentsArr);
          });
        }
      };

      // 함수 호출
      getDocumentsArr().catch((error) =>
        console.log("getDocumentsArr - failure\n", error)
      );
    }
  }, [user]);

  return (
    <StorageWrapper>
      {/* table */}
      {documents ? (
        <StorageTable documents={documents} />
      ) : (
        <Text>전자 문서를 생성해 주세요!</Text>
      )}
      {/* modal */}
      {docuMatch ? <DocumentModal /> : null}
    </StorageWrapper>
  );
};

export default Storage;
