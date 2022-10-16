import {collection, doc, serverTimestamp, setDoc} from "firebase/firestore";
import {dbService} from "src/fbase";
import {addData} from "src/firebaseCRUD";

//--------------------------------------------------------------------------------
// Post - 문서생성
//--------------------------------------------------------------------------------
export const PostOneDocument = async (userId, dataObj) => {
  // 문서 생성
  await AddDocumentAndSignatures(userId, dataObj).catch((err) =>
    console.error("postOneDocument ==> ", err)
  );

  console.log("apiPostOneDocument - success");
};

const AddDocumentAndSignatures = async (
  userId,
  {contractors, docuKind, docuTitle, docuContent, imgUrl}
) => {
  // 필요한 데이터 변수에 할당
  const contractorsNum = contractors.length;
  const UsersId = [null, null, null, null];
  const createdAt = serverTimestamp();

  console.log("contractors \n", contractors);
  console.log("docuKind \n", docuKind);
  console.log("docuTitle \n", docuTitle);
  console.log("docuContent \n", docuContent);
  console.log("imgUrl \n", imgUrl);
  console.log("createdAt \n", createdAt);

  // 요청자(UserId1)에는 해당 UserId, 수신자에는 0, 없으면 null 처리
  for (let i = 0; i < contractorsNum; i++) {
    if (i === 0) {
      UsersId[i] = userId;
    } else {
      UsersId[i] = "0";
    }
  }

  // 문서 튜플 1개 추가
  const documentObj = {
    docuKind,
    docuTitle,
    docuContent,

    hashFile: "0",

    UserId1: UsersId[0],
    UserId2: UsersId[1],
    UserId3: UsersId[2],
    UserId4: UsersId[3],

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
    createdAt,
  };

  addData("signatures", signatureObj).catch((error) =>
    console.log("요청자 Signature create error ==> ", error)
  );

  // 요청자를 제외한 수신자 서명 튜플 0~3개 추가

  for (let i = 1; i < contractorsNum; i++) {
    const signaturesObj = {
      DocumentId: documentRef.id,
      UserId: UsersId[i],
      isSigned: false,
      email: contractors[i].email, // 수신자 인증용
      createdAt,
    };

    addData("signatures", signaturesObj).catch((error) =>
      console.log("수신자 Signature create error ==> ", error)
    );
  }
};
