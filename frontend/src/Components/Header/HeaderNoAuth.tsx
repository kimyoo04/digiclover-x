// modules
import {useEffect} from "react";
import {Outlet} from "react-router-dom";
// public
import logo from "@public/assets/img/logo.png";
// redux-toolkit
import {useAppDispatch, useAppSelector} from "@app/hook";
import {useCheckMobile} from "@hooks/useWindowDimensions";
// components
import {Link} from "@components/Auth/authStyle";
import {
  AuthWrapper,
  LogInButton,
  Logo,
  Nav,
  SmallNav,
} from "@components/Header/HeaderStyles";

const HeaderNoAuth = () => {
  // 620px 이하 사이즈 체크 기능
  const isMobile = useCheckMobile();

  // 로그인 상태 유지 기능
  const dispatch = useAppDispatch();

  return (
    <>
      {isMobile ? (
        <SmallNav>
          <Link to="/">
            <Logo src={logo} />
          </Link>

          <AuthWrapper>
            <Link to="/signin">
              <LogInButton>Signin</LogInButton>
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
            <Link to="/signin">
              <LogInButton>Signin</LogInButton>
            </Link>
          </AuthWrapper>
        </Nav>
      )}
      <Outlet />
    </>
  );
};

export default HeaderNoAuth;
