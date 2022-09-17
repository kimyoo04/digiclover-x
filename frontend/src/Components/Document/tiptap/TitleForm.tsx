import {docuTitleState, IDocuTitle} from "atom/documentAtom";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import styled from "styled-components";

const Form = styled.form``;

const TitleInput = styled.input`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  border: none;
  margin-bottom: 40px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
  }
`;

interface IIsEditable {
  isEditable: boolean;
}

const TitleForm = ({isEditable}: IIsEditable) => {
  const navigate = useNavigate();
  const [{docuTitle}, setDocuTitle] = useRecoilState(docuTitleState);

  const {register, handleSubmit} = useForm<IDocuTitle>({
    defaultValues: {},
  });

  const onValid = async (data: IDocuTitle) => {
    if (!data) {
    } else {
      console.log(data);
      // atom 데이터 저장
      setDocuTitle(data);
      navigate(`/document/signning`);
    }
  };

  // isEditable으로 제목용 input readonly 토글
  return isEditable ? (
    <Form id="docuTitleForm" onSubmit={handleSubmit(onValid)}>
      <TitleInput
        {...register("docuTitle", {
          required: "Title is required",
          maxLength: {
            value: 30,
            message: "Title is too long.",
          },
        })}
        placeholder="Write a title"
        name="docuTitle"
        type="text"
        defaultValue={""}
      />
    </Form>
  ) : (
    <Form id="docuTitleForm" onSubmit={handleSubmit(onValid)}>
      <TitleInput
        {...register("docuTitle", {
          required: "Title is required",
          maxLength: {
            value: 30,
            message: "Title is too long.",
          },
        })}
        placeholder="Write a title"
        name="docuTitle"
        type="text"
        readOnly
        defaultValue={docuTitle}
      />
    </Form>
  );
};

export default TitleForm;
