// modules
import styled from "styled-components";
// services
import {ISignatureData} from "@services/document";
// components
import {Text} from "@components/Style/text";

const LogginWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
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

const ModalLogging = ({user}: {user: ISignatureData}) => {
  return (
    <LogginWrapper>
      <HText>요청자 로그 기록</HText>

      {user.isSigned ? (
        <>
          <HText>서명 이미지</HText>
          <SignatureImg src={user.imgUrl || undefined} alt={`signature`} />
          <HText>서명 일시</HText>
          <DateText>{user.updatedAt}</DateText>
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
