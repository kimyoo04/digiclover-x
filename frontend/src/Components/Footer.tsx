import styled from "styled-components";
import {breakpoints} from "./Util/breakPoints";
import logo from "public/assets/img/logo.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  width: 100vw;
  margin-top: -0.1rem;
  padding: 3rem;
  background-color: ${(props) => props.theme.bgColor};
  ${breakpoints("align-items", "", [{200: "center"}, {800: "flex-start"}])}
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  & img {
    width: 16.5rem;
    height: 3.2rem;
  }

  & span {
    display: block;

    color: ${(props) => props.theme.textColor};
    font-size: 2rem;
    font-weight: 700;
    white-space: nowrap;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoints("align-items", "", [{200: "center"}, {800: "flex-start"}])}
  gap: 0.2rem;
`;
const SNSWrapper = styled.div`
  display: flex;
  ${breakpoints("align-items", "", [{200: "center"}, {800: "flex-start"}])}
  gap: 1rem;

  i {
    color: ${(props) => props.theme.textColor};
    font-size: 2.4rem;
  }
`;

const PersonInfo = styled.span`
  display: block;
  color: ${(props) => props.theme.textColor};
  font-size: 1.2rem;
  white-space: nowrap;
`;
const BusinessNumber = styled(PersonInfo)``;
const PhoneNumber = styled(PersonInfo)``;
const CopyRight = styled(PersonInfo)``;

const Footer = () => {
  const now = new Date();
  const nowYear = now.getFullYear();

  return (
    <Wrapper>
      <LogoWrapper>
        <img src={logo} alt={logo} />
        <span>|</span>
        <span>LeLi</span>
      </LogoWrapper>
      <InfoWrapper>
        <PersonInfo>대표자 : 임혜수 | 정보관리 책임자 : 이상문</PersonInfo>
        <BusinessNumber>법인사업자등록번호 : 882-81-01394</BusinessNumber>
        <PhoneNumber>대표자번호 : 010-0000-1111</PhoneNumber>
      </InfoWrapper>
      <SNSWrapper>
        <i className="ri-medium-fill"></i>
        <i className="ri-linkedin-box-fill"></i>
        <i className="ri-facebook-fill"></i>
        <i className="ri-instagram-fill"></i>
        <i className="ri-twitter-fill"></i>
      </SNSWrapper>
      <div>
        <CopyRight>Copyright © {nowYear} LeLi. All Rights Reserved</CopyRight>
      </div>
    </Wrapper>
  );
};

export default Footer;
