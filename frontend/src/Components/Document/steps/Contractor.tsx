import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useFieldArray, useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "app/hook";
import {documentActions} from "features/document/documentSlice";

import styled from "styled-components";
import Button from "Components/Style/buttons";
import {ErrorMessage, FormWrapper, Input} from "Components/Document/document";
import {Row} from "Components/layout";

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
  align-items: center;
  margin-bottom: 0.4rem;

  & span {
    color: ${(props) => props.theme.textWhiteColor};
    font-weight: 700;
  }

  & button {
    background-color: transparent;
    border: none;
    padding: 0;

    & i {
      font-size: 20px;
      font-weight: 700;
      color: ${(props) => props.theme.textWhiteColor};
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

const ContractorInput = styled(Input)``;

const Contractor = () => {
  // 버튼 4명까지 추가 되도록 설정
  const [person, setPerson] = useState(0);
  const personName = ["갑", "을", "병", "정"];

  const dispatch = useAppDispatch();
  const isBack = useAppSelector((state) => state.document.isBack);

  const navigate = useNavigate();

  // 이전 페이지 이동 버튼
  const prevClick = () => {
    navigate(-1);
  };

  // documentSlice의 state 초기화
  useEffect(() => {
    if (isBack === false) dispatch(documentActions.initialDocumentData());
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
      contractor: [{companyName: "", name: "", email: ""}],
    },
  });

  // contractor 추가 버튼 기능
  const {fields, append, remove} = useFieldArray({
    control,
    name: "contractor",
  });

  // form의 submit 이후 기능
  const onValid = async (data: any) => {
    if (!data) {
    } else {
      const watchResult = watch("contractor");
      console.log(watchResult);
      dispatch(documentActions.afterContractors(watchResult));
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onValid)}>
        {fields.map((item, index) => {
          return (
            <ContractorWrapper key={item.id}>
              <InputHeader>
                <span>{personName[index]}</span>
                <button type="button" onClick={() => remove(index)}>
                  <i className="ri-close-fill"></i>
                </button>
              </InputHeader>

              <li>
                <Row key={`Row${item.companyName}`}>
                  <ErrorMessage>
                    {errors.contractor?.[index]?.companyName?.message}
                  </ErrorMessage>
                </Row>
                <ContractorInput
                  {...register(`contractor.${index}.companyName`, {
                    required: "Company name is required",
                    maxLength: {
                      value: 20,
                      message: "Your Company name is too long.",
                    },
                  })}
                  placeholder="회사명"
                  name={`contractor.${index}.companyName`}
                  type="text"
                />
              </li>

              <li>
                <Row key={`Row${item.name}`}>
                  <ErrorMessage>
                    {errors.contractor?.[index]?.name?.message}
                  </ErrorMessage>
                </Row>
                <ContractorInput
                  {...register(`contractor.${index}.name`, {
                    required: "Name is required",
                  })}
                  placeholder="성명"
                  name={`contractor.${index}.name`}
                  type="text"
                />
              </li>

              <li>
                <Row key={`Row${item.email}`}>
                  <ErrorMessage>
                    {errors?.contractor?.[index]?.email?.message}
                  </ErrorMessage>
                </Row>
                <ContractorInput
                  {...register(`contractor.${index}.email`, {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                      message: "Only emails allowed",
                    },
                  })}
                  placeholder="이메일"
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
                email: "",
              });

              setPerson((person) => person + 1);
            }}
            disabled={person === 3}
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
            onClick={() => {
              reset({
                contractor: [{companyName: "", name: "", email: ""}],
              });
              setPerson(0);
            }}
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
  );
};

export default Contractor;