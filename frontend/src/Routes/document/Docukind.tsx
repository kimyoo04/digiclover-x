import styled from "styled-components";
import Button from "Components/style/buttons";
import {
  ErrorMessage,
  FormWrapper,
  IDocukindForm,
  Input,
  Label,
  Wrapper,
} from "Components/style/document";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

const FormRadioWrapper = styled(FormWrapper)`
  width: 40vw;
`;

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
  background-color: white;
  border-radius: 6px;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
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
  let navigate = useNavigate();
  function prevClick() {
    navigate(-1);
  }

  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<IDocukindForm>({
    defaultValues: {},
  });

  const onValid = (data: IDocukindForm) => {
    if (!data.docukind) {
      setError("docukind", {message: "Please click one of these."});
    } else {
      // form data 저장하는 곳
      navigate(`/document/writing`);
    }
  };

  return (
    <Wrapper>
      <FormRadioWrapper>
        <Form id="docukindForm" onSubmit={handleSubmit(onValid)}>
          <RadioLabel htmlFor="free-form">
            <RadioInput
              {...register("docukind")}
              id="free-form"
              type="radio"
              value="자유양식"
            />
            <Span>자유양식</Span>
          </RadioLabel>

          <RadioLabel htmlFor="mou">
            <RadioInput
              {...register("docukind")}
              id="mou"
              type="radio"
              value="MOU"
            />
            <Span>MOU</Span>
          </RadioLabel>
          <RadioLabel htmlFor="labor-contract">
            <RadioInput
              {...register("docukind")}
              id="labor-contract"
              type="radio"
              value="근로계약서"
            />
            <Span>근로계약서</Span>
          </RadioLabel>
          <RadioLabel htmlFor="dept-ack">
            <RadioInput
              {...register("docukind")}
              id="dept-ack"
              type="radio"
              value="차용증"
            />
            <Span>차용증</Span>
          </RadioLabel>
        </Form>
        <ButtonWrapper>
          <Button onClick={prevClick}>Prev</Button>
          <Button form="docukindForm">Next</Button>
        </ButtonWrapper>
      </FormRadioWrapper>
      <ErrorMessage>{errors?.docukind?.message}</ErrorMessage>
    </Wrapper>
  );
};

export default Docukind;
