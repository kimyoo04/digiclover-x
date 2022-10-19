// modules
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import styled from "styled-components";
import * as _ from "lodash";
// services
import {ISignatureData} from "@constants/types/document";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// types
import {IUser} from "@constants/types/user";
// components
import Button from "@components/Style/buttons";
import ModalLogging from "@components/Storage/Modal/ModalLogging";
// firebase
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 100;
`;

const Modal = styled(motion.div)`
  position: absolute;
  width: 44vw;
  height: 70vh;
  left: 0;
  right: 0;
  margin: auto auto;
  padding: 30px;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgWhiteColor};
  z-index: 100;
`;

const DocumentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 40px;
`;

const DocuButton = styled(Button)`
  width: 100%;
  height: 100%;
  font-size: 18px;
`;

// props로 클릭한 문서의 정보 받아오기
const DocumentModal = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  // get signatures, users data
  const [signaturesData, setSignaturesData] = useState<ISignatureData[]>([]);
  const [usersData, setUsersData] = useState<IUser[]>([]);
  let {id} = useParams();

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
            onClick={() => navigate("/storage")}
            exit={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2}}
          />
          <Modal
            exit={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2}}
          >
            <>
              <DocumentWrapper>
                <DocuButton>문서 보기</DocuButton>
              </DocumentWrapper>

              {signaturesData &&
                mergedDataArr &&
                [0, 1, 2, 3].map(
                  (index) =>
                    mergedDataArr[index] && (
                      <ModalLogging key={index} data={mergedDataArr[index]} />
                    )
                )}
            </>
          </Modal>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default DocumentModal;
