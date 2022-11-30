// firebase
import {
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";
// types
import {IContractor} from "@constants/types/contractor";
import {DocuKind} from "@constants/types/docukind";
// controllers
import {addData} from "@controllers/firebase.util";

// --------------------------------------------------------------------
// Get - 문서 조회
// --------------------------------------------------------------------
export const getDocumentsByPageNum = async (
  documentIdsChunkArr: string[][],
  pageNum: number
) => {
  let documentsArr: any = [];

  try {
    const documentsQuery = query(
      collection(dbService, "documents"),
      where(documentId(), "in", documentIdsChunkArr[pageNum - 1])
    );
    const documentsQuerySnapshot = await getDocs(documentsQuery);

    documentsQuerySnapshot?.forEach((doc) => {
      documentsArr.push({id: doc.id, ...doc.data()});
    });
  } catch (error) {
    console.log("getDocumentsByPageNum error ==> ", error);
  }

  console.log("getDocumentsByPageNum success");
  return documentsArr;
};

// --------------------------------------------------------------------
// Post - 문서 생성
// --------------------------------------------------------------------
export const postOneDocu = async (
  uid: string,
  {
    contractors,
    docuKind,
    docuTitle,
    docuContent,
    imgUrl,
  }: {
    contractors: IContractor[];
    docuKind: DocuKind;
    docuTitle: string;
    docuContent: string;
    imgUrl: string;
  }
) => {
  // 필요한 데이터 변수에 할당
  const contractorsNum = contractors.length;
  const createdAt = Date.now() + 9 * 60 * 60 * 1000;

  // console.log("contractors \n", contractors);
  // console.log("docuKind \n", docuKind);
  // console.log("docuTitle \n", docuTitle);
  // console.log("docuContent \n", docuContent);
  // console.log("imgUrl \n", imgUrl);
  // console.log("createdAt \n", createdAt);

  // 요청자 = uid, 수신자 = 0
  for (let i = 0; i < contractorsNum; i++) {
    if (i === 0) {
      contractors[i].uid = uid;
    } else {
      contractors[i].uid = "0";
    }
  }

  // 문서 Obj 생성
  const documentObj = {
    contractors,

    docuKind,
    docuTitle,
    docuContent,
    hashFile: "0",

    sendEmails: false,

    createdAt,
    updatedAt: createdAt,
  };

  try {
    // 미리 document 생성 후 documentRef에 할당
    const documentRef = doc(collection(dbService, "documents"));

    // document에 데이터 set
    await setDoc(documentRef, documentObj)
      .then(() => console.log("documents setDoc success"))
      .catch((error) => console.log("Document setDoc error ==> ", error));

    // 요청자만 서명 Obj 생성
    const signatureObj = {
      uid: contractors[0].uid,
      email: contractors[0].email,
      DocumentId: documentRef.id,

      hashValue: "0", // 임시
      isSigned: true,
      imgUrl,

      createdAt,
      updatedAt: createdAt,
    };

    await addData("signatures", signatureObj)
      .then(() => console.log("요청자 signature addData success"))
      .catch((error) =>
        console.log("요청자 signature addData error ==> ", error)
      );

    // 요청자를 제외한 수신자 서명 튜플 0~3개 추가

    for (let i = 1; i < contractorsNum; i++) {
      // 수신자 서명 Obj 생성
      const signaturesObj = {
        uid: contractors[i].uid,
        email: contractors[i].email, // 수신자 인증용
        DocumentId: documentRef.id,

        isSigned: false,

        createdAt,
        updatedAt: createdAt,
      };
      await addData("signatures", signaturesObj)
        .then(() => console.log("수신자 signatures addData success"))
        .catch((error) =>
          console.log("수신자 signatures addData error ==> ", error)
        );
    }
  } catch (error) {
    console.log("postOneDocu error ==> ", error);
  }
  console.log("postOneDocu success");
};

// --------------------------------------------------------------------
// Update - 계약자 서명시 contractors[1,2,3] 중 uid 수정
// --------------------------------------------------------------------
export const updateContractorUID = async (
  documentID: string,
  contractor: IContractor,
  contractorUID: string
) => {
  const documentRef = doc(collection(dbService, "documents", documentID));
  const document = await getDoc(documentRef);
};

// --------------------------------------------------------------------
// Update - 이메일 전송시 sendEmails: false -> true
// --------------------------------------------------------------------
export const updateSendEmailsStatus = async (documentID: string) => {
  try {
    const sendEmails = true;
    const documentRef = doc(collection(dbService, "documents", documentID));
    await updateDoc(documentRef, {sendEmails})
      .then(() => console.log("updateSendEmailsStatus updateDoc success"))
      .catch((error) =>
        console.log("updateSendEmailsStatus updateDoc error ==> ", error)
      );
  } catch (error) {
    console.log("updateSendEmailsStatus error ==> ", error);
  }
  console.log("updateSendEmailsStatus success");
};

// --------------------------------------------------------------------
// Delete - one document (기본값 - documents)
// --------------------------------------------------------------------
export const deleteOneDocu = async (documentID: string) => {
  try {
    const documentRef = doc(dbService, "documents", documentID);
    await deleteDoc(documentRef)
      .then(() => console.log("deleteOneDocu deleteDoc success"))
      .catch((error) =>
        console.log("deleteOneDocu deleteDoc error ==> ", error)
      );
  } catch (error) {
    console.log("deleteOneDocu error ==> ", error);
  }
  console.log("deleteOneDocu success");
};
