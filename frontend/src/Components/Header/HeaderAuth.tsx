// modules
import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
// public
import logo from "@public/assets/img/logo.png";
import logoShort from "@public/assets/img/logo-short.png";
// redux-toolkit
import {useAppDispatch, useAppSelector} from "@app/hook";
import {fetchLogout, fetchRefresh} from "@features/auth/authSlice";
import {useCheckMobile} from "@hooks/useWindowDimensions";
// components
import {Link} from "@components/Auth/authStyle";
import DropDownMenu from "@components/Header/DropDownMenu";
import DropDownAlarm from "@components/Header/DropDownAlarm";
import {
  AuthWrapper,
  Logo,
  LogoShort,
  LogOutButton,
  MenuWrapper,
  Nav,
  SmallNav,
} from "./HeaderStyles";

const HeaderAuth = () => {
  const navigate = useNavigate();

  // 620px 이하 사이즈 체크 기능
  const isMobile = useCheckMobile();

  // 로그인 상태 유지 기능
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // 로그아웃 기능
  function onlogOut() {
    navigate(`/`);
    dispatch(fetchLogout());
  }

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
          <div>
            <DropDownMenu />
          </div>
          <div>
            <Link to="/">
              <LogoShort src={logoShort} />
            </Link>
          </div>
          <AuthWrapper>
            <DropDownAlarm />
            <LogOutButton onClick={onlogOut}>로그아웃</LogOutButton>
          </AuthWrapper>
        </SmallNav>
      ) : (
        <Nav>
          <MenuWrapper>
            <Link to="/">
              <Logo src={logo} />
            </Link>
            <Link to="/document/start">
              <i className="ri-edit-2-line"></i> 문서 작성
            </Link>
            <Link to="/storage">
              <i className="ri-suitcase-line"></i>문서 보관함
            </Link>
            <Link to="/profile">
              <i className="ri-settings-2-line"></i>회원정보
            </Link>
          </MenuWrapper>

          <AuthWrapper>
            <DropDownAlarm />
            <LogOutButton onClick={onlogOut}>로그아웃</LogOutButton>
          </AuthWrapper>
        </Nav>
      )}
      <Outlet />
    </>
  );
};

export default HeaderAuth;
