import {Editor} from "@tiptap/react";
import styled from "styled-components";
import FontFamilyDropDown from "./FontFamilyDropDown";
import FontSizeDropDown from "./FontSizeDropDown";

interface IEditor {
  editor: Editor | null;
  isEditable: boolean;
}

const Background = styled.div`
  position: fixed;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 140px;

  background-color: ${(props) => props.theme.bgColor};
  z-index: 10;
`;

const MenuBarWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;

  /* 추후 종단점 별 Text Editor 폭 수정 */
  width: 100%;
  max-width: 900px;
  max-height: 100px;
  padding: 20px 0;

  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
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
interface IFontFamilyOption {
  label: string;
  value: string;
}

const MenuBar = ({editor, isEditable}: IEditor) => {
  if (!editor) {
    return null;
  }

  const FontSizeOptions: IFontSizeOption[] = [
    {
      label: "16px",
      value: "16",
    },
    {
      label: "20px",
      value: "20",
    },
    {
      label: "24px",
      value: "24",
    },
    {
      label: "28px",
      value: "28",
    },
  ];

  const FontFamilyOptions: IFontFamilyOption[] = [
    {
      label: "Noto Sans",
      value: "Noto Sans KR",
    },
    {
      label: "Noto Serif",
      value: "'Noto Serif KR', serif",
    },
    {
      label: "Roboto",
      value: "Roboto",
    },
  ];

  return isEditable ? (
    <Background>
      <MenuBarWrap>
        <FontFamilyDropDown options={FontFamilyOptions} editor={editor} />
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
    </Background>
  ) : null;
};

export default MenuBar;
