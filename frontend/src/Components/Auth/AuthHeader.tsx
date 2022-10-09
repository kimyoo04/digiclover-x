import styled from "styled-components";
import {Text} from "Components/Style/text";
import logo from "public/assets/img/logo.png";
import {AuthWrapper, Link} from "./auth";

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
