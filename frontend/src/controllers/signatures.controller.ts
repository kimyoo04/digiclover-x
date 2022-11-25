// firebase
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";

// --------------------------------------------------------------------
// Update - 계약자 서명시 signature doc 수정
// --------------------------------------------------------------------
export const updateOneSignature = async (
  signatureId: string,
  contractorUID: string,
  imgUrl: string
) => {
  const updatedAt = Date.now() + 9 * 60 * 60 * 1000;
  const signatureUpdateObj = {
    UserId: contractorUID,
    isSigned: true,
    hashValue: "0", // 임시
    imgUrl,
    updatedAt,
  };

  const signatureRef = doc(collection(dbService, "signatures", signatureId));
  await updateDoc(signatureRef, signatureUpdateObj)
    .then(() => console.log("signature updateDoc success"))
    .catch((error) => console.log("signature updateDoc error ==> ", error));
};

// --------------------------------------------------------------------
// Get - documentIds 배열 생성
// --------------------------------------------------------------------
export const getDocumentIdsArr = async (uid: string) => {
  let documentIdsArr: string[] = [];

  // 유저 아이디와 일치하는 서명 찾기
  const signautesQuery = query(
    collection(dbService, "signatures"),
    where("UserId", "==", uid),
    orderBy("createdAt", "desc")
  );

  // 서명에서 DocumentId만 추출 후 배열 생성
  const signautesQuerySnapshot = await getDocs(signautesQuery);
  signautesQuerySnapshot.forEach((doc) => {
    documentIdsArr.push(doc.data().DocumentId);
  });

  return documentIdsArr;
};
