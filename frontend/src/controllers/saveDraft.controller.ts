// types
import {DocumentState} from "@constants/types/document";
// controllers
import {postOneOngoing} from "@controllers/ongoings.controller";
import {updateUserOngoingsId} from "@controllers/users.controller";

// --------------------------------------------------------------------
// saveNewDraft - 새로운 임시 저장 문서
// --------------------------------------------------------------------
export const saveNewDraft = async (uid: string, docuInfo: DocumentState) => {
  const {contractors, docuKind, docuTitle, docuContent} = docuInfo;
  try {
    // ongoings 문서 저장
    const ongoingId = await postOneOngoing(uid, {
      contractors,
      docuKind,
      docuTitle,
      docuContent,
    });

    // 유저의 ongoings 문서 저장
    await updateUserOngoingsId(uid, ongoingId);
  } catch (error) {
    console.log("saveNewDraft error ==> ", error);
  }
  console.log("saveNewDraft success");
};

// --------------------------------------------------------------------
// saveExistingDraft - 기존 임시 저장 문서 (보류)
// --------------------------------------------------------------------
export const saveExistingDraft = async () => {};
