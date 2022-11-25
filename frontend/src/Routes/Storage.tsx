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
import StorageTable from "@components/Storage/StorageTable/Table";
import OnGoingTable from "@components/Storage/OnGoingTable/Table";
import {Wrapper} from "@components/layout";
import {Text} from "@components/Style/text";
import Preview from "@components/Storage/Modal/DocuView";
import chunkArray from "@components/Util/chunkArray";
import Page from "@components/Storage/Page";
// controllers
import {getFiveOngoingsDocu} from "@controllers/ongoings.controller";
import {getDocumentIdsArr} from "@controllers/signatures.controller";
import {getDocumentsByPageNum} from "@controllers/documents.controller";

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
  const [onGoings, setOnGoings] = useState<IDocumentData[] | null>(null);
  const [documents, setDocuments] = useState<IDocumentData[] | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user.id) {
      getFiveOngoingsDocu(user.id)
        .then((onGoingsArr) => setOnGoings(onGoingsArr))
        .then(() => console.log("getFiveOngoingsDocu getDocs success"))
        .catch((error) => console.log("getFiveOngoingsDocu error ==> ", error));
    } else {
      console.log("getFiveOngoingsDocu - 유저 정보가 없습니다.");
    }
  }, [user.id]);

  useEffect(() => {
    const getDocuments = async () => {
      if (user.id) {
        const documentIdsArr = await getDocumentIdsArr(user.id);

        if (documentIdsArr.length !== 0) {
          let chunks = chunkArray(documentIdsArr, 10); // 10개씩 배열 분할
          setLastPage(Math.ceil(chunks.length));

          await getDocumentsByPageNum(chunks, pageNum)
            .then((documentsArr) => setDocuments(documentsArr))
            .then(() => console.log("getDocumentsByPageNum success"))
            .catch((error) =>
              console.log("getDocumentsByPageNum error ==> ", error)
            );
        } else {
          console.log("getDocumentsByPageNum - 유저와 관련된 문서가 없습니다.");
        }
      } else {
        console.log("getDocumentIdsArr - 유저 정보가 없습니다.");
      }
    };

    getDocuments().catch((error) =>
      console.log("getDocuments error ==> ", error)
    );
  }, [user.id, pageNum]);

  return (
    <StorageWrapper>
      {/* OnGoingTable */}
      {onGoings && pageNum === 1 ? <OnGoingTable documents={onGoings} /> : null}

      {/* StorageTable */}
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
