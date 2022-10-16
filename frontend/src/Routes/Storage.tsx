// modules
import {useState, useEffect} from "react";
import {PathMatch, useMatch} from "react-router-dom";
import styled from "styled-components";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// components
import DocumentItem from "@components/Storage/DocumentItem";
import DocumentModal from "@components/Storage/Modal/DocumentModal";
import {Wrapper} from "@components/layout";
import Page from "@components/Storage/Page";
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
import {IDocumentData} from "@services/document";

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
      };

      // 함수 호출
      getDocumentsArr().catch((error) => console.log(error));
    }
  }, []);

  console.log(documents);
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
        {documents ? (
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
