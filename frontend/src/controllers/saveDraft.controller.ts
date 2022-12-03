// types
import {DocumentState} from "@constants/types/document";
// controllers
import {postOneDraft} from "@controllers/drafts.controller";

// --------------------------------------------------------------------
// saveDraft - 새로운 임시 저장 문서
// --------------------------------------------------------------------
export const saveDraft = async (uid: string, docuInfo: DocumentState) => {
  const {contractors, docuKind, docuTitle, docuContent} = docuInfo;
  let draftId;

  try {
    // drafts 문서 저장
    draftId = await postOneDraft(uid, {
      contractors,
      docuKind,
      docuTitle,
      docuContent,
    });
  } catch (error) {
    console.error("saveDraft error ==> ", error);
  }

  console.log("saveDraft success");
  return draftId;
};

// --------------------------------------------------------------------
// saveExistingDraft - 기존 임시 저장 문서 (보류)
// --------------------------------------------------------------------
export const saveExistingDraft = async () => {};
