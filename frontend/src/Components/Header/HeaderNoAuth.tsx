// modules
import {Outlet} from "react-router-dom";
// public
import logo from "@public/assets/img/logo.png";
// redux-toolkit
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
// constants
import {appear} from "@constants/variants";

const HeaderNoAuth = () => {
  // 620px 이하 사이즈 체크 기능
  const isMobile = useCheckMobile();

  return (
    <>
      {isMobile ? (
        <SmallNav variants={appear} initial="initial" animate="in" exit="out">
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
        <Nav variants={appear} initial="initial" animate="in" exit="out">
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
