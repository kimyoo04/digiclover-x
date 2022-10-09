import styled from "styled-components";
// import logo from "public/assets/img/logo.png";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 6vh;
  background-color: ${(props) => props.theme.bgColor};
`;
const InfoWrap = styled.div`
  display: flex;
  flex-grow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const CompanyName = styled.div`
  display: block;
  color: ${(props) => props.theme.textColor};
  font-size: 1rem;
  white-space: nowrap;
`;

const PersonInfo = styled(CompanyName)``;
const BusinessNumber = styled(CompanyName)``;
const PhoneNumber = styled(CompanyName)``;
const CopyRight = styled(CompanyName)``;

const Footer = () => {
  const now = new Date();
  const nowYear = now.getFullYear();

  return (
    <Wrapper>
      {/* <Logo src={logo} /> */}
      <InfoWrap>
        <CompanyName>LeLi</CompanyName>
        <PersonInfo>대표자 : 임혜수 | 정보관리 책임자 : 이상문</PersonInfo>
        <BusinessNumber>법인사업자등록번호 : 882-81-01394</BusinessNumber>
        <PhoneNumber>010-0000-1111</PhoneNumber>
        <CopyRight>Copyright © {nowYear} LeLi. All Rights Reserved</CopyRight>
      </InfoWrap>
    </Wrapper>
  );
};

export default Footer;
