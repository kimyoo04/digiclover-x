import styled from "styled-components";
import {useForm} from "react-hook-form";
import Button from "Components/style/buttons";
import {
  Wrapper,
  FormWrapper,
  IForm,
  Label,
  ErrorMessage,
  Input,
} from "Components/style/auth";
import {Col, Row} from "Components/style/layout";

const HookForm = styled.form`
  margin-bottom: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const TextLogin = styled.span`
  color: white;
  font-size: 14px;
`;

const KakaoBtn = styled(Button)`
  background-color: #fae100;
`;

const GmailBtn = styled(Button)`
  background-color: white;
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<IForm>({
    defaultValues: {},
  });

  const onValid = (data: IForm) => {
    // 데이터베이스에 존재하는 유저인지 조회
  };

  return (
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

          <ErrorMessage>{errors?.extraError?.message}</ErrorMessage>
          <Button>Login</Button>
        </HookForm>
        <ButtonWrapper>
          <TextLogin>SNS Login</TextLogin>
          <KakaoBtn>Kakao Login</KakaoBtn>
          <GmailBtn>Gmail Login</GmailBtn>
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

export default Login;
