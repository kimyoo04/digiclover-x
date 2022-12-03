// firebase
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";
// types
import {IContractor} from "@constants/types/contractor";
import {DocuKind} from "@constants/types/docukind";

//--------------------------------------------------------------------------------
// Get - drafts 문서 유저별 조회
//--------------------------------------------------------------------------------
export const getOneDraft = async (draftID: string) => {
  const draftRef = doc(dbService, "drafts", draftID);
  try {
    const draftSnap = await getDoc(draftRef)
      .then((data) => {
        console.log("getOneDraft getDocs success");
        return data;
      })
      .catch((error) => console.error("getOneDraft getDocs error ==> ", error));

    if (draftSnap?.exists()) return draftSnap.data();
  } catch (error) {
    console.error(`getOneDraft error ==> ${error}`);
  }
  console.log(`getOneDraft success`);
};

//--------------------------------------------------------------------------------
// Get - drafts 문서 유저별 조회
//--------------------------------------------------------------------------------
export const getAllDraftsByUser = async (uid: string) => {
  let draftsArr: any = [];

  try {
    await deleteExpiredDrafts(uid);

    const draftsQuery = query(
      collection(dbService, "drafts"),
      where("uid", "==", uid),
      orderBy("expiresAt", "asc")
    );

    const draftsQuerySnapshot = await getDocs(draftsQuery)
      .then((data) => {
        console.log("getAllDraftsByUser getDocs success");
        return data;
      })
      .catch((error) =>
        console.error("getAllDraftsByUser getDocs error ==> ", error)
      );

    draftsQuerySnapshot?.forEach((doc) => {
      draftsArr.push({id: doc.id, ...doc.data()});
    });
  } catch (error) {
    console.error("getAllDraftsByUser error ==> ", error);
  }

  console.log(`getAllDraftsByUser success`);
  return draftsArr;
};

//--------------------------------------------------------------------------------
// Post - drafts 문서 생성
//--------------------------------------------------------------------------------
export const postOneDraft = async (
  uid: string,
  {
    contractors,
    docuKind,
    docuTitle,
    docuContent,
  }: {
    contractors: IContractor[];
    docuKind: DocuKind;
    docuTitle: string;
    docuContent: string;
  }
) => {
  const createdAt = Date.now() + 9 * 60 * 60 * 1000; // 한국 시간 9시간 추가
  const expiresAt = createdAt + 14 * 24 * 60 * 60 * 1000; // 2주일 뒤 만료
  const contractor = contractors[0]; // 요청자

  const draftObj = {
    uid,
    contractor,

    docuKind,
    docuTitle,
    docuContent,

    createdAt,
    expiresAt,
  };

  const draftRef = doc(collection(dbService, "drafts"));
  await setDoc(draftRef, draftObj)
    .then(() => console.log("drafts setDoc success"))
    .catch((error) => console.error("drafts setDoc error ==> ", error));

  return draftRef.id;
};

//--------------------------------------------------------------------------------
// Update - 임시 저장 / draft doc (docuContent, docuTitle) 수정
//--------------------------------------------------------------------------------
export const updateDraftDocu = async (
  draftID: string,
  docuContent: string,
  docuTitle: string
) => {
  try {
    const draftRef = doc(dbService, "drafts", draftID);
    await updateDoc(draftRef, {docuContent, docuTitle})
      .then(() => console.log("updateDraftDocu updateDoc success"))
      .catch((error) =>
        console.error("updateDraftDocu updateDoc error ==> ", error)
      );
  } catch (error) {
    console.error("updateDraftDocu error ==> ", error);
  }
  console.log("updateDraftDocu success");
};

//--------------------------------------------------------------------------------
// Delete - 유호기간 지난 draft doc 삭제
//--------------------------------------------------------------------------------
export const deleteOneDraft = async (draftID: string) => {
  try {
    const draftRef = doc(dbService, "drafts", draftID);
    await deleteDoc(draftRef)
      .then(() => console.log("deleteOneDraft deleteDoc success"))
      .catch((error) =>
        console.error("deleteOneDraft deleteDoc error ==> ", error)
      );
  } catch (error) {
    console.error("deleteOneDraft error ==> ", error);
  }
  console.log("deleteOneDraft success");
};

//--------------------------------------------------------------------------------
// Delete - 유호기간 지난 draft doc 반복 삭제
//--------------------------------------------------------------------------------
export const deleteExpiredDrafts = async (uid: string) => {
  try {
    const DateNow = Date.now() + 9 * 60 * 60 * 1000; // 한국 시간 9시간 추가
    let expiredDraftIdsArr: string[] = [];

    const expiredDraftsQuery = query(
      collection(dbService, "drafts"),
      where("uid", "==", uid),
      where("expiresAt", "<=", DateNow)
    );

    const expiredDraftsQuerySnapshot = await getDocs(expiredDraftsQuery)
      .then((data) => {
        console.log("deleteExpiredDrafts getDocs success");
        return data;
      })
      .catch((error) =>
        console.error("deleteExpiredDrafts getDocs error ==> ", error)
      );

    if (expiredDraftsQuerySnapshot !== undefined) {
      expiredDraftsQuerySnapshot.forEach((doc) => {
        expiredDraftIdsArr.push(doc.id);
      });

      for (let expiredDraftId of expiredDraftIdsArr) {
        const expiredDraftRef = doc(dbService, "documents", expiredDraftId);
        await deleteDoc(expiredDraftRef)
          .then(() => console.log("deleteExpiredDrafts deleteDoc success"))
          .catch((error) =>
            console.error("deleteExpiredDrafts deleteDoc error ==> ", error)
          );
      }
    } else {
      console.error("deleteExpiredDrafts - expired drafts don't exist");
    }
  } catch (error) {
    console.error("deleteExpiredDrafts error ==> ", error);
  }
  console.log("deleteExpiredDrafts success");
};
