import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useFieldArray, useForm} from "react-hook-form";

import {useAppDispatch} from "app/hook";
import {documentActions} from "features/document/documentSlice";

import styled from "styled-components";
import Button from "Components/style/buttons";
import {
  ErrorMessage,
  FormWrapper,
  Label,
  Input,
} from "Components/style/document";
import {Row, Wrapper} from "Components/style/layout";

const ContractorWrapper = styled.ul`
  background-color: ${(props) => props.theme.bgWhiteColor};
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;

  & li {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const InputHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & span {
    color: ${(props) => props.theme.textAcentColor};
    font-weight: 700;
  }

  & button {
    background-color: transparent;
    border: none;

    & i {
      font-size: 20px;
      font-weight: 700;
      color: ${(props) => "#222222"};
      cursor: pointer;
    }
  }
`;

const EditButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const PlusButton = styled(Button)`
  background-color: ${(props) => props.theme.primaryBlueColor};
  & i {
    font-size: 20px;
  }
`;
const ResetButton = styled(Button)`
  background-color: white;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const Contractor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function prevClick() {
    navigate(-1); // 지우기
  }

  // documentSlice의 state 초기화
  useEffect(() => {
    dispatch(documentActions.initialDocumentData());
  }, []);

  // 계약자 정보 받는 리액트-훅-폼
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      contractor: [{companyName: "", name: "", contractorPhone: "", email: ""}],
    },
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: "contractor",
  });

  const onValid = async (data: any) => {
    if (!data) {
    } else {
      const watchResult = watch("contractor");
      console.log(watchResult);
      dispatch(documentActions.afterContractors(watchResult));
      navigate(`/document/docukind`);
    }
  };

  return (
    <Wrapper>
      <FormWrapper>
        <form onSubmit={handleSubmit(onValid)}>
          {fields.map((item, index) => {
            return (
              <ContractorWrapper key={item.id}>
                <InputHeader>
                  <span>{index + 1}</span>
                  <button type="button" onClick={() => remove(index)}>
                    <i className="ri-close-fill"></i>
                  </button>
                </InputHeader>

                <li>
                  <Row key={`Row${item.companyName}`}>
                    <Label htmlFor="companyName">회사명</Label>
                    <ErrorMessage>
                      {errors.contractor?.[index]?.companyName?.message}
                    </ErrorMessage>
                  </Row>
                  <Input
                    {...register(`contractor.${index}.companyName`, {
                      required: "Company name is required",
                      maxLength: {
                        value: 20,
                        message: "Your Company name is too long.",
                      },
                    })}
                    placeholder="Leli 주식회사"
                    name={`contractor.${index}.companyName`}
                    type="text"
                  />
                </li>

                <li>
                  <Row key={`Row${item.name}`}>
                    <Label htmlFor="name">Name</Label>
                    <ErrorMessage>
                      {errors.contractor?.[index]?.name?.message}
                    </ErrorMessage>
                  </Row>
                  <Input
                    {...register(`contractor.${index}.name`, {
                      required: "Name is required",
                    })}
                    placeholder="홍길동"
                    name={`contractor.${index}.name`}
                    type="text"
                  />
                </li>

                <li>
                  <Row key={`Row${item.contractorPhone}`}>
                    <Label htmlFor="contractorPhone">Phone</Label>
                    <ErrorMessage>
                      {errors?.contractor?.[index]?.contractorPhone?.message}
                    </ErrorMessage>
                  </Row>
                  <Input
                    {...register(`contractor.${index}.contractorPhone`, {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\d{3}-\d{3,4}-\d{4}$/,
                        message: "Only phone number allowed",
                      },
                    })}
                    placeholder="010-0000-0000"
                    name={`contractor.${index}.contractorPhone`}
                    type="tel"
                  />
                </li>

                <li>
                  <Row key={`Row${item.email}`}>
                    <Label htmlFor="email">Email</Label>
                    <ErrorMessage>
                      {errors?.contractor?.[index]?.email?.message}
                    </ErrorMessage>
                  </Row>
                  <Input
                    {...register(`contractor.${index}.email`, {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                        message: "Only emails allowed",
                      },
                    })}
                    placeholder="korea@leli.xyz"
                    name={`contractor.${index}.email`}
                    type="email"
                  />
                </li>
              </ContractorWrapper>
            );
          })}

          <EditButtonWrapper>
            {/* append */}
            <PlusButton
              type="button"
              name="append"
              whileHover={{scale: 1.1}}
              transition={{duration: 0.05}}
              onClick={() => {
                append({
                  companyName: "",
                  name: "",
                  contractorPhone: "",
                  email: "",
                });
              }}
            >
              <i className="ri-add-line"></i>
            </PlusButton>

            {/* reset */}
            <ResetButton
              color="#fff"
              type="button"
              name="reset"
              whileHover={{scale: 1.1}}
              transition={{duration: 0.05}}
              onClick={() =>
                reset({
                  contractor: [
                    {companyName: "", name: "", contractorPhone: "", email: ""},
                  ],
                })
              }
            >
              reset
            </ResetButton>
          </EditButtonWrapper>

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
