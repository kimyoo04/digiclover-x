// modules
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import * as _ from "lodash";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// types
import {ISignatureData} from "@constants/types/signature";
import {IUser} from "@constants/types/user";
// components
import Logging from "@components/Storage/Modal/Logging";
// styles
import {
  DocuButton,
  DocumentWrapper,
  DocumentModal,
  Overlay,
} from "./ModalStyles";
// controllers
import {getSignaturesByDocumentId} from "@controllers/signatures.controller";
import {getUsersInfo} from "@controllers/users.controller";

// props로 클릭한 문서의 정보 받아오기
const Modal = ({prevURL}: {prevURL: string}) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  // get signatures, users data
  const [signaturesData, setSignaturesData] = useState<ISignatureData[]>([]);
  const [usersData, setUsersData] = useState<IUser[]>([]);
  let {id} = useParams();
  console.log("documentId = ", id);

  useEffect(() => {
    if (user) {
      const getModalData = async () => {
        if (id) {
          const signaturesArr = await getSignaturesByDocumentId(id);
          console.log("signaturesArr", signaturesArr);
          setSignaturesData(signaturesArr);

          const uidsArr = signaturesArr.map((doc) => doc.uid);
          const usersArr: IUser[] = await getUsersInfo(uidsArr);
          console.log("usersArr", usersArr);
          setUsersData(usersArr);

          // 현재 상황 :
          // - 서명, 유저, 문서 정보 3개가 한번에 필요하다.
          // - 모달의 디자인이 미완이라 헤매고 있다.
          // - 아직 서명을 안한 사람들의 처리와 갑을병정의 순서를 못정 했다.

          // 다른 방법 :
          // -> table의 row로 문서 정보를 받아서 contractors의 아이디를 그대로 출력..
          // -> 서명 유무는 contractors의 uid로 확인 가능해서 modal UI 생성
          // -> 문서 보기를 클릭했을 때 documentId를 가지고 문서 get하기 + 서명 get 하기
          // -> 문서 제목, 문서내용, 서명 이미지로 docuview UI 생성
        }
      };

      getModalData().catch((error) =>
        console.error("getModalData error ==> ", error)
      );
    }
  }, [user, id]);

  // 데이터 전처리
  const getMergedData = (
    usersData: IUser[],
    signaturesData: ISignatureData[]
  ) => {
    const mergedData = [];

    for (let oneUser of usersData) {
      // Userid를 기준으로 signature doc 를 찾기
      const findSignature = _.find(signaturesData, {
        UserId: oneUser.uid,
      });

      // id는 signature doc의 id 저장됨
      const data: any = _.merge(oneUser, findSignature);

      if (data) {
        mergedData.push(data);
      }
    }
    return mergedData;
  };

  const mergedDataArr = getMergedData(usersData, signaturesData);
  console.log("mergedDataArr", mergedDataArr);

  return (
    <AnimatePresence>
      {signaturesData && usersData ? (
        <>
          <Overlay
            onClick={() => navigate(`/storage/${prevURL}`)}
            exit={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2}}
          />
          <DocumentModal
            exit={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2}}
          >
            <>
              <DocumentWrapper>
                <DocuButton onClick={() => navigate(`/storage/DocuView/${id}`)}>
                  문서 보기
                </DocuButton>
              </DocumentWrapper>

              {signaturesData &&
                mergedDataArr &&
                [0, 1, 2, 3].map(
                  (index) =>
                    mergedDataArr[index] && (
                      <Logging key={index} data={mergedDataArr[index]} />
                    )
                )}
            </>
          </DocumentModal>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
