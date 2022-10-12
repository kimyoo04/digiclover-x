import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";

import styled from "styled-components";
import logo from "public/assets/img/logo.png";
import logoShort from "public/assets/img/logo-short.png";

import {useAppDispatch, useAppSelector} from "app/hook";
import {fetchLogout, fetchRefresh} from "features/auth/authSlice";
import {Link} from "Components/Auth/auth";
import DropDownMenu from "./DropDownMenu";
import {useCheckMobile} from "hooks/useWindowDimensions";
import DropDownAlarm from "./DropDownAlarm";

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

  z-index: 2;
`;

const SmallNav = styled.div`
  position: fixed;
  top: 0;

  display: flex;
  align-items: center;

  width: 100%;
  padding: 20px 30px;
  background-color: ${(props) => props.theme.bgColor};

  color: white;

  z-index: 100;

  & div {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  & div:first-child {
    margin-right: auto;
    justify-content: flex-start;
  }

  & div:last-child {
    margin-left: auto;
    justify-content: flex-end;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.4rem;
`;

const Logo = styled.img`
  width: 16.4rem;
  height: 3.4rem;
  margin-right: 0.2rem;
`;

const LogoShort = styled.img`
  width: 3.4rem;
  height: 3.4rem;
`;

export const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  & i {
    color: ${(props) => props.theme.textColor};
    font-size: 2rem;
  }
`;

const LogOutButton = styled.span`
  display: block;
  padding: 0.4rem 1.2rem;

  border-radius: 1.6rem;
  background: linear-gradient(
    90deg,
    rgba(33, 236, 145, 1) 0%,
    rgba(46, 163, 229, 1) 100%
  );

  color: ${(props) => props.theme.textColor};
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 20px;

  cursor: pointer;
  white-space: nowrap;
`;

const LogInButton = styled(LogOutButton)``;

const HeaderLayout = () => {
  // 620px 이하 사이즈 체크 기능
  const isMobile = useCheckMobile();

  // 로그인 상태 유지 기능
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();

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
          {isAuthenticated ? (
            <>
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
            </>
          ) : (
            <>
              <Link to="/">
                <Logo src={logo} />
              </Link>

              <AuthWrapper>
                <Link to="/login">
                  <LogInButton>로그인</LogInButton>
                </Link>
              </AuthWrapper>
            </>
          )}
        </SmallNav>
      ) : (
        <Nav>
          {isAuthenticated ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </Nav>
      )}
      <Outlet />
    </>
  );
};

export default HeaderLayout;
