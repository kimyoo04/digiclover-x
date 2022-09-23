import {FC} from "react";
import {Text} from "Components/style/text";
import {ISignatureData} from "services/document";
import styled from "styled-components";

const DateText = styled(Text)`
  display: block;
  color: ${(props) => props.theme.textWhiteColor};
`;

const HText = styled(Text)`
  display: block;
  color: ${(props) => props.theme.textWhiteColor};
  font-weight: 700;
`;

const SignatureImg = styled.img`
  width: 200px;
  height: 100px;
`;

const ModalLogging = ({user}: {user: ISignatureData}) => {
  return (
    <>
      <HText>요청자 서명 날짜</HText>
      <DateText>서명 날짜{user.updatedAt}</DateText>
      <SignatureImg>{user.imgUrl}</SignatureImg>
    </>
  );
};

export default ModalLogging;
/* modalData[index].updatedAt */
/* modalData[index].imgUrl */
