import {useForm} from "react-hook-form";
import Input from "Components/style/inputs";
import Button from "Components/style/buttons";
import {
  Wrapper,
  FormWrapper,
  IForm,
  Label,
  ErrorMessage,
} from "Components/style/auth";
import {Col, Row} from "Components/style/layout";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<IForm>({
    defaultValues: {},
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.passwordCheck) {
      setError(
        "passwordCheck",
        {message: "Password are not the same"},
        {shouldFocus: true}
      );
    }
  };

  return (
    <Wrapper>
      <FormWrapper>
        <form onSubmit={handleSubmit(onValid)}>
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
            />
          </Col>

          <Col>
            <Row>
              <Label htmlFor="name">Name</Label>
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("name", {required: "Name is required"})}
              placeholder="Name"
              name="name"
            />
          </Col>

          <Col>
            <Row>
              <Label htmlFor="phone">Phone</Label>
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
              type="phone"
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

export default Signin;
