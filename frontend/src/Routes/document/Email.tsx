import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {useRecoilValue} from "recoil";
import {docuAllState, IContractor} from "atom/documentAtom";

import styled from "styled-components";
import Button from "Components/style/buttons";
import {Wrapper} from "Components/style/layout";
import ContractorCard from "Components/Document/ContractorCard";
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
  font-weight: 500;
  margin-bottom: 20px;
  color: ${(props) => props.theme.textColor};
`;

const AgreeInput = styled.input`
  margin-left: 20px;
`;

const Email = () => {
  const navigate = useNavigate();
  function prevClick() {
    navigate(-1);
  }
  function finishClick() {
    // 동의 확인 경고창 - 동의 확인 후 /storage 로 navigate
    if (isCheck) {
      // atom 데이터 저장

      // 모든 프로세스 종료 후 navigate
      navigate(`/storage`);
    } else {
      setAlert((prev) => !prev);
    }
  }

  const docuAll = useRecoilValue(docuAllState);
  console.log(docuAll);

  const [isCheck, setIsCheck] = useState(false);
  const [alert, setAlert] = useState(false);

  function toggleChecking() {
    setIsCheck((prev) => !prev);
  }
  function toggleAlert() {
    setAlert((prev) => !prev);
  }

  const alertMessage = {
    alertType: "Warning",
    content: "이메일 전송 및 개인정보 이용 동의를 체크해 주세요.",
  };

  return (
    <Wrapper>
      <Main>
        {docuAll.contractors.map((contractor: IContractor, index: number) => {
          return <ContractorCard key={index} {...contractor} />;
        })}
        <AgreeLabel htmlFor="agree">
          이메일 전송 및 개인정보 이용 동의
          <AgreeInput id="agree" type="checkbox" onChange={toggleChecking} />
        </AgreeLabel>
        <ButtonWrapper>
          <Button
            onClick={prevClick}
            whileHover={{scale: 1.1}}
            transition={{duration: 0.05}}
          >
            Prev
          </Button>
          <Button
            onClick={finishClick}
            whileHover={{scale: 1.1}}
            transition={{duration: 0.05}}
          >
            Finish
          </Button>
        </ButtonWrapper>

        {alert ? (
          <Alert alertMessage={alertMessage} toggleAlert={toggleAlert} />
        ) : null}
      </Main>
    </Wrapper>
  );
};

export default Email;
