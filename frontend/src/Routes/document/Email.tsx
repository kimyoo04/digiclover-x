import styled from "styled-components";
import Button from "Components/style/buttons";
import {Wrapper} from "Components/style/document";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import ContractorCard from "Components/Document/ContractorCard";
import {motion} from "framer-motion";
import Alert from "Components/Alert";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

const AgreeLabel = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 20px;
`;

const AgreeInput = styled.input`
  margin-left: 20px;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

interface IContractor {
  companyName: string;
  name: string;
  phone: string;
  email: string;
}

const Email = () => {
  const [contractors, setContractors] = useState<IContractor[]>([]);
  const [isCheck, setIsCheck] = useState(false);
  const [alert, setAlert] = useState(false);

  // 임시 더미 데이터
  const dummy: IContractor[] = [
    {
      companyName: "Leli",
      name: "김유",
      phone: "010-8131-5224",
      email: "kimyoo04eco@naver.com",
    },
    {
      companyName: "가나다",
      name: "홍길동",
      phone: "010-1111-2222",
      email: "wow@gmail.com",
    },
  ];

  useEffect(() => {
    setContractors(dummy);
  }, []);

  let navigate = useNavigate();
  function prevClick() {
    navigate(-1);
  }
  function finishClick() {
    if (isCheck) {
      navigate(`/storage`);
    } else {
      setAlert((prev) => !prev);
    }
  }

  function toggleChecking() {
    setIsCheck((prev) => !prev);
  }

  const alertMessage = {
    alertType: "Warning",
    content: "이메일 전송 및 개인정보 이용 동의를 체크해 주세요.",
  };

  return (
    <Wrapper>
      <Main>
        {contractors.map((contractor: IContractor, index) => {
          return <ContractorCard key={index} {...contractor} />;
        })}
        <AgreeLabel htmlFor="agree">
          이메일 전송 및 개인정보 이용 동의
          <AgreeInput id="agree" type="checkbox" onChange={toggleChecking} />
        </AgreeLabel>
        <ButtonWrapper>
          <Button onClick={prevClick}>Prev</Button>
          <Button onClick={finishClick}>Finish</Button>
        </ButtonWrapper>

        {alert ? (
          <Overlay
            onClick={() => setAlert((prev) => !prev)}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.3}}
          >
            <Alert {...alertMessage} />
          </Overlay>
        ) : null}
      </Main>
    </Wrapper>
  );
};

export default Email;
