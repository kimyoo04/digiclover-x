// types
import {DocumentState} from "@constants/types/document";
// controllers
import {postOneOngoing} from "@controllers/ongoings.controller";

// --------------------------------------------------------------------
// saveNewDraft - 새로운 임시 저장 문서
// --------------------------------------------------------------------
export const saveNewDraft = async (uid: string, docuInfo: DocumentState) => {
  const {contractors, docuKind, docuTitle, docuContent} = docuInfo;
  let ongoingId;

  try {
    // ongoings 문서 저장
    ongoingId = await postOneOngoing(uid, {
      contractors,
      docuKind,
      docuTitle,
      docuContent,
    });
  } catch (error) {
    console.error("saveNewDraft error ==> ", error);
  }

  console.log("saveNewDraft success");
  return ongoingId;
};

// --------------------------------------------------------------------
// saveExistingDraft - 기존 임시 저장 문서 (보류)
// --------------------------------------------------------------------
export const saveExistingDraft = async () => {};
