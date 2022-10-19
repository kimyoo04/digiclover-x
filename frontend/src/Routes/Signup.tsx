// modules
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
// components
import Button from "@components/Style/buttons";
import {
  Wrapper,
  FormWrapper,
  ISignInForm,
  ErrorMessage,
  Input,
} from "@components/Auth/authStyle";
import {Col, Row} from "@components/layout";
import AuthHeader from "@components/Auth/AuthHeader";
// firebase
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {authService, dbService} from "src/fbase";
import {addDoc, collection} from "firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
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

          // users docuement 생성
          const creatUser = async () => {
            await addDoc(collection(dbService, "users"), {
              uid: user.uid,
              company,
              name,
              email,
              phone,
              createdAt: Date.now() + 9 * 60 * 60 * 1000,
            });
          };
          creatUser().catch((error) => console.log(error));

          console.log("Signup \n", user);
          navigate("/");
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
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "Only emails allowed",
                },
                maxLength: {
                  value: 35,
                  message: "Your email is too long.",
                },
              })}
              placeholder="Email *"
              name="email"
              type="email"
            />
          </Col>

          <Col>
            <Row>
              <ErrorMessage>{errors?.company?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("company", {
                required: "company Name is required",
                maxLength: {
                  value: 35,
                  message: "company Name is too long.",
                },
              })}
              placeholder="company Name *"
              name="company"
              type="text"
            />
          </Col>

          <Col>
            <Row>
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 20,
                  message: "Your name is too long.",
                },
              })}
              placeholder="Name *"
              name="name"
              type="text"
            />
          </Col>

          <Col>
            <Row>
              <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: "Only phone number allowed",
                },
              })}
              placeholder="Phone *"
              name="phone"
              type="tel"
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
              placeholder="Password * (longer than 5)"
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
              placeholder="Password Check *"
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
