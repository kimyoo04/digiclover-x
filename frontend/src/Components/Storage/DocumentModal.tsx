import {AnimatePresence, motion} from "framer-motion";
import {PathMatch, useMatch, useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";

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

// props로 클릭한 문서의 정보 받아오기
const DocumentModal = () => {
  const navigate = useNavigate();
  const {id} = useParams(); // documentId를 활용해서 Signature 조회?
  const docuMatch: PathMatch<string> | null = useMatch("/storage/:id");
  const onOverlayClick = () => navigate("/storage");

  // 아래 signature에서 받아올 데이터 형태
  const signaturesData = [
    {
      id: 10,

      DocumentId: 5,
      UserId: 3,
      contractorPhone: "010-8131-5224",

      isSigned: 1,

      hashValue: "qwicmwl1289dj28091dj7y81h2hd1kshjkcbn1askasckljas",
      imgUrl: "12jildj12ijaw89adahscxlhckljq290cjaclkasjc2n",
    },
    {
      id: 11,

      DocumentId: 5,
      UserId: null,
      contractorPhone: "010-9999-9999",

      isSigned: 0,

      hashValue: null,
      imgUrl: null,
    },
  ];

  return (
    <AnimatePresence>
      {docuMatch ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{durationL: 0.2}}
          />
          <Modal
            exit={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{durationL: 0.2}}
          ></Modal>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default DocumentModal;
