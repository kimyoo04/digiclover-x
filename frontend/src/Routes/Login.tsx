import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import AuthDataService from "services/auth";

import styled from "styled-components";
import Button from "Components/style/buttons";
import {
  Wrapper,
  FormWrapper,
  ILogInForm,
  Label,
  ErrorMessage,
  Input,
} from "Components/style/auth";
import {Col, Row} from "Components/style/layout";
import {useAppDispatch, useAppSelector} from "app/hook";
import {authActions} from "features/auth/authSlice";

const HookForm = styled.form`
  margin-bottom: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SnsLogin = styled.span`
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
`;

const KakaoBtn = styled(Button)`
  background-color: #fae100;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

const GoogleBtn = styled(Button)`
  background-color: ${(props) => props.theme.GoogleBtrColor};
  color: ${(props) => props.theme.GoogleTextColor};
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

const GoogleImg = styled.img`
  position: relative;
  left: 8px;
`;

const GoHomeText = styled.span`
  display: block;
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Login = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  function goHome() {
    navigate(`/`);
  }

  const kakaoLogin = () => {
    window.open("http://localhost:8001/auth/kakao", "_self");
  };

  const googleLogin = () => {
    window.open("http://localhost:8001/auth/google", "_self");
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<ILogInForm>({
    defaultValues: {},
  });

  const onValid = (data: ILogInForm) => {
    // 데이터베이스에 존재하는 유저인지 조회
    AuthDataService.login(data)
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/"));
  };

  return isAuthenticated ? (
    <Wrapper>
      <div>
        <GoHomeText>you are already logged in!</GoHomeText>
        <Button onClick={goHome}>Go Home</Button>
      </div>
    </Wrapper>
  ) : (
    <Wrapper>
      <FormWrapper>
        <HookForm onSubmit={handleSubmit(onValid)}>
          <Col>
            <Row>
              <Label htmlFor="email">Email</Label>
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "Only emails allowed",
                },
              })}
              placeholder="Email"
              name="email"
              type="text"
              autoComplete="" // 추후 설정
            />
          </Col>

          <Col>
            <Row>
              <Label htmlFor="password">Password</Label>
              <ErrorMessage>{errors?.password?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Your password have to be longer than 5.",
                },
              })}
              placeholder="Password"
              name="password"
              type="password"
              autoComplete="" // 추후 설정
            />
          </Col>

          <ErrorMessage>{errors?.extraError?.message}</ErrorMessage>
          <Button>Login</Button>
        </HookForm>
        <ButtonWrapper>
          <SnsLogin>SNS Login</SnsLogin>
          <KakaoBtn onClick={kakaoLogin}>Sign in with Kakao</KakaoBtn>
          <GoogleBtn onClick={googleLogin}>
            <GoogleImg />
            Sign in with Google
          </GoogleBtn>
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

export default Login;
