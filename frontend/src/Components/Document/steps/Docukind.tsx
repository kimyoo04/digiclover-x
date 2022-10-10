import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "app/hook";
import {DocuKind, documentActions} from "features/document/documentSlice";

import styled from "styled-components";
import Button from "Components/Style/buttons";
import {
  ErrorMessage,
  FormWrapper,
  IDocuKindForm,
  Input,
  Label,
} from "Components/Document/document";

const FormRadioWrapper = styled(FormWrapper)``;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
  margin-bottom: 20px;
`;

const RadioLabel = styled(Label)`
  justify-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100px;
  margin: 0;

  background-color: white;
  border-radius: 6px;

  font-size: 22px;
  font-weight: 700;

  cursor: pointer;
`;

const Span = styled.span`
  transition: 0.2s;
`;

const RadioInput = styled(Input)`
  display: none;

  &:checked + Span {
    transform: scale(1.2);
    color: ${(props) => props.theme.primaryGreenColor};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const Docukind = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const contractors = useAppSelector((state) => state.document.contractors);
  console.log(contractors);

  const prevClick = () => {
    dispatch(documentActions.beforeDocukind());
  };

  // 문서 종류를 선택하는 리액트-훅-폼
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<IDocuKindForm>({
    defaultValues: {},
  });

  // 선택 했을 때만 다음 단계 이동
  const onValid = (data: {docuKind: DocuKind}) => {
    if (!data) {
      setError("docuKind", {message: "Please click one of these."});
    } else {
      console.log(data);
      // atom 데이터 저장
      dispatch(documentActions.afterDocukind(data.docuKind));
    }
  };

  return (
    <>
      <FormRadioWrapper>
        <Form id="docuKindForm" onSubmit={handleSubmit(onValid)}>
          <RadioLabel htmlFor="free-form">
            <RadioInput
              {...register("docuKind")}
              id="free-form"
              type="radio"
              value="자유양식"
            />
            <Span>자유양식</Span>
          </RadioLabel>

          <RadioLabel htmlFor="mou">
            <RadioInput
              {...register("docuKind")}
              id="mou"
              type="radio"
              value="MOU"
            />
            <Span>MOU</Span>
          </RadioLabel>

          <RadioLabel htmlFor="labor-contract">
            <RadioInput
              {...register("docuKind")}
              id="labor-contract"
              type="radio"
              value="근로계약서"
            />
            <Span>근로계약서</Span>
          </RadioLabel>

          <RadioLabel htmlFor="dept-ack">
            <RadioInput
              {...register("docuKind")}
              id="dept-ack"
              type="radio"
              value="차용증"
            />
            <Span>차용증</Span>
          </RadioLabel>
        </Form>

        <ButtonWrapper>
          <Button
            onClick={prevClick}
            whileHover={{scale: 1.1}}
            transition={{duration: 0.05}}
          >
            Prev
          </Button>
          <Button
            form="docuKindForm"
            whileHover={{scale: 1.1}}
            transition={{duration: 0.05}}
          >
            Next
          </Button>
        </ButtonWrapper>
      </FormRadioWrapper>
      <ErrorMessage>{errors?.docuKind?.message}</ErrorMessage>
    </>
  );
};

export default Docukind;
