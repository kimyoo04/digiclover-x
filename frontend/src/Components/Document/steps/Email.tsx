// modules
import {useState} from "react";
import {useNavigate} from "react-router-dom";
// redux-toolkit
import {useAppDispatch, useAppSelector} from "@app/hook";
import {documentActions} from "@features/document/documentSlice";
import {alertActions} from "@features/alert/alertSlice";
// types
import {IContractor} from "@constants/types/document";
// components
import Button from "@components/Style/buttons";
import EmailContractorCard from "@components/Document/EmailContractorCard";
// styles
import {
  AgreeInput,
  AgreeLabel,
  ButtonWrapper,
  EmailWrapper,
} from "./EmailStyle";

const Email = () => {
  const [isCheck, setIsCheck] = useState(false);
  const dispatch = useAppDispatch();
  const document = useAppSelector((state) => state.document);
  const navigate = useNavigate();

  const prevClick = () => dispatch(documentActions.beforeEmail());
  const finishClick = async () => {
    // 동의 확인 경고창 - 동의 확인 후 /storage 로 navigate
    if (isCheck) {
      // --------------------------------------------------------------------
      // 이메일 전송 비동기 처리하기

      // --------------------------------------------------------------------

      // --------------------------------------------------------------------
      // ongoing collection의 문서 전체 삭제

      // user collection의 ongoings 컬럼의 인덱스를 찾아서 삭제

      // --------------------------------------------------------------------

      // documentSlice의 state 초기화
      dispatch(documentActions.initialDocumentData());

      // 이메일 전송 후 뒤로가기 방지
      navigate(`/storage`, {replace: true});
    } else {
      dispatch(
        alertActions.alert({
          alertType: "Infomation",
          content: "이메일 전송 및 개인정보 이용 동의를 체크해 주세요.",
        })
      );
    }
  };

  const toggleChecking = () => setIsCheck((prev) => !prev);

  return (
    <EmailWrapper>
      {document.contractors.map((contractor: IContractor, index: number) => {
        return <EmailContractorCard key={index} {...contractor} />;
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
    </EmailWrapper>
  );
};

export default Email;
