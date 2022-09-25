import "./tiptap.scss";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";

import styled from "styled-components";
import {
  freeForm,
  mouForm,
  laborForm,
  deptForm,
} from "Components/Document/docukind";

import {useRecoilState, useRecoilValue} from "recoil";
import {docuContentState, docuKindState} from "atom/documentAtom";

import MenuBar from "./MenuBar";
import TitleForm from "./TitleForm";
import {FontSize} from "./FontSize";

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 40px 20px;
  margin: 0 10vw;
  width: 100%;
  max-width: 900px;
  min-height: 1000px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const EditorWrap = styled.div`
  width: 100%;
  padding: 0 40px;
`;

interface IIsEditable {
  isEditable: boolean;
}

const Tiptap = ({isEditable}: IIsEditable) => {
  const {docuKind} = useRecoilValue(docuKindState);
  const [{docuContent}, setDocuContent] = useRecoilState(docuContentState);

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
      TextStyle,
    ],
    content: isEditable ? selectDocukind() : docuContent,
    autofocus: true,
    editable: isEditable,
    onUpdate: ({editor}) => {
      // atom 데이터 저장
      setDocuContent({docuContent: editor.getHTML()});
    },
  });

  return (
    <Paper id="capture">
      <MenuBar editor={editor} isEditable={isEditable} />
      <TitleForm isEditable={isEditable} />
      <EditorWrap>
        <EditorContent editor={editor} />
      </EditorWrap>
    </Paper>
  );
};

export default Tiptap;
