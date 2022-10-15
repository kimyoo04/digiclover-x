// modules
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
// redux-toolkit
import {useAppSelector} from "@app/hook";
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
} from "./SigninStyle";
// firebase
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Signin = () => {
  // const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  function goHome() {
    navigate(`/`);
  }

  // const kakaoLogin = () => {
  //   window.open("http://localhost:8001/auth/kakao", "_self");
  // };

  const googleLogin = () => {
    // window.open("http://localhost:8001/auth/google", "_self");

    // -------------------------------------------
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
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
    // 데이터베이스에 존재하는 유저인지 조회
    // dispatch(fetchLogin(data));

    // -------------------------------------------
    const {email, password} = data;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("Signin \n", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
        <HookForm onSubmit={handleSubmit(onValid)}>
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
