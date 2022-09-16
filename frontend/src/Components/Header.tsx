import {Link, Outlet, PathMatch, useMatch} from "react-router-dom";
import {motion} from "framer-motion";
import {useRecoilState} from "recoil";
import {isLoggedInState} from "atom/userAtom";

import styled from "styled-components";
import logo from "public/assets/img/logo.png";

const Nav = styled.ul`
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
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
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
  font-weight: 600;
  line-height: 20px;
  font-size: 18px;
`;

const ActiveLink = styled(motion(UnactiveLink))`
  color: ${(props) => props.theme.primaryBlueColor};
`;

const LogoutButton = styled.button`
  font-weight: 600;
  line-height: 20px;
  font-size: 18px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  function onlogOut() {
    setIsLoggedIn(false);
  }

  const documentMatch: PathMatch<string> | null = useMatch("/document/start");
  const storageMatch: PathMatch<string> | null = useMatch("/storage");
  const loginMatch: PathMatch<string> | null = useMatch("/login");
  const signinMatch: PathMatch<string> | null = useMatch("/signin");
  const profileMatch: PathMatch<string> | null = useMatch("/profile");

  return (
    <>
      <Nav>
        <Link to="/">
          <Logo src={logo} />
        </Link>
        <Item>
          <Link to="/document/start">
            {documentMatch ? (
              <ActiveLink>문서 작성</ActiveLink>
            ) : (
              <UnactiveLink>문서 작성</UnactiveLink>
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
        {isLoggedIn ? (
          <>
            <Item>
              <Link to="/profile">
                {profileMatch ? (
                  <ActiveLink>내 정보</ActiveLink>
                ) : (
                  <UnactiveLink>내 정보</UnactiveLink>
                )}
              </Link>
            </Item>
            <Item>
              <LogoutButton onClick={onlogOut}>로그아웃</LogoutButton>
            </Item>
          </>
        ) : (
          <>
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
          </>
        )}
      </Nav>
      <Outlet />
    </>
  );
};

export default Header;
