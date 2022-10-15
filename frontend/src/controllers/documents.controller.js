import {addDoc, collection, doc, setDoc} from "firebase/firestore";
import {dbService} from "src/fbase";
import {addData} from "src/firebaseCRUD";

//--------------------------------------------------------------------------------
// Post - 문서생성
//--------------------------------------------------------------------------------
export const PostOneDocument = async (userId, dataObj) => {
  // 문서 생성
  await AddDocument(userId, dataObj).catch((err) =>
    console.error("postOneDocument ==> ", err)
  );

  console.log("apiPostOneDocument - success");
};

const AddDocument = async (
  userId,
  {contractors, docuKind, docuTitle, docuContent, imgUrl}
) => {
  // 이곳에서 인수 처리 후 DB에 넣기

  console.log("contractors", contractors);
  console.log("docuKind", docuKind);
  console.log("docuTitle", docuTitle);
  console.log("docuContent", docuContent);
  console.log("imgUrl", imgUrl);

  const contractorsNum = contractors.length;
  const UsersId = [null, null, null, null];

  // 요청자(UserId1)에는 해당 UserId, 수신자에는 0, 없으면 null 처리
  for (let i = 0; i < contractorsNum; i++) {
    if (i === 0) {
      UsersId[i] = userId;
    } else {
      UsersId[i] = 0;
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
    hashValue: "0",
    imgUrl,
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
    };

    addData("signatures", signaturesObj).catch((error) =>
      console.log("수신자 Signature create error ==> ", error)
    );
  }
};
