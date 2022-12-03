// modules
import {useEffect, useState} from "react";
import {PathMatch, useMatch} from "react-router-dom";
// components
import EmailedTable from "@components/Storage/Tables/EmailedTable/Table";
import chunkArray from "@components/Util/chunkArray";
import Preview from "@components/Storage/Modal/DocuView";
import Modal from "@components/Storage/Modal/Modal";
import Page from "@components/Storage/Page";
// controllers
import {getDocumentIdsArr} from "@controllers/signatures.controller";
import {getEmailedDocumentsByPageNum} from "@controllers/documents.controller";
// types
import {IDocumentData} from "@constants/types/document";
// redux-toolkit
import {useAppSelector} from "@app/hook";

const Emailed = () => {
  const docuMatch: PathMatch<string> | null = useMatch("/storage/emailed/:id");
  const previewMatch: PathMatch<string> | null = useMatch(
    "/storage/emailed/docuview/:id"
  );

  const [emaileddocuments, setEmaileddocuments] = useState<
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

        await getEmailedDocumentsByPageNum(chunks, pageNum).then(
          (documentsArr) => {
            setEmaileddocuments(documentsArr);
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
    <>
      {/* EmailedTable */}
      {emaileddocuments ? <EmailedTable documents={emaileddocuments} /> : null}

      {/* modal */}
      {docuMatch ? <Modal prevURL="emailed" /> : null}
      {previewMatch ? <Preview /> : null}

      {/* pages */}
      <Page pageNum={pageNum} lastPage={lastPage} setPageNum={setPageNum} />
    </>
  );
};

export default Emailed;
