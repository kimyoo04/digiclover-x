import {useEffect} from "react";
import {Outlet, NavLink, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";

import styled from "styled-components";
import logo from "public/assets/img/logo.png";

import {useAppDispatch, useAppSelector} from "app/hook";
import {fetchLogout, fetchRefresh} from "features/auth/authSlice";
import {breakpoints} from "Components/Util/breakPoints";

const Nav = styled.nav`
  position: fixed;
  top: 0;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

  width: 100%;
  padding: 20px 30px;
  background-color: ${(props) => props.theme.bgColor};

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

const Link = styled(NavLink)`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  line-height: 20px;

  ${breakpoints("font-size", "rem", [
    {400: 1.0},
    {600: 1.2},
    {800: 1.4},
    {1200: 1.6},
  ])};

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

const HeaderLayout = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  function onlogOut() {
    navigate(`/`);
    dispatch(fetchLogout());
  }

  useEffect(() => {
    dispatch(fetchRefresh());
    if (isAuthenticated) {
      // 페이지 방문 중인 동안 5분마다 토큰 refresh 하기
      let interval = setInterval(() => {
        dispatch(fetchRefresh());
      }, 1000 * 60 * 5);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <>
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
      <Outlet />
    </>
  );
};

export default HeaderLayout;
