// modules
import {useEffect, useState} from "react";
import {useScroll} from "framer-motion";
import {Outlet, useNavigate} from "react-router-dom";
// public
import logo from "@public/assets/img/logo.png";
import logoShort from "@public/assets/img/logo-short.png";
// redux-toolkit
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
// styles
import {appear} from "@constants/styles/variants";
// firebase
import {signOut} from "firebase/auth";
import {authService} from "src/fbase";
import Footer from "@components/Footer";

const HeaderAuth = () => {
  const {scrollY} = useScroll();
  const [hidden, setHidden] = useState(false);

  const navigate = useNavigate();

  // 620px 이하 사이즈 체크 기능
  const isMobile = useCheckMobile();

  // 로그아웃 기능
  function onlogOut() {
    navigate(`/signin`);
    signOut(authService);
  }

  function scrollNav() {
    if (scrollY.get() < scrollY.getPrevious()) {
      setHidden(false);
    } else if (scrollY.get() > 20 && scrollY.get() > scrollY.getPrevious()) {
      setHidden(true);
    }
  }

  useEffect(() => {
    return scrollY.onChange(() => scrollNav());
  });

  return (
    <>
      {isMobile ? (
        <SmallNav
          variants={appear}
          initial="initial"
          animate={hidden ? "hidden" : "in"}
          exit="out"
        >
          <div>
            <DropDownMenu />
          </div>
          <div>
            <Link to="/home">
              <LogoShort src={logoShort} />
            </Link>
          </div>
          <AuthWrapper>
            <DropDownAlarm />
            <LogOutButton onClick={onlogOut}>로그아웃</LogOutButton>
          </AuthWrapper>
        </SmallNav>
      ) : (
        <Nav
          variants={appear}
          initial="initial"
          animate={hidden ? "hidden" : "in"}
          exit="out"
        >
          <MenuWrapper>
            <Link to="/home">
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
      <Footer />
    </>
  );
};

export default HeaderAuth;
