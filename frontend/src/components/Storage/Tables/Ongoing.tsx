// modules
import {useEffect, useState} from "react";
import {PathMatch, useMatch} from "react-router-dom";
// components
import OngoingTable from "@components/Storage/Tables/OngoingTable/Table";
import chunkArray from "@components/Util/chunkArray";
import Preview from "@components/Storage/Modal/DocuView";
import Modal from "@components/Storage/Modal/Modal";
import Page from "@components/Storage/Page";
// controllers
import {getAllOngoingsByUser} from "@controllers/ongoings.controller";
// types
import {IOngoingData} from "@constants/types/ongoing";
// redux-toolkit
import {useAppSelector} from "@app/hook";

const Ongoing = () => {
  const docuMatch: PathMatch<string> | null = useMatch("/storage/ongoing/:id");
  const previewMatch: PathMatch<string> | null = useMatch(
    "/storage/ongoing/docuview/:id"
  );

  const [ongoings, setOngoings] = useState<IOngoingData[] | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const getOngoings = async () => {
      let ongoingsArr: IOngoingData[] = [];

      if (user.id) {
        ongoingsArr = await getAllOngoingsByUser(user.id);
      } else {
        console.error("getOngoings - user's info doesn't exist.");
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

  return (
    <>
      {/* OnGoingTable */}
      {ongoings ? <OngoingTable documents={ongoings} /> : null}

      {/* modal */}
      {docuMatch ? <Modal /> : null}
      {previewMatch ? <Preview /> : null}

      {/* pages */}
      <Page pageNum={pageNum} lastPage={lastPage} setPageNum={setPageNum} />
    </>
  );
};

export default Ongoing;
