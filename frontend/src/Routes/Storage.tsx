// modules
import {useState, useEffect} from "react";
import {PathMatch, useMatch} from "react-router-dom";
import styled from "styled-components";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// types
import {IDocumentData} from "@constants/types/document";
import {IOngoingData} from "@constants/types/ongoing";
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
import {getAllOngoingsByUser} from "@controllers/ongoings.controller";
import {getDocumentIdsArr} from "@controllers/signatures.controller";
import {getEmailedDocumentsByPageNum} from "@controllers/documents.controller";

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
  const [ongoings, setOngoings] = useState<IOngoingData[] | null>(null);
  const [documents, setDocuments] = useState<IDocumentData[] | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const getOngoings = async () => {
      let ongoingsArr: IOngoingData[] = [];

      if (user.id) {
        ongoingsArr = await getAllOngoingsByUser(user.id);
      } else {
        console.log("getOngoings - user's info doesn't exist.");
      }

      if (ongoingsArr.length !== 0) {
        // console.log(`ongoingsArr = ${ongoingsArr}`);
        setOngoings(ongoingsArr);
      } else {
        console.log("getOngoings - user's ongoings don't exist");
      }
    };

    getOngoings();
  }, [user.id]);

  useEffect(() => {
    const getDocuments = async () => {
      let documentIdsArr: string[] = [];

      if (user.id) {
        documentIdsArr = await getDocumentIdsArr(user.id);
      } else {
        console.log("getDocumentIdsArr - user's info doesn't exist.");
      }

      if (documentIdsArr.length !== 0) {
        let chunks = chunkArray(documentIdsArr, 10); // 10개씩 배열 분할
        setLastPage(Math.ceil(chunks.length));

        await getEmailedDocumentsByPageNum(chunks, pageNum).then(
          (documentsArr) => {
            // console.log(`documentsArr = ${documentsArr}`);
            setDocuments(documentsArr);
          }
        );
      } else {
        console.log(
          "getEmailedDocumentsByPageNum - user's documents don't exist"
        );
      }
    };

    getDocuments();
  }, [user.id, pageNum]);

  return (
    <StorageWrapper>
      {/* OnGoingTable */}
      {ongoings && pageNum === 1 ? <OnGoingTable documents={ongoings} /> : null}

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
