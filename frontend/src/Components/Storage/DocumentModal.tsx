import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import Button from "Components/style/buttons";
import {Text} from "Components/style/text";
import {AnimatePresence, motion} from "framer-motion";
import {useNavigate, useParams} from "react-router-dom";
import DocumentDataService, {IModalData} from "services/document";
import styled from "styled-components";
import ModalLogging from "./ModalLogging";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;

const Modal = styled(motion.div)`
  position: absolute;
  width: 44vw;
  height: 70vh;
  left: 0;
  right: 0;
  margin: auto auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgWhiteColor};
`;

const DateText = styled(Text)`
  display: block;
  color: ${(props) => props.theme.textWhiteColor};
`;

const HText = styled(Text)`
  display: block;
  color: ${(props) => props.theme.textWhiteColor};
  font-weight: 700;
`;

// props로 클릭한 문서의 정보 받아오기
const DocumentModal = () => {
  const navigate = useNavigate();
  const {id} = useParams(); // documentId를 활용해서 Signature 조회?

  // 아래 signature에서 받아올 데이터 형태
  const {data: modalData, isLoading: isModalDataLoading} = useQuery<IModalData>(
    ["modalData"],
    () => DocumentDataService.getOneDocument(id)
  );
  return (
    <AnimatePresence>
      {isModalDataLoading || modalData ? (
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
              <Button>문서 보기</Button>
              <HText>문서 생성일</HText>
              <DateText>{modalData && modalData.createdAt}</DateText>
              <DateText>1999.10.01</DateText>
              {modalData &&
                [0, 1, 2, 3].forEach((i) =>
                  modalData[i] ? <ModalLogging user={modalData[i]} /> : null
                )}
            </>
          </Modal>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default DocumentModal;
