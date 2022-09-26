import {Editor} from "@tiptap/react";
import styled from "styled-components";
import FontSizeDropDown from "./FontSizeDropDown";

interface IEditor {
  editor: Editor | null;
  isEditable: boolean;
}

const MenuBarWrap = styled.div`
  display: flex;
  padding: 0 40px;
  margin-bottom: 40px;
  gap: 4px;
`;
const EditorButton = styled.button`
  background-color: white;
  color: gray;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  & i,
  & span {
    font-size: 20px;
  }
  &.is-active {
    background-color: ${(props) => props.theme.secondaryLightBlueColor};
    color: black;
    font-weight: 700;
  }
`;

interface IFontSizeOption {
  label: string;
  value: string;
}

const MenuBar = ({editor, isEditable}: IEditor) => {
  if (!editor) {
    return null;
  }

  const FontSizeOptions: IFontSizeOption[] = [
    {
      label: "16",
      value: "16",
    },
    {
      label: "20",
      value: "20",
    },
    {
      label: "24",
      value: "24",
    },
    {
      label: "28",
      value: "28",
    },
  ];

  return isEditable ? (
    <MenuBarWrap>
      <FontSizeDropDown options={FontSizeOptions} editor={editor} />

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
  ) : null;
};

export default MenuBar;
