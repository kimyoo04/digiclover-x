// firebase
import {collection, doc, setDoc} from "firebase/firestore";
import {dbService} from "src/fbase";
// contants
import {DocuKind, IContractor} from "@constants/types/document";
// controller
import {addData} from "@controllers/firebase.util";

// --------------------------------------------------------------------
// Post - 문서생성
// --------------------------------------------------------------------
export const postOneDocu = async (
  userId: string,
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

  console.log("contractors \n", contractors);
  console.log("docuKind \n", docuKind);
  console.log("docuTitle \n", docuTitle);
  console.log("docuContent \n", docuContent);
  console.log("imgUrl \n", imgUrl);
  console.log("createdAt \n", createdAt);

  // 요청자(UserId1)에는 해당 UserId, 수신자에는 0, 없으면 null 처리
  for (let i = 0; i < 4; i++) {
    contractors[i].uid = undefined;
  }

  for (let i = 0; i < contractorsNum; i++) {
    if (i === 0) {
      contractors[i].uid = userId;
    } else {
      contractors[i].uid = "0";
    }
  }

  // 문서 튜플 1개 추가
  const documentObj = {
    contractors,

    docuKind,
    docuTitle,
    docuContent,
    hashFile: "0",

    sendEmails: false,

    createdAt,
  };

  // 미리 document 생성 후 documentRef에 할당
  const documentRef = doc(collection(dbService, "documents"));

  // document에 데이터 set
  await setDoc(documentRef, documentObj).catch((error) =>
    console.log("Document create error ==> ", error)
  );

  // 요청자만 서명 튜플 1개 추가
  const signatureObj = {
    DocumentId: documentRef.id,
    UserId: userId,
    isSigned: true,
    hashValue: "0", // 임시
    imgUrl,
    createdAt, // 요청자만 createdAt 없고 updatedAt 있음
  };

  addData("signatures", signatureObj).catch((error) =>
    console.log("요청자 Signature create error ==> ", error)
  );

  // 요청자를 제외한 수신자 서명 튜플 0~3개 추가

  for (let i = 1; i < contractorsNum; i++) {
    const signaturesObj = {
      DocumentId: documentRef.id,
      UserId: contractors[i].uid,
      isSigned: false,
      email: contractors[i].email, // 수신자 인증용
      createdAt,
    };

    addData("signatures", signaturesObj).catch((error) =>
      console.log("수신자 Signature create error ==> ", error)
    );
  }
};

// --------------------------------------------------------------------
// Update - 계약자 서명시 contractors[1,2,3] 중 uid 수정
// --------------------------------------------------------------------
export const updateContractorUID = async () => {};

// --------------------------------------------------------------------
// Update - 이메일 전송시 sendEmails: false -> true
// --------------------------------------------------------------------
export const updateSendEmailsStatus = async () => {};

// --------------------------------------------------------------------
// Delete one document (기본값 - documents)
// --------------------------------------------------------------------
export const deleteOneDocu = async () => {};
