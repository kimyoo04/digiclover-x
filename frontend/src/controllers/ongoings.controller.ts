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
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";
// types
import {IContractor} from "@constants/types/contractor";
import {DocuKind} from "@constants/types/docukind";

//--------------------------------------------------------------------------------
// Get - ongoings 문서 유저별 조회
//--------------------------------------------------------------------------------
export const getOneOngoing = async (ongoingId: string) => {
  const ongoingRef = doc(dbService, "ongoings", ongoingId);
  try {
    const ongoingSnap = await getDoc(ongoingRef)
      .then((data) => {
        console.log("getOneOngoing getDocs success");
        return data;
      })
      .catch((error) => console.log("getOneOngoing getDocs error ==> ", error));

    if (ongoingSnap?.exists()) return ongoingSnap.data();
  } catch (error) {
    console.log(`getOneOngoing error ==> ${error}`);
  }
  console.log(`getOneOngoing success`);
};

//--------------------------------------------------------------------------------
// Get - ongoings 문서 유저별 조회
//--------------------------------------------------------------------------------
export const getAllOngoingsByUser = async (uid: string) => {
  let ongoingsArr: any = [];
  const DateNow = Date.now() + 9 * 60 * 60 * 1000; // 한국 시간 9시간 추가

  try {
    const ongoingsQuery = query(
      collection(dbService, "ongoings"),
      where("uid", "==", uid),
      where("expiresAt", "<=", DateNow), // 만료 확인
      orderBy("expiresAt", "asc")
    );

    const onGoingsQuerySnapshot = await getDocs(ongoingsQuery)
      .then((data) => {
        console.log("getAllOngoingsByUser getDocs success");
        return data;
      })
      .catch((error) =>
        console.log("getAllOngoingsByUser getDocs error ==> ", error)
      );

    onGoingsQuerySnapshot?.forEach(async (doc) => {
      await ongoingsArr.push({id: doc.id, ...doc.data()});
    });
  } catch (error) {
    console.log("getAllOngoingsByUser error ==> ", error);
  }

  console.log(`getAllOngoingsByUser success`);
  return ongoingsArr;
};

//--------------------------------------------------------------------------------
// Post - ongoings 문서 생성
//--------------------------------------------------------------------------------
export const postOneOngoing = async (
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

  const ongoingObj = {
    uid,
    contractor,

    docuKind,
    docuTitle,
    docuContent,

    createdAt,
    expiresAt,
  };

  const ongoingRef = doc(collection(dbService, "ongoings"));
  await setDoc(ongoingRef, ongoingObj)
    .then(() => console.log("ongoings setDoc success"))
    .catch((error) => console.log("ongoings setDoc error ==> ", error));

  return ongoingRef.id;
};

//--------------------------------------------------------------------------------
// Update - 임시 저장 / ongoing doc (docuContent, docuTitle) 수정
//--------------------------------------------------------------------------------
export const updateOngoingDocu = async () => {};

//--------------------------------------------------------------------------------
// Delete - 유호기간 지난 ongoing doc 삭제
//--------------------------------------------------------------------------------
export const deleteOneOngoing = async (documentID: string) => {
  try {
    const ongoingRef = doc(dbService, "ongoings", documentID);
    await deleteDoc(ongoingRef);
  } catch (error) {
    console.log("deleteOneOngoing error ==> ", error);
  }
  console.log("deleteOneOngoing success");
};

//--------------------------------------------------------------------------------
// Delete - 유호기간 지난 ongoing doc 반복 삭제
//--------------------------------------------------------------------------------
export const deleteExpiredOngoings = async () => {};
