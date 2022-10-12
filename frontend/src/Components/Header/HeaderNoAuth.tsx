import {useEffect} from "react";
import {Outlet} from "react-router-dom";

import logo from "public/assets/img/logo.png";

import {useAppDispatch, useAppSelector} from "app/hook";
import {fetchRefresh} from "features/auth/authSlice";
import {Link} from "Components/Auth/auth";
import {useCheckMobile} from "hooks/useWindowDimensions";
import {AuthWrapper, LogInButton, Logo, Nav, SmallNav} from "./HeaderStyles";

const HeaderNoAuth = () => {
  // 620px 이하 사이즈 체크 기능
  const isMobile = useCheckMobile();

  // 로그인 상태 유지 기능
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // 페이지 방문 중인 동안 5분마다 토큰 refresh 하기
  useEffect(() => {
    dispatch(fetchRefresh());
    if (isAuthenticated) {
      let interval = setInterval(() => {
        dispatch(fetchRefresh());
      }, 1000 * 60 * 5);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <SmallNav>
          <Link to="/">
            <Logo src={logo} />
          </Link>

          <AuthWrapper>
            <Link to="/login">
              <LogInButton>로그인</LogInButton>
            </Link>
          </AuthWrapper>
        </SmallNav>
      ) : (
        <Nav>
          <div>
            <Link to="/">
              <Logo src={logo} />
            </Link>
          </div>

          <AuthWrapper>
            <Link to="/login">
              <LogInButton>로그인</LogInButton>
            </Link>
          </AuthWrapper>
        </Nav>
      )}
      <Outlet />
    </>
  );
};

export default HeaderNoAuth;
