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
// firebase
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";

// props로 클릭한 문서의 정보 받아오기
const Modal = ({prevURL}: {prevURL: string}) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  // get signatures, users data
  const [signaturesData, setSignaturesData] = useState<ISignatureData[]>([]);
  const [usersData, setUsersData] = useState<IUser[]>([]);
  let {id} = useParams();
  console.log(id);

  useEffect(() => {
    if (user) {
      const getAllData = async () => {
        if (id) {
          //----------------------------------------------------------------
          // useParams로 얻은 DocumentId로 signatures doc 쿼리 생성
          const SignautesNUsersQuery = query(
            collection(dbService, "signatures"),
            where("DocumentId", "==", id)
          );
          //----------------------------------------------------------------
          // signatures doc data 생성 + UserId만 추출한 배열 생성
          let UserIdsArr: string[] = [];
          onSnapshot(SignautesNUsersQuery, (snapshot) => {
            const signaturesArr: any = snapshot.docs.map((document) => {
              return {
                id: document.id,
                ...document.data(),
              };
            });
            console.log("signaturesArr", signaturesArr);
            setSignaturesData(signaturesArr);
          });

          // 서명에서 DocumentId만 추출 후 배열 생성
          const signautesQuerySnapshot = await getDocs(SignautesNUsersQuery);
          signautesQuerySnapshot.forEach((doc) => {
            UserIdsArr.push(doc.data().UserId);
          });

          // console.log("UserIdsArr \n", UserIdsArr);

          //----------------------------------------------------------------
          // UserIds를 통해 users doc 쿼리 생성
          const userQuery = query(
            collection(dbService, "users"),
            where("uid", "in", UserIdsArr)
          );

          //----------------------------------------------------------------
          // users doc data 생성
          onSnapshot(userQuery, (snapshot) => {
            const usersArr: any = snapshot.docs.map((document) => ({
              id: document.id,
              ...document.data(),
            }));
            console.log("usersArr", usersArr);
            setUsersData(usersArr);
          });
          //----------------------------------------------------------------
        }
      };

      getAllData().catch((error) => console.log(error));
    }
  }, [user, id]);

  console.log("signaturesData", signaturesData);
  console.log("usersArr", usersData);

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
