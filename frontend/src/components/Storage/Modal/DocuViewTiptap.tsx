// modules
import {useEffect} from "react";
import styled from "styled-components";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
// tiptap components
import "@components/Document/tiptap/tiptap.scss";
import {FontSize} from "@components/Document/tiptap/FontSize";
// firebase

const WritingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Input = styled.input`
  width: 100%;
  padding: 4rem 2rem 8rem 2rem;

  font-size: 24px;
  font-weight: 700;
  text-align: center;

  background-color: white;
  border: none;

  z-index: 10;

  &:focus {
    outline: none;
  }
`;

interface IIsEditable {
  isEditable: boolean;
}

const DocuViewTiptap = ({isEditable}: IIsEditable) => {
  const docuContent = "내용입니다";
  // docuContent 불러오기
  useEffect(() => {}, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["paragraph"],
      }),
      FontSize,
      FontFamily,
    ],
    content: docuContent,
    autofocus: true,
    editable: isEditable,
  });

  return (
    <WritingWrapper>
      {/* 문서 제목 */}

      {/* Tiptap viewer */}
      <Paper id="capture">
        <Input disabled={!isEditable} value={"제목입니다."} />
        <EditorWrap>
          <EditorContent editor={editor} />
        </EditorWrap>
      </Paper>
    </WritingWrapper>
  );
};

export default DocuViewTiptap;
