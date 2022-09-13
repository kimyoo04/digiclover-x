import styled from "styled-components";
// import logo from "public/assets/img/logo.png";

const Wrapper = styled.div`
  width: 100vw;
  background-color: ${(props) => props.theme.bgColor};
  padding: 40px;
`;

// const Logo = styled.img`
//   width: 160px;
//   height: 34px;
// `;

const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CompanyName = styled.span`
  color: ${(props) => props.theme.textWhiteColor};
  font-size: 12px;
`;
const PersonInfo = styled(CompanyName)``;
const BusinessNumber = styled(CompanyName)``;
const PhoneNumber = styled(CompanyName)``;
const CopyRight = styled(CompanyName)``;

const Row = styled.div`
  display: inline;
  margin-right: 14px;
`;

const Footer = () => {
  const now = new Date();
  const nowYear = now.getFullYear();

  return (
    <Wrapper>
      {/* <Logo src={logo} /> */}
      <InfoWrap>
        <Row>
          <CompanyName>LeLi</CompanyName>
        </Row>
        <Row>
          <PersonInfo>대표자 : 임혜수 | 정보관리 책임자 : 이상문</PersonInfo>
        </Row>
        <Row>
          <BusinessNumber>법인사업자등록번호 : 882-81-01394</BusinessNumber>
        </Row>
        <Row>
          <PhoneNumber>010-0000-1111</PhoneNumber>
        </Row>
        <Row>
          <CopyRight>Copyright © {nowYear} LeLi. All Rights Reserved</CopyRight>
        </Row>
      </InfoWrap>
    </Wrapper>
  );
};

export default Footer;
