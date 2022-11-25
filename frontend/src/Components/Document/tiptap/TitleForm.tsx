// modules
import {useForm} from "react-hook-form";
// redux-toolkit
import {useAppDispatch, useAppSelector} from "@app/hook";
import {documentActions} from "@features/document/documentSlice";
// types
import {IDocuTitle} from "@constants/types/document";
// style
import {Form, TitleInput} from "./TitleFormStyle";

interface IIsEditable {
  isEditable: boolean;
}

const TitleForm = ({isEditable}: IIsEditable) => {
  const dispatch = useAppDispatch();
  const docuTitle = useAppSelector((state) => state.document.docuTitle);

  const {register, handleSubmit} = useForm<IDocuTitle>({
    defaultValues: {},
  });

  const onValid = async (data: IDocuTitle) => {
    if (data) {
      console.log(data.docuTitle);
      dispatch(documentActions.afterWritingDocuTitle(data.docuTitle));
    } else {
      console.log("문서 제목을 입력해주세요.");
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
        defaultValue={docuTitle === "" ? "" : docuTitle}
        onChange={(data) => {
          dispatch(documentActions.saveDocuTitle(data.target.value));
        }}
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
