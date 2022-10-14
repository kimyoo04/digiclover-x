// modules
import {useQuery} from "react-query";
import {useNavigate, useParams} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import styled from "styled-components";
// services
import DocumentDataService, {IModalData} from "@services/document";
// components
import Button from "@components/Style/buttons";
import {Text} from "@components/Style/text";
import ModalLogging from "@components/Storage/ModalLogging";

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
  const navigate = useNavigate();
  let {id} = useParams();
  console.log("id", id);
  // 아래 signature에서 받아올 데이터 형태
  const {data: modalData, isLoading: isModalDataLoading} = useQuery<IModalData>(
    ["modalData"],
    () => DocumentDataService.getOneDocument(id)
  );

  console.log(modalData);

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
              <DocumentWrapper>
                <InfoWrapper>
                  <HText>문서 제목</HText>
                  <InfoText>{modalData && modalData.docuTitle}</InfoText>
                  <HText>문서 생성일</HText>
                  <InfoText>{modalData && modalData.createdAt}</InfoText>
                </InfoWrapper>
                <ButtonWrapper>
                  <DocuButton>문서 보기</DocuButton>
                </ButtonWrapper>
              </DocumentWrapper>

              {modalData &&
                [0, 1, 2, 3].map(
                  (index) =>
                    modalData[index] && (
                      <ModalLogging key={index} user={modalData[index]} />
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
