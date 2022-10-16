// modules
import {useNavigate, useParams} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import styled from "styled-components";
// services
import {ISignatureData} from "@services/document";
// components
import Button from "@components/Style/buttons";
import {Text} from "@components/Style/text";
import ModalLogging from "@components/Storage/Modal/ModalLogging";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {dbService} from "src/fbase";
import {IUser} from "@features/auth/authSlice";
import {getAuth} from "firebase/auth";

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
const InfoWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

const InfoText = styled(Text)`
  display: block;
  color: ${(props) => props.theme.textWhiteColor};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 6px 0 6px 40px;
`;

const DocuButton = styled(Button)`
  width: 100%;
  height: 100%;
  font-size: 18px;
`;

const HText = styled(Text)`
  display: block;
  font-size: 18px;
  color: ${(props) => props.theme.textWhiteColor};
  font-weight: 700;
`;

// props로 클릭한 문서의 정보 받아오기
const DocumentModal = () => {
  const [signaturesData, setSignaturesData] = useState<ISignatureData[] | null>(
    null
  );
  const [usersData, setUsersData] = useState<IUser[] | null>(null);
  const navigate = useNavigate();
  let {id} = useParams();
  console.log("DocumentId", id);

  useEffect(() => {
    const getSignaturesData = async () => {
      // DocumentId로 이루어진 배열로 쿼리 생성
      if (id) {
        const q = query(
          collection(dbService, "signatures"),
          where("DocumentId", "==", id)
        );
        // DocumentId로 이루어진 배열로 쿼리 생성
        onSnapshot(q, (snapshot) => {
          const dataArr: any = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          }));
          setSignaturesData(dataArr);
        });
      }
    };
    const getUsersData = async () => {};

    // 함수 호출
    getSignaturesData().catch((error) => console.log(error));
    getUsersData().catch((error) => console.log(error));
  }, []);

  console.log(signaturesData);
  console.log(usersData);

  return (
    <AnimatePresence>
      {signaturesData ? (
        <>
          <Overlay
            onClick={() => navigate("/storage")}
            exit={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{durationL: 0.2}}
          />
          <Modal
            exit={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{durationL: 0.2}}
          >
            <>
              <DocumentWrapper>
                <InfoWrapper>
                  {/* <HText>문서 제목</HText>
                  <InfoText>{modalData && modalData.docuTitle}</InfoText>
                  <HText>문서 생성일</HText>
                  <InfoText>{modalData && modalData.createdAt}</InfoText> */}
                </InfoWrapper>
                <ButtonWrapper>
                  <DocuButton>문서 보기</DocuButton>
                </ButtonWrapper>
              </DocumentWrapper>

              {signaturesData &&
                [0, 1, 2, 3].map(
                  (index) =>
                    signaturesData[index] && (
                      <ModalLogging key={index} user={signaturesData[index]} />
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
