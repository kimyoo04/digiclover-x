// modules
import moment from "moment";
// types
import {IModalDataArr} from "@constants/types/modal";
// styles
import {
  DateText,
  HText,
  SignatureImg,
  UserInfoWrapper,
  Wrapper,
} from "./LoggingStyles";

const Logging = ({data}: {data: IModalDataArr}) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Logging;
/* modalData[index].updatedAt */
/* modalData[index].imgUrl */
