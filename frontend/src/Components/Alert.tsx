import styled from "styled-components";
import {motion} from "framer-motion";
import {useState, useEffect} from "react";

//--------------------------------------------------------------------------------
// alertType - 알림의 종류, 제목, 아이콘, 색깔을 설정
// content - 알림의 내용을 설정
//--------------------------------------------------------------------------------
interface IAlert {
  alertType: string;
  content: string;
}

const AlertItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 140px;
  margin-top: 100px;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
`;

const AlertBar = styled.div`
  width: 6px;
  height: 100%;
  background-color: ${(props) =>
    props.color ? props.color : props.theme.grayscale2Color};
`;

const AlertIcon = styled.i`
  font-size: 40px;
  color: ${(props) =>
    props.color ? props.color : props.theme.grayscale2Color};
`;

const AlertWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const AlertTitle = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: ${(props) =>
    props.color ? props.color : props.theme.grayscale2Color};
  margin-bottom: 10px;
`;

const AlertContent = styled.span`
  width: 300px;
  font-weight: 500;
  color: ${(props) =>
    props.color ? props.color : props.theme.grayscale2Color};
`;

const CloseIcon = styled.i`
  font-size: 40px;
  color: ${(props) => props.theme.grayscale2Color};
  margin-right: 20px;
`;

const Alert = (alertMessage: IAlert) => {
  const [alertIcon, setAlertIcon] = useState(<div></div>);
  const [alertBar, setAlertBar] = useState(<div></div>);

  // message.alertType 별 분기 처리 및 컴포넌트 할당
  useEffect(() => {
    switch (alertMessage.alertType) {
      case "Success":
        setAlertIcon(
          <AlertIcon
            className="ri-checkbox-circle-fill"
            color="#219653"
          ></AlertIcon>
        );
        setAlertBar(<AlertBar color="#219653"></AlertBar>);
        break;
      case "Warning":
        setAlertIcon(
          <AlertIcon
            className="ri-error-warning-fill"
            color="#F2C94C"
          ></AlertIcon>
        );
        setAlertBar(<AlertBar color="#F2C94C"></AlertBar>);
        break;
      case "Danger":
        setAlertIcon(
          <AlertIcon
            className="ri-close-circle-fill"
            color="#EB5757"
          ></AlertIcon>
        );
        setAlertBar(<AlertBar color="#EB5757"></AlertBar>);
        break;
      case "Infomation":
        setAlertIcon(
          <AlertIcon
            className="ri-information-fill"
            color="#2F80ED"
          ></AlertIcon>
        );
        setAlertBar(<AlertBar color="#2F80ED"></AlertBar>);
        break;
      default:
        setAlertIcon(<AlertIcon>?</AlertIcon>);
        setAlertBar(<AlertBar></AlertBar>);
    }
  }, []);

  return (
    <AlertItem
      initial={{opacity: 0, scale: 0.5}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3}}
    >
      {alertBar}
      {alertIcon}
      <AlertWrapper>
        <AlertTitle>{alertMessage.alertType}</AlertTitle>
        <AlertContent>{alertMessage.content}</AlertContent>
      </AlertWrapper>
      <CloseIcon className="ri-close-fill"></CloseIcon>
    </AlertItem>
  );
};

export default Alert;