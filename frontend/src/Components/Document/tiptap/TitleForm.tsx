import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "app/hook";
import {documentActions, IDocuTitle} from "features/document/documentSlice";

const Form = styled.form`
  width: 100%;
`;

const TitleInput = styled.input`
  /* 추후 종단점 별 Text Editor 폭 수정 */
  width: 100%;
  padding: 80px 20px 30px 20px;

  font-size: 24px;
  font-weight: 700;
  text-align: center;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: none;

  z-index: 10;

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
  const dispatch = useAppDispatch();
  const docuTitle = useAppSelector((state) => state.document.docuTitle);
  const navigate = useNavigate();

  const {register, handleSubmit} = useForm<IDocuTitle>({
    defaultValues: {},
  });

  const onValid = async (data: IDocuTitle) => {
    if (!data) {
    } else {
      console.log(data.docuTitle);
      dispatch(documentActions.afterWritingDocuTitle(data.docuTitle));
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
        autoComplete="off"
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
        autoComplete="off"
      />
    </Form>
  );
};

export default TitleForm;
