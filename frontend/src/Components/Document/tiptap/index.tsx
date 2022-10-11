import "./tiptap.scss";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";

import styled from "styled-components";
import {
  freeForm,
  mouForm,
  laborForm,
  deptForm,
} from "Components/Document/docukind";

import {useAppDispatch, useAppSelector} from "app/hook";
import {documentActions} from "features/document/documentSlice";

import MenuBar from "./MenuBar";
import TitleForm from "./TitleForm";
import {FontSize} from "./FontSize";
import {useEffect} from "react";

const WritingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 40px 20px;
  width: 100%;
  /* 추후 종단점 별 Text Editor 폭 수정 */
  max-width: 900px;
  min-width: 900px;
  min-height: 1000px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-top: none;
`;

const EditorWrap = styled.div`
  width: 100%;
  padding: 0 40px;
`;

interface IIsEditable {
  isEditable: boolean;
}

const Tiptap = ({isEditable}: IIsEditable) => {
  const dispatch = useAppDispatch();
  const docuKind = useAppSelector((state) => state.document.docuKind);
  const docuContent = useAppSelector((state) => state.document.docuContent);

  // 문서 내용을 수정 안했을 때에도 저장되는 기능
  useEffect(() => {
    if (isEditable && docuContent === "") {
      dispatch(documentActions.afterWritingDocuContent(selectDocukind()));
    }
  }, []);

  // 앞 단계에서 선택한 문서양식에 따라서 에디터 출력 다르게 설정
  function selectDocukind() {
    switch (docuKind) {
      case "자유양식":
        return freeForm;
      case "MOU":
        return mouForm;
      case "근로계약서":
        return laborForm;
      case "차용증":
        return deptForm;
      default:
        return "Didn't select docukind. Go back to docukind page";
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["paragraph"],
      }),
      FontSize,
      FontFamily,
    ],
    content: isEditable ? selectDocukind() : docuContent,
    autofocus: true,
    editable: isEditable,
    onUpdate: ({editor}) => {
      // 문서 내용을 수정했을 때 실시간으로 dispatch 해서 저장
      dispatch(documentActions.afterWritingDocuContent(editor.getHTML()));
    },
  });

  return (
    <>
      <WritingWrapper>
        <MenuBar editor={editor} isEditable={isEditable} />
        <TitleForm isEditable={isEditable} />
        <Paper id="capture" onClick={() => editor?.chain().focus()}>
          <EditorWrap>
            <EditorContent editor={editor} />
          </EditorWrap>
        </Paper>
      </WritingWrapper>
    </>
  );
};

export default Tiptap;
