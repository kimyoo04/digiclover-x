// firebase
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";
// types
import {DocuKind, IContractor} from "@constants/types/document";

//--------------------------------------------------------------------------------
// Get - ongoings 문서 1개 조회
//--------------------------------------------------------------------------------
export const getOneOngoingsDocu = async () => {};

//--------------------------------------------------------------------------------
// Get - ongoings 문서 유저별 조회
//--------------------------------------------------------------------------------
export const getFiveOngoingsDocu = async (uid: string) => {
  let onGoingsArr: any = [];

  const onGoingsQuery = query(
    collection(dbService, "ongoings"),
    where("UserId", "==", uid),
    orderBy("updatedAt", "desc"),
    limit(5)
  );

  const onGoingsQuerySnapshot = await getDocs(onGoingsQuery);
  onGoingsQuerySnapshot.forEach(async (doc) => {
    await onGoingsArr.push({id: doc.id, ...doc.data()});
  });

  return onGoingsArr;
};

//--------------------------------------------------------------------------------
// Post - ongoings 문서 생성
//--------------------------------------------------------------------------------
export const postOneOngoingDocu = async (
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
  const createdAt = Date.now() + 9 * 60 * 60 * 1000;
  const contractor = {uid, ...contractors[0]};

  const ongoingObj = {
    contractor,

    docuKind,
    docuTitle,
    docuContent,

    createdAt,
  };

  const ongoingRef = doc(collection(dbService, "ongoings"));
  await setDoc(ongoingRef, ongoingObj)
    .then(() => console.log("ongoings addData success"))
    .catch((error) => console.log("ongoings addData error ==> ", error));

  return ongoingRef.id;
};

//--------------------------------------------------------------------------------
// Update - 임시 저장 / ongoings 문서 (docuContent, docuTitle) 수정
//--------------------------------------------------------------------------------
export const updateOngoingDocu = async () => {};

//--------------------------------------------------------------------------------
// Delete - ongoings 문서 삭제
//--------------------------------------------------------------------------------
export const deleteOngoingDocu = async () => {};
