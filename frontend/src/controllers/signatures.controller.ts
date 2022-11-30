// firebase
import {
  collection,
  deleteDoc,
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
  signatureID: string,
  contractorUID: string,
  imgUrl: string
) => {
  const updatedAt = Date.now() + 9 * 60 * 60 * 1000;

  const signatureUpdateObj = {
    uid: contractorUID,

    isSigned: true,
    hashValue: "0", // 임시
    imgUrl,

    updatedAt,
  };

  const signatureRef = doc(collection(dbService, "signatures", signatureID));
  await updateDoc(signatureRef, signatureUpdateObj)
    .then(() => console.log("updateOneSignature updateDoc success"))
    .catch((error) =>
      console.log("updateOneSignature updateDoc error ==> ", error)
    );
};

// --------------------------------------------------------------------
// Get - documentIds 배열 생성
// --------------------------------------------------------------------
export const getDocumentIdsArr = async (uid: string) => {
  let documentIdsArr: string[] = [];

  try {
    const signautesQuery = query(
      collection(dbService, "signatures"),
      where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );

    const signautesQuerySnapshot = await getDocs(signautesQuery)
      .then((data) => {
        console.log("getDocumentIdsArr getDocs success");
        return data;
      })
      .catch((error) =>
        console.log("getDocumentIdsArr getDocs error ==> ", error)
      );

    signautesQuerySnapshot?.forEach((doc) => {
      documentIdsArr.push(doc.data().DocumentId);
    });
  } catch (error) {
    console.log("getDocumentIdsArr error ==> ", error);
  }
  console.log("getDocumentIdsArr success");
  return documentIdsArr;
};

// --------------------------------------------------------------------
// Delete - documentId와 일치하는 서명 삭제
// --------------------------------------------------------------------
export const deleteSignaturesByDocumentId = async (documentID: string) => {
  try {
    // 유저 아이디와 일치하는 서명 찾기
    let signaturesIdArr: string[] = [];
    const signautesQuery = query(
      collection(dbService, "signatures"),
      where("DocumentId", "==", documentID)
    );

    // 서명에서 id만 추출 후 배열 생성
    const signautesQuerySnapshot = await getDocs(signautesQuery)
      .then((data) => {
        console.log("deleteSignaturesByDocumentId getDocs success");
        return data;
      })
      .catch((error) =>
        console.log("deleteSignaturesByDocumentId getDocs error ==> ", error)
      );

    signautesQuerySnapshot?.forEach((doc) => {
      signaturesIdArr.push(doc.id);
    });

    // 서명 삭제 반복
    for (let signatureID of signaturesIdArr) {
      console.log(signatureID);
      const signatureRef = doc(dbService, "signatures", signatureID);
      await deleteDoc(signatureRef)
        .then(() =>
          console.log("deleteSignaturesByDocumentId deleteDoc success")
        )
        .catch((error) =>
          console.log(
            "deleteSignaturesByDocumentId deleteDoc error ==> ",
            error
          )
        );
    }
  } catch (error) {
    console.log("deleteSignaturesByDocumentId error ==> ", error);
  }
  console.log("deleteSignaturesByDocumentId success");
};
