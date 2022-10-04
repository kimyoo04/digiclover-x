import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "app/hook";
import {documentActions, IContractor} from "features/document/documentSlice";

import styled from "styled-components";
import Button from "Components/style/buttons";
import {
  ErrorMessage,
  FormWrapper,
  IContractorForm,
  Label,
  Input,
} from "Components/style/document";
import {Col, Row, Wrapper} from "Components/style/layout";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 32px;
`;

const PlusIcon = styled.i`
  font-size: 20px;
`;
const Contractor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function prevClick() {
    navigate(-1); // 지우기
  }

  // 1인 버전 끝난 후 수정할 것!
  function addContractor() {
    return null;
  }

  // documentSlice의 state 초기화
  useEffect(() => {
    dispatch(documentActions.initialContractors());
  }, []);

  // 계약자 정보 받는 리액트-훅-폼
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<IContractorForm>({
    defaultValues: {},
  });

  const onValid = async (data: IContractor) => {
    if (!data.companyName) {
      setError(
        "companyName",
        {message: "Password are not the same"},
        {shouldFocus: true}
      );
    } else {
      dispatch(documentActions.afterContractors([data]));
      navigate(`/document/docukind`);
    }
  };

  return (
    <Wrapper>
      <FormWrapper>
        <form onSubmit={handleSubmit(onValid)}>
          <Col>
            <Row>
              <Label htmlFor="companyName">회사명</Label>
              <ErrorMessage>{errors?.companyName?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("companyName", {
                required: "Company name is required",
                maxLength: {
                  value: 20,
                  message: "Your Company name is too long.",
                },
              })}
              placeholder="Leli 주식회사"
              name="companyName"
              type="text"
            />
          </Col>

          <Col>
            <Row>
              <Label htmlFor="name">Name</Label>
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("name", {required: "Name is required"})}
              placeholder="홍길동"
              name="name"
              type="text"
            />
          </Col>

          <Col>
            <Row>
              <Label htmlFor="contractorPhone">Phone</Label>
              <ErrorMessage>{errors?.contractorPhone?.message}</ErrorMessage>
            </Row>
            <Input
              {...register("contractorPhone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: "Only phone number allowed",
                },
              })}
              placeholder="010-0000-0000"
              name="contractorPhone"
              type="tel"
            />
          </Col>

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
              placeholder="korea@leli.xyz"
              name="email"
              type="email"
            />
          </Col>

          <ErrorMessage>{errors?.extraError?.message}</ErrorMessage>
          <Button
            onClick={() => addContractor()}
            whileHover={{scale: 1.1}}
            transition={{duration: 0.05}}
          >
            <PlusIcon className="ri-add-line"></PlusIcon>
          </Button>
          <ButtonWrapper>
            <Button
              onClick={prevClick}
              whileHover={{scale: 1.1}}
              transition={{duration: 0.05}}
            >
              Prev
            </Button>
            <Button whileHover={{scale: 1.1}} transition={{duration: 0.05}}>
              Next
            </Button>
          </ButtonWrapper>
        </form>
      </FormWrapper>
    </Wrapper>
  );
};

export default Contractor;
