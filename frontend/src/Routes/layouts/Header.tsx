import {NavLink} from "react-router-dom";
import {motion} from "framer-motion";
import {useRecoilState} from "recoil";
import {isAuthenticatedState} from "atom/userAtom";

import styled from "styled-components";
import logo from "public/assets/img/logo.png";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  color: white;
  font-size: 14px;
  padding: 20px 30px;
  background-color: ${(props) => props.theme.bgColor};
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

const Link = styled(NavLink)`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  line-height: 20px;
  font-size: 18px;
  &.active {
    color: ${(props) => props.theme.primaryBlueColor};
  }
`;

const LogoutButton = styled(motion.span)`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  line-height: 20px;
  font-size: 18px;
  cursor: pointer;
`;

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedState);

  function onlogOut() {
    setIsAuthenticated(false);
  }

  return (
    <Nav>
      <Link to="/">
        <Logo src={logo} />
      </Link>
      <Link to="/document">문서 작성</Link>
      <Link to="/storage">문서 보관함</Link>
      {isAuthenticated ? (
        <>
          <Link to="/profile">내 정보</Link>
          <LogoutButton onClick={onlogOut}>로그아웃</LogoutButton>
        </>
      ) : (
        <>
          <Link to="/login">로그인</Link>
          <Link to="/signin">회원가입</Link>
        </>
      )}
    </Nav>
  );
};

export default Header;
