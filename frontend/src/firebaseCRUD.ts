import {IDocumentData} from "@services/document";
// firebase
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {dbService} from "./fbase";
// import {deleteObject} from "firebase/storage";

// --------------------------------------------------------------------
// Get data
// --------------------------------------------------------------------
export const getQueryData = async (
  userId: string | undefined,
  setQueryData: React.Dispatch<React.SetStateAction<null>>,
  tableName: string
) => {
  const q = query(
    collection(dbService, tableName),
    where("userId", "==", userId)
  );

  onSnapshot(q, (snapshot) => {
    const arr: any = snapshot.docs.map((data) => ({
      id: data.id,
      ...data.data(),
    }));
    setQueryData(arr);
  });
};

// --------------------------------------------------------------------
// add one Data
// --------------------------------------------------------------------
export const addData = async (tableName: string, dataObj: object) => {
  return addDoc(
    collection(dbService, tableName) as CollectionReference,
    dataObj
  );
};

// --------------------------------------------------------------------
// Delete one Data (기본값 - documents)
// --------------------------------------------------------------------
export const onDeleteData = async (
  tableName: string = "documents",
  dataObj: IDocumentData
) => {
  // 삭제, 수정할 객체 할당
  const queryRef = doc(dbService, tableName, `${dataObj.id}`);

  try {
    // 삭제를 재확인 받았을 때 삭제 기능 시작
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(queryRef);

      // // attachmentUrl 이 있는 경우
      // if (queryRef.attachmentUrl !== "") {
      //   await deleteObject(desertRef);
      // }
    }
  } catch (error) {
    window.alert("삭제하는 데 실패했습니다!");
  }
};
