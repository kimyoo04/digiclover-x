import {PathMatch, useMatch} from "react-router-dom";
import {motion} from "framer-motion";

import styled from "styled-components";

const Nav = styled.ul`
  position: fixed;
  top: 0;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

  width: 100%;
  height: 6vh;
  padding: 0 30px;

  color: white;
  font-size: 14px;

  background-color: ${(props) => props.theme.bgColor};
  z-index: 100;
  & Link {
    font-style: none;
  }
`;

const Item = styled.li`
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${(props) => props.theme.textColor};
`;

const UnactiveLink = styled.span`
  font-weight: 700;
  line-height: 20px;
  font-size: 18px;
`;

const ActiveLink = styled(motion(UnactiveLink))`
  color: ${(props) => props.theme.primaryBlueColor};
`;

const ArrowIcon = styled(motion.i)`
  font-size: 24px;
  color: ${(props) => props.theme.textColor};
`;

const DocumentHeader = () => {
  const contractorMatch: PathMatch<string> | null = useMatch(
    "/document/contractor"
  );
  const docuselectMatch: PathMatch<string> | null = useMatch(
    "/document/docuselect"
  );
  const writeMatch: PathMatch<string> | null = useMatch("/document/write");
  const signningMatch: PathMatch<string> | null =
    useMatch("/document/signning");
  const emailMatch: PathMatch<string> | null = useMatch("/document/email");

  return (
    <Nav>
      <Item>
        {contractorMatch ? (
          <ActiveLink>계약자 정보 입력</ActiveLink>
        ) : (
          <UnactiveLink>계약자 정보 입력</UnactiveLink>
        )}
      </Item>
      <ArrowIcon className="ri-arrow-right-s-fill"></ArrowIcon>
      <Item>
        {docuselectMatch ? (
          <ActiveLink>문서 선택</ActiveLink>
        ) : (
          <UnactiveLink>문서 선택</UnactiveLink>
        )}
      </Item>
      <ArrowIcon className="ri-arrow-right-s-fill"></ArrowIcon>
      <Item>
        {writeMatch ? (
          <ActiveLink>문서 작성</ActiveLink>
        ) : (
          <UnactiveLink>문서 작성</UnactiveLink>
        )}
      </Item>
      <ArrowIcon className="ri-arrow-right-s-fill"></ArrowIcon>
      <Item>
        {signningMatch ? (
          <ActiveLink>서명</ActiveLink>
        ) : (
          <UnactiveLink>서명</UnactiveLink>
        )}
      </Item>
      <ArrowIcon className="ri-arrow-right-s-fill"></ArrowIcon>
      <Item>
        {emailMatch ? (
          <ActiveLink>이메일 전송</ActiveLink>
        ) : (
          <UnactiveLink>이메일 전송</UnactiveLink>
        )}
      </Item>
    </Nav>
  );
};

export default DocumentHeader;
