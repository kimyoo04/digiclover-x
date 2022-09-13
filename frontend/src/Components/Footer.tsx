import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 300px;
  background-color: ${(props) => props.theme.bgColor};
  padding: 40px;
`;

const Logo = styled.img``;

const InfoWrap = styled.div``;

const CompanyName = styled.span`
  color: ${(props) => props.theme.textWhiteColor};
`;
const PersonInfo = styled.span`
  color: ${(props) => props.theme.textWhiteColor};
`;
const BusinessNumber = styled.span`
  color: ${(props) => props.theme.textWhiteColor};
`;
const PhoneNumber = styled.span`
  color: ${(props) => props.theme.textWhiteColor};
`;
const CopyRight = styled.span`
  color: ${(props) => props.theme.textWhiteColor};
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

const Footer = () => {
  const now = new Date();
  const nowYear = now.getFullYear();

  return (
    <Wrapper>
      <Logo />
      <InfoWrap>
        <Col>
          <CompanyName>LeLi</CompanyName>
        </Col>
        <Col>
          <PersonInfo>대표자 : 임혜수 | 정보관리 책임자 : 이상문</PersonInfo>
        </Col>
        <Col>
          <BusinessNumber>법인사업자등록번호 : 882-81-01394</BusinessNumber>
        </Col>
        <Col>
          <PhoneNumber></PhoneNumber>
        </Col>
        <Col>
          <CopyRight>Copyright © {nowYear} LeLi. All Rights Reserved</CopyRight>
        </Col>
      </InfoWrap>
    </Wrapper>
  );
};

export default Footer;
