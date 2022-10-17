// modules
import styled from "styled-components";
// components
import {Text} from "@components/Style/text";
import moment from "moment";

const LogginWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  & div:first-child {
    align-items: flex-start;

    font-weight: 500;
  }

  & div:first-child {
    align-items: flex-start;
  }
`;

const DateText = styled(Text)`
  display: block;
  color: ${(props) => props.theme.textWhiteColor};
`;

const HText = styled(Text)`
  display: block;
  color: ${(props) => props.theme.textWhiteColor};
  font-size: 18px;
  font-weight: 700;
`;

const SignatureImg = styled.img`
  width: 200px;
  height: 100px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;

interface IMergedDataArr {
  id: string;
  DocumentId: string;

  isSigned: boolean;
  hashValue: string;
  imgUrl: string;

  createdAt?: number;
  updatedAt?: number;

  UserId: string;
  uid: string;
  company: string;
  email: string;
  phone: string;
  name: string;
}

const ModalLogging = ({data}: {data: IMergedDataArr}) => {
  return (
    <LogginWrapper>
      <UserInfoWrapper>
        <div>
          <span>Company :</span>
          <span>Email :</span>
          <span>Phone :</span>
          <span>Name :</span>
        </div>
        <div>
          <span>{data.company}</span>
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.name}</span>
        </div>
      </UserInfoWrapper>

      {data.isSigned ? (
        <>
          {/* 서명 일시 */}
          {/* updatedAt이 없는 경우 요청자의 createdAt이 서명 일시임 */}
          {data.updatedAt ? (
            // 수신자
            <>
              <HText>수신자 서명 일시</HText>
              <DateText>
                {moment.utc(data.updatedAt).format("YYYY-MM-DD LT")}
              </DateText>
              <HText>요청 일시</HText>
              <DateText>
                {moment.utc(data.createdAt).format("YYYY-MM-DD LT")}
              </DateText>
            </>
          ) : (
            // 요청자
            <>
              <HText>요청자 서명 일시</HText>
              <DateText>
                {moment.utc(data.createdAt).format("YYYY-MM-DD LT")}
              </DateText>
            </>
          )}

          {/* 서명 이미지 */}
          <HText>서명 이미지</HText>
          <SignatureImg src={data.imgUrl || undefined} alt={`signature`} />
        </>
      ) : (
        <>
          <DateText>미완료</DateText>
        </>
      )}
    </LogginWrapper>
  );
};

export default ModalLogging;
/* modalData[index].updatedAt */
/* modalData[index].imgUrl */
