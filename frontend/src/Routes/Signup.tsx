// modules
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
// components
import Button from "@components/Style/buttons";
import {
  Wrapper,
  FormWrapper,
  ErrorMessage,
  Input,
} from "@components/Auth/authStyle";
import {Col, Row} from "@components/layout";
import AuthHeader from "@components/Auth/AuthHeader";
// types
import {ISignInForm} from "@constants/types/auth";
// firebase
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import {authService} from "src/fbase";
// controllers
import {postLocalUserDoc} from "@controllers/users.controller";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
    reset,
  } = useForm<ISignInForm>({
    defaultValues: {},
  });

  const onValid = (data: ISignInForm) => {
    if (data.password !== data.passwordCheck) {
      setError(
        "passwordCheck",
        {message: "Password are not the same"},
        {shouldFocus: true}
      );
    } else {
      // -------------------------------------------
      const {company, name, email, password, phone} = data;

      // Sign Up (local)
      createUserWithEmailAndPassword(authService, email, password)
        .then(async (userCredential) => {
          // 유저 정보
          const user = userCredential.user;
          // displayName 저장
          await updateProfile(user, {displayName: name});
          // user doc 생성
          postLocalUserDoc(user, company, name, email, phone).catch((error) =>
            console.log(error)
          );

          // 인증 이메일 전송
          sendEmailVerification(user).then(() => {
            navigate("/");
            alert("회원가입 인증 이메일을 보냈습니다.");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorCode, errorMessage);
          navigate("/signin");
        });
      // -------------------------------------------
    }
  };

  return (
    <Wrapper>
      <AuthHeader />
      <FormWrapper>
        <form onSubmit={handleSubmit(onValid)}>
          <Col>
            <Row>
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("email", {
                required: "Email is required",
                validate: {
                  onlyEmail: (value) => {
                    return (
                      [
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                      ].every((pattern) => pattern.test(value)) ||
                      "Only emails allowed"
                    );
                  },
                  notGmail: (value) => {
                    return (
                      [
                        /^[a-z0-9](\.?[a-z0-9]){5,}((?!@g(oogle)?mail\.com).)*$/i,
                      ].every((pattern) => pattern.test(value)) ||
                      "gmail is not allowed"
                    );
                  },
                },
              })}
              placeholder="* Email"
              name="email"
              type="email"
              maxLength={35}
            />
          </Col>

          <Col>
            <Row>
              <ErrorMessage>{errors?.company?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("company", {
                required: "company Name is required",
              })}
              placeholder="* company Name"
              name="company"
              type="text"
              maxLength={35}
            />
          </Col>

          <Col>
            <Row>
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("name", {
                required: "Name is required",
              })}
              placeholder="* Name"
              name="name"
              type="text"
              maxLength={25}
            />
          </Col>

          <Col>
            <Row>
              <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("phone", {
                onChange: (e) => {
                  if (e.target.value.length === 10) {
                    reset({
                      phone: e.target.value.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        "$1-$2-$3"
                      ),
                    });
                  }
                  if (e.target.value.length === 13) {
                    reset({
                      phone: e.target.value
                        .replace(/-/g, "")
                        .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
                    });
                  }
                },
                required: "Phone number is required",
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: "Only phone number allowed",
                },
              })}
              placeholder="* Phone (000-0000-0000)"
              name="phone"
              type="tel"
              maxLength={13}
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
                  value: 6,
                  message: "Your password have to be longer than 5.",
                },
                maxLength: {
                  value: 16,
                  message: "Your password have to be shorter than 17.",
                },
              })}
              placeholder="* Password (longer than 5)"
              name="password"
              type="password"
            />
          </Col>

          <Col>
            <Row>
              <div></div>
              <ErrorMessage>{errors?.passwordCheck?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("passwordCheck", {
                required: "Checking password is required",
              })}
              placeholder="* Password Check"
              name="passwordCheck"
              type="password"
            />
          </Col>

          <ErrorMessage>{errors?.extraError?.message}</ErrorMessage>
          <Button>Signup</Button>
        </form>
      </FormWrapper>
    </Wrapper>
  );
};

export default Signup;
