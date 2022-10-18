// modules
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
// redux-toolkit
import {useAppDispatch, useAppSelector} from "@app/hook";
// components
import {
  Wrapper,
  FormWrapper,
  ILogInForm,
  ErrorMessage,
  Input,
} from "@components/Auth/authStyle";
import {Col, Row} from "@components/layout";
import AuthHeader from "@components/Auth/AuthHeader";
import Button from "@components/Style/buttons";
// style
import {
  ButtonWrapper,
  GoHomeText,
  GoogleBtn,
  GoogleImg,
  HookForm,
  SignupLink,
} from "./SigninStyle";
// firebase
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {authService, dbService} from "src/fbase";
import {addDoc, collection} from "firebase/firestore";

const Signin = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  function goHome() {
    navigate(`/`);
  }

  const googleLogin = () => {
    // -------------------------------------------
    const provider = new GoogleAuthProvider();

    // Google Signed in
    signInWithPopup(authService, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;

        // users docuement 생성
        const creatUser = async () => {
          await addDoc(collection(dbService, "users"), {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          });
        };
        creatUser();

        // 회원 정보 추가 입력 강요
        navigate("/");
        console.log("Google Signin \n", user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
    // -------------------------------------------
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ILogInForm>({
    defaultValues: {},
  });

  const onValid = (data: ILogInForm) => {
    // -------------------------------------------
    const {email, password} = data;

    // Signed in
    signInWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("Signin \n", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    // -------------------------------------------

    navigate("/");
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
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

export default Signin;
