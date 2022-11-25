// firebase
import {
  collection,
  doc,
  documentId,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";
// contants
import {DocuKind, IContractor} from "@constants/types/document";
// controller
import {addData} from "@controllers/firebase.util";

// --------------------------------------------------------------------
// Get - 문서 조회
// --------------------------------------------------------------------
export const getDocumentsByPageNum = async (
  documentIdsChunkArr: string[][],
  pageNum: number
) => {
  let documentsArr: any = [];

  const documentsQuery = query(
    collection(dbService, "documents"),
    where(documentId(), "in", documentIdsChunkArr[pageNum - 1])
  );

  // 페이지 번호마다 문서 조회
  const documentsQuerySnapshot = await getDocs(documentsQuery)
    .then((data) => {
      console.log("getDocumentsByPageNum getDocs success");
      return data;
    })
    .catch((error) =>
      console.log("getDocumentsByPageNum getDocs error ==> ", error)
    );

  // documentsArr 에 저장
  documentsQuerySnapshot?.forEach((doc) => {
    documentsArr.push({id: doc.id, ...doc.data()});
  });

  return documentsArr;
};

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
    updatedAt: createdAt,
  };

  // 미리 document 생성 후 documentRef에 할당
  const documentRef = doc(collection(dbService, "documents"));

  // document에 데이터 set
  await setDoc(documentRef, documentObj)
    .then(() => console.log("documents setDoc success"))
    .catch((error) => console.log("Document setDoc error ==> ", error));

  // 요청자만 서명 튜플 1개 추가
  const signatureObj = {
    DocumentId: documentRef.id,
    UserId: userId,
    isSigned: true,
    hashValue: "0", // 임시
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
    const signaturesObj = {
      DocumentId: documentRef.id,
      UserId: contractors[i].uid,
      isSigned: false,
      email: contractors[i].email, // 수신자 인증용
      createdAt,
      updatedAt: createdAt,
    };

    await addData("signatures", signaturesObj)
      .then(() => console.log("수신자 signatures addData success"))
      .catch((error) =>
        console.log("수신자 signatures addData error ==> ", error)
      );
  }
};

// --------------------------------------------------------------------
// Update - 계약자 서명시 contractors[1,2,3] 중 uid 수정
// --------------------------------------------------------------------
export const updateContractorUID = async (
  documentID: string,
  contractorUID: string
) => {};

// --------------------------------------------------------------------
// Update - 이메일 전송시 sendEmails: false -> true
// --------------------------------------------------------------------
export const updateSendEmailsStatus = async () => {};

// --------------------------------------------------------------------
// Delete one document (기본값 - documents)
// --------------------------------------------------------------------
export const deleteOneDocu = async () => {};
