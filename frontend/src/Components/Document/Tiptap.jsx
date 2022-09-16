import "./styles.scss";

import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import {useEffect, useState} from "react";
import styled from "styled-components";

import free from "./docukind/free";
import mou from "./docukind/mou";
import labor from "./docukind/labor";
import dept from "./docukind/dept";

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.textWhiteColor};
  padding: 40px 20px;
  margin: 0 10vw;
  width: 100%;
  max-width: 900px;
  min-height: 1000px;
  border: 1px solid ${(props) => props.theme.grayscale4Color};
`;

const MenuBarWrap = styled.div`
  display: flex;
  padding: 0 40px;
  margin-bottom: 40px;
  gap: 4px;
`;

const EditorWrap = styled.div`
  width: 100%;
  padding: 0 40px;
`;

const EditorButton = styled.button`
  background-color: white;
  color: ${(props) => props.theme.grayscale2Color};
  border-radius: 6px;
  border: none;
  & i {
    font-size: 20px;
  }
  &.is-active {
    background-color: ${(props) => props.theme.bgWhiteColor};
    color: black;
    font-weight: 700;
  }
`;

const MenuBar = ({editor}) => {
  if (!editor) {
    return null;
  }

  return (
    <MenuBarWrap>
      <EditorButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <i className="ri-bold"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <i className="ri-italic"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <i className="ri-strikethrough-2"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <i className="ri-paragraph"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
        className={editor.isActive("heading", {level: 1}) ? "is-active" : ""}
      >
        <i className="ri-h-1"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
        className={editor.isActive("heading", {level: 2}) ? "is-active" : ""}
      >
        <i className="ri-h-2"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
        className={editor.isActive("heading", {level: 3}) ? "is-active" : ""}
      >
        <i className="ri-h-3"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
        className={editor.isActive("heading", {level: 4}) ? "is-active" : ""}
      >
        <i className="ri-h-4"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
        className={editor.isActive("heading", {level: 5}) ? "is-active" : ""}
      >
        <i className="ri-h-5"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
        className={editor.isActive("heading", {level: 6}) ? "is-active" : ""}
      >
        <i className="ri-h-6"></i>
      </EditorButton>

      <EditorButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({textAlign: "left"}) ? "is-active" : ""}
      >
        <i className="ri-align-left"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({textAlign: "center"}) ? "is-active" : ""}
      >
        <i className="ri-align-center"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({textAlign: "right"}) ? "is-active" : ""}
      >
        <i className="ri-align-right"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({textAlign: "justify"}) ? "is-active" : ""}
      >
        <i className="ri-align-justify"></i>
      </EditorButton>

      <EditorButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <i className="ri-list-unordered"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <i className="ri-list-ordered"></i>
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <i className="ri-separator"></i>
      </EditorButton>
      <EditorButton onClick={() => editor.chain().focus().undo().run()}>
        <i className="ri-arrow-go-back-line"></i>
      </EditorButton>
      <EditorButton onClick={() => editor.chain().focus().redo().run()}>
        <i className="ri-arrow-go-forward-line"></i>
      </EditorButton>
    </MenuBarWrap>
  );
};

const TiptapEditor = () => {
  const [formContent, setFormContent] = useState(``);

  // 앞 단계에서 선택한 문서양식에 따라서 에디터 출력 다르게 설정
  useEffect((data) => {
    switch (data) {
      case "free":
        setFormContent(free);
        break;
      case "mou":
        setFormContent(mou);
        break;
      case "labor":
        setFormContent(labor);
        break;
      case "dept":
        setFormContent(dept);
        break;
      default:
        setFormContent("Didn't select docukind");
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["paragraph"],
      }),
    ],
    content: formContent,
    autofocus: true,
    editable: true,
    onUpdate: ({editor}) => {
      const save = editor.getHTML();
    },
  });

  return (
    <Paper onClick={() => editor.chain().focus()}>
      <MenuBar editor={editor} />
      <EditorWrap>
        <EditorContent editor={editor} />
      </EditorWrap>
    </Paper>
  );
};

export default TiptapEditor;