import {motion} from "framer-motion";
import {useState} from "react";
import styled from "styled-components";

const DropDownWrapper = styled(motion.ul)`
  position: fixed;
  top: 64px;
  right: 2rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  background-color: white;
  border-radius: 0.6rem;

  width: 20rem;
  padding: 1.4rem;

  & li {
    border-bottom: 1px solid #d4d4d4;
    padding-bottom: 1rem;
    color: ${(props) => props.theme.textWhiteColor};

    & h1 {
      font-size: 1.4rem;
    }

    & span {
      font-size: 1.2rem;
    }
  }
`;

const AlarmIcon = styled(motion.i)`
  color: ${(props) => props.theme.textColor};
  font-size: 2rem;

  margin-right: 0.6rem;

  &.active {
    color: ${(props) => props.theme.primaryBlueColor};
  }
`;

const Overlay = styled.div`
  position: fixed;

  width: 100vw;
  height: 100vh;
`;

// localstorage 사용 시나리오 짜기
const alarms = [
  {title: "--------문서", content: "누구가 서명을 완료했습니다."},
  {title: "--------문서", content: "홍길동님이 서명을 거절했습니다."},
  {title: "--------문서", content: "서명기간이 만료되었습니다."},
  {title: "--------문서", content: "누구가 서명을 완료했습니다."},
];

const DropDownAlarm = () => {
  const [isView, setIsView] = useState(false);
  const variants = {
    closed: {opacity: 0, y: "-200%"},
    open: {opacity: 1, y: 0},
  };

  return (
    <>
      <AlarmIcon
        className={
          isView ? "ri-notification-4-line active" : "ri-notification-4-line"
        }
        whileHover={{scale: 1.1}}
        onClick={() => setIsView((prev) => !prev)}
      ></AlarmIcon>
      {isView ? (
        <Overlay onClick={() => setIsView((prev) => !prev)}></Overlay>
      ) : null}
      <DropDownWrapper
        initial={{opacity: 0}}
        animate={!isView ? "closed" : "open"}
        variants={variants}
      >
        {alarms.map((alarm) => (
          <li>
            <h1>{alarm.title}</h1>
            <span>{alarm.content}</span>
          </li>
        ))}
      </DropDownWrapper>
    </>
  );
};

export default DropDownAlarm;
