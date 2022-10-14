// modules
import styled from "styled-components";
// public
import logo from "@public/assets/img/logo.png";
// auth
import {AuthWrapper, Link} from "./auth";
// components
import {Text} from "@components/Style/text";

const Logo = styled.img`
  width: 190px;
  height: 40px;
  margin-bottom: 20px;
`;

const AuthHeader = () => {
  return (
    <>
      <Link to="/">
        <Logo src={logo} />
      </Link>
      <AuthWrapper>
        <Link to="/login">로그인</Link>
        <Text>|</Text>
        <Link to="/signin">회원가입</Link>
      </AuthWrapper>
    </>
  );
};

export default AuthHeader;
