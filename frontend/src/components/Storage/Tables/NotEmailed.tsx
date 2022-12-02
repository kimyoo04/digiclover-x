// modules
import {useEffect, useState} from "react";
import {PathMatch, useMatch} from "react-router-dom";
// components
import NotEmailedTable from "@components/Storage/Tables/NotEmailedTable/Table";
import chunkArray from "@components/Util/chunkArray";
import Preview from "@components/Storage/Modal/DocuView";
import Modal from "@components/Storage/Modal/Modal";
import Page from "@components/Storage/Page";
// controllers
import {getDocumentIdsArr} from "@controllers/signatures.controller";
import {getNotEmailedDocumentsByPageNum} from "@controllers/documents.controller";
// types
import {IDocumentData} from "@constants/types/document";
// redux-toolkit
import {useAppSelector} from "@app/hook";

const NotEmailed = () => {
  const docuMatch: PathMatch<string> | null = useMatch(
    "/storage/notemailed/:id"
  );
  const previewMatch: PathMatch<string> | null = useMatch(
    "/storage/notemailed/docuview/:id"
  );

  const [notEmaileddocuments, setNotEmaileddocuments] = useState<
    IDocumentData[] | null
  >(null);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const getDocuments = async () => {
      let documentIdsArr: string[] = [];

      if (user.id) {
        documentIdsArr = await getDocumentIdsArr(user.id);
      } else {
        console.error("getDocumentIdsArr - user's info doesn't exist.");
      }

      if (documentIdsArr.length !== 0) {
        let chunks = chunkArray(documentIdsArr, 10); // 10개씩 배열 분할
        setLastPage(Math.ceil(chunks.length));

        await getNotEmailedDocumentsByPageNum(chunks, pageNum).then(
          (documentsArr) => {
            console.log(`documentsArr = ${documentsArr}`);
            setNotEmaileddocuments(documentsArr);
          }
        );
      } else {
        console.log(
          "getNotEmailedDocumentsByPageNum - user's documents don't exist"
        );
      }
    };

    getDocuments();
  }, [user.id, pageNum]);

  return (
    <>
      {/* EmailedTable */}
      {notEmaileddocuments ? (
        <NotEmailedTable documents={notEmaileddocuments} />
      ) : null}

      {/* modal */}
      {docuMatch ? <Modal /> : null}
      {previewMatch ? <Preview /> : null}

      {/* pages */}
      <Page pageNum={pageNum} lastPage={lastPage} setPageNum={setPageNum} />
    </>
  );
};

export default NotEmailed;
