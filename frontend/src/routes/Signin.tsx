// modules
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// components
import {
  Wrapper,
  FormWrapper,
  ErrorMessage,
  Input,
} from "@components/Auth/authStyle";
import {Col, Row} from "@components/layout";
import AuthHeader from "@components/Auth/AuthHeader";
import Button from "@components/Style/buttons";
// style
import {
  ButtonWrapper,
  FacebookBtn,
  FacebookImg,
  GoHomeText,
  GoogleBtn,
  GoogleImg,
  HookForm,
  KakaoBtn,
  KakaoImg,
  SignupLink,
} from "./SigninStyle";
// types
import {ILogInForm} from "@constants/types/auth";
// firebase
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import {authService} from "src/fbase";

const Signin = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  function goHome() {
    navigate(`/`);
  }

  // -------------------------------------------
  const googleLogin = () => {
    // Google Signed in
    const provider = new GoogleAuthProvider();
    signInWithRedirect(authService, provider);
  };
  const facebookLogin = () => {
    // Google Signed in
    const provider = new FacebookAuthProvider();
    signInWithRedirect(authService, provider);
  };
  const kakaoLogin = () => {
    // Google Signed in
    const provider = new OAuthProvider("oidc.kakao");
    signInWithRedirect(authService, provider);
  };
  // -------------------------------------------

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ILogInForm>({
    defaultValues: {},
  });

  const onValid = (data: ILogInForm) => {
    const {email, password} = data;

    // -------------------------------------------
    // Signed in
    signInWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // 이메일 인증 유무 확인
        if (user.emailVerified) {
          navigate("/");
        } else {
          navigate("/signin");
          alert("이메일 안증이 필요합니다. 이메일 보관함을 확인하세요.");
          throw new Error("이메일 인증을 하지 않았습니다.");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message, errorCode, errorMessage);
      });
    // -------------------------------------------
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
      <AuthHeader />
      <FormWrapper>
        {/* 이메일 비밀번호 로그인 */}
        <HookForm onSubmit={handleSubmit(onValid)}>
          {/* 이메일 */}
          <Col>
            <Row>
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

          {/* 비밀번호 */}
          <Col>
            <Row>
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
          <Button>Sign in</Button>
        </HookForm>

        {/* 회원가입 링크 */}
        <SignupLink to="/signup">
          <span>회원가입하기</span>
        </SignupLink>

        {/* Oauth 로그인*/}
        <ButtonWrapper>
          <GoogleBtn onClick={googleLogin}>
            <GoogleImg />
            Sign in with Google
          </GoogleBtn>
          {/* <FacebookBtn onClick={facebookLogin}>
            <FacebookImg />
            Sign in with Facebook
          </FacebookBtn>
          <KakaoBtn onClick={kakaoLogin}>
            <KakaoImg />
            Sign in with Kakao
          </KakaoBtn> */}
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

export default Signin;
