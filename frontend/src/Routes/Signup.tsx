import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import AuthDataService from "services/auth";

import Button from "Components/Style/buttons";
import {
  Wrapper,
  FormWrapper,
  ISignInForm,
  Label,
  ErrorMessage,
  Input,
} from "Components/Auth/auth";
import {Col, Row} from "Components/layout";
import AuthHeader from "Components/Auth/AuthHeader";

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
    }
    console.log(data);
    AuthDataService.createOneUser(data);
    navigate(`/login`);
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
              placeholder="Email"
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
              placeholder="company Name"
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
              placeholder="Name"
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
              placeholder="Phone"
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
              placeholder="Password"
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
              placeholder="Password Check"
              name="passwordCheck"
              type="password"
            />
          </Col>

          <ErrorMessage>{errors?.extraError?.message}</ErrorMessage>
          <Button>Signin</Button>
        </form>
      </FormWrapper>
    </Wrapper>
  );
};

export default Signup;
