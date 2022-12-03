// modules
import {useEffect, useState} from "react";
import {PathMatch, useMatch} from "react-router-dom";
// components
import DraftTable from "@components/Storage/Tables/DraftTable/Table";
import chunkArray from "@components/Util/chunkArray";
import Preview from "@components/Storage/Modal/DocuView";
import Modal from "@components/Storage/Modal/Modal";
import Page from "@components/Storage/Page";
// controllers
import {getAllDraftsByUser} from "@controllers/drafts.controller";
// types
import {IDraftData} from "@constants/types/draft";
// redux-toolkit
import {useAppSelector} from "@app/hook";

const Draft = () => {
  const docuMatch: PathMatch<string> | null = useMatch("/storage/draft/:id");
  const previewMatch: PathMatch<string> | null = useMatch(
    "/storage/draft/docuview/:id"
  );

  const [drafts, setDrafts] = useState<IDraftData[] | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const getDrafts = async () => {
      let draftsArr: IDraftData[] = [];

      if (user.id) {
        draftsArr = await getAllDraftsByUser(user.id);
      } else {
        console.error("getDrafts - user's info doesn't exist.");
      }

      if (draftsArr.length !== 0) {
        // console.log(`draftsArr = ${draftsArr}`);
        setDrafts(draftsArr);
      } else {
        console.log("getDrafts - user's drafts don't exist");
      }
    };

    getDrafts();
  }, [user.id]);

  return (
    <>
      {/* draftTable */}
      {drafts ? <DraftTable documents={drafts} /> : null}

      {/* modal */}
      {docuMatch ? <Modal prevURL="draft" /> : null}
      {previewMatch ? <Preview /> : null}

      {/* pages */}
      <Page pageNum={pageNum} lastPage={lastPage} setPageNum={setPageNum} />
    </>
  );
};

export default Draft;
