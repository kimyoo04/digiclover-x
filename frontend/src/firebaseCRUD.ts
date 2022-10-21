import {IDocumentData} from "@constants/types/document";
import {User} from "firebase/auth";
// firebase
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";

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
// Delete one document document (기본값 - documents)
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

// --------------------------------------------------------------------
// Add one Oauth User document
// --------------------------------------------------------------------
export const addUserDoc = async (user: User) => {
  const userQuery = query(
    collection(dbService, "users"),
    where("uid", "==", user.uid)
  );
  const querySnapshot = await getDocs(userQuery);

  // user doc 에 정보가 존재하지 않으면 (구글로그인 첫 방문일 경우)
  if (querySnapshot.docs.length === 0) {
    // user doc 생성
    console.log("google user doc 생성");
    await addDoc(collection(dbService, "users"), {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      providerId: user.providerData[0].providerId,
      createdAt: Date.now() + 9 * 60 * 60 * 1000,
    });
  }
};
