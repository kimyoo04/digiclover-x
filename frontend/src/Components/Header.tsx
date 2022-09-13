import {Link, useMatch} from "react-router-dom";
import styled from "styled-components";
import {motion} from "framer-motion";
import logo from "../public/assets/img/logo.png";

const Nav = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 100;
  & Link {
    font-style: none;
  }
`;

const Logo = styled.img`
  width: 190px;
  height: 40px;
  margin: 0 30px 0 0;
`;

const Item = styled.li`
  margin: 4px 20px 0 0;
  color: ${(props) => props.theme.textWhiteColor};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.textWhiteColor};
  }
`;

const UnactiveLink = styled.span`
  font-weight: 500;
  line-height: 20px;
  font-size: 18px;
`;

const ActiveLink = styled(motion(UnactiveLink))`
  color: ${(props) => props.theme.primaryBlueColor};
`;

const Header = () => {
  const documentMatch = useMatch("/document");
  const signatureMatch = useMatch("/signature");
  const storageMatch = useMatch("/storage");
  const loginMatch = useMatch("/login");
  const signinMatch = useMatch("/signin");

  return (
    <Nav>
      <Link to="/">
        <Logo src={logo} />
      </Link>
      <Item>
        <Link to="/document">
          {documentMatch ? (
            <ActiveLink>문서 작성</ActiveLink>
          ) : (
            <UnactiveLink>문서 작성</UnactiveLink>
          )}
        </Link>
      </Item>
      <Item>
        <Link to="/signature">
          {signatureMatch ? (
            <ActiveLink>문서 전송</ActiveLink>
          ) : (
            <UnactiveLink>문서 전송</UnactiveLink>
          )}
        </Link>
      </Item>
      <Item>
        <Link to="/storage">
          {storageMatch ? (
            <ActiveLink>문서 보관함</ActiveLink>
          ) : (
            <UnactiveLink>문서 보관함</UnactiveLink>
          )}
        </Link>
      </Item>
      <Item>
        <Link to="/login">
          {loginMatch ? (
            <ActiveLink>로그인</ActiveLink>
          ) : (
            <UnactiveLink>로그인</UnactiveLink>
          )}
        </Link>
      </Item>
      <Item>
        <Link to="/signin">
          {signinMatch ? (
            <ActiveLink>회원가입</ActiveLink>
          ) : (
            <UnactiveLink>회원가입</UnactiveLink>
          )}
        </Link>
      </Item>
    </Nav>
  );
};

export default Header;
