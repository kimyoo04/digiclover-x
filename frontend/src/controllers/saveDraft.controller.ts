// types
import {DocumentState} from "@constants/types/document";
// controllers
import {postOneOngoingDocu} from "@controllers/ongoings.controller";
import {updateOngoingsId} from "@controllers/users.controller";

// --------------------------------------------------------------------
// saveNewDraft - 새로운 임시 저장 문서
// --------------------------------------------------------------------
export const saveNewDraft = async (uid: string, docuInfo: DocumentState) => {
  const {contractors, docuKind, docuTitle, docuContent} = docuInfo;

  if (uid) {
    // ongoings 문서 저장
    const ongoingId = await postOneOngoingDocu(uid, {
      contractors,
      docuKind,
      docuTitle,
      docuContent,
    });

    // 유저의 ongoings 문서 저장
    await updateOngoingsId(uid, ongoingId)
      .then(() => console.log("updateOngoingsId success"))
      .catch((error) => console.log("updateOngoingsId error ==> ", error));
  } else {
    console.log("postOneOngoingDocu - 유저 정보가 없습니다.");
  }
};

// --------------------------------------------------------------------
// saveNewDraft - 기존 임시 저장 문서
// --------------------------------------------------------------------
export const saveExistingDraft = async () => {};
