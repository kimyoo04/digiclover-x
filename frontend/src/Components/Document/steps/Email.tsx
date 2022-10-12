import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "app/hook";
import {documentActions, IContractor} from "features/document/documentSlice";

import styled from "styled-components";
import Button from "Components/Style/buttons";
import ContractorCard from "Components/Document/ContractorCard";
import Alert from "Components/Util/Alert";
import DocumentDataService from "services/document";
import {alertActions} from "features/alert/alertSlice";

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
  const [isCheck, setIsCheck] = useState(false);
  const isAlert = useAppSelector((state) => state.alert.isAlert);
  const dispatch = useAppDispatch();
  const document = useAppSelector((state) => state.document);
  const navigate = useNavigate();

  const prevClick = () => dispatch(documentActions.beforeEmail());
  const finishClick = async () => {
    // 동의 확인 경고창 - 동의 확인 후 /storage 로 navigate
    if (isCheck) {
      // 이곳에 이메일 전송 비동기 처리하기

      // 문서 튜플 저장, 계약자별 서명 튜플 저장
      await DocumentDataService.createOneDocument(document);

      // documentSlice의 state 초기화
      dispatch(documentActions.initialDocumentData());

      navigate(`/storage`, {replace: true}); // 이메일 전송 후 뒤로가기 방지
    } else {
      dispatch(
        alertActions.alert({
          alertType: "Warning",
          content: "이메일 전송 및 개인정보 이용 동의를 체크해 주세요.",
        })
      );
    }
  };

  const toggleChecking = () => setIsCheck((prev) => !prev);

  return (
    <Main>
      {document.contractors.map((contractor: IContractor, index: number) => {
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

      {isAlert ? <Alert /> : null}
    </Main>
  );
};

export default Email;
