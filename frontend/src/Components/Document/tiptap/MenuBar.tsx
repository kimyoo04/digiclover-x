// modules
import {Editor} from "@tiptap/react";
import SaveDraftButton from "@components/Document/onGoings/SaveDraftButton";
// tiptap components
import FontFamilyDropDown from "./DropDown/FontFamily";
import FontSizeDropDown from "./DropDown/FontSize";
import {Background, EditorButton, MenuBarWrap} from "./MenuBarStyle";

interface IEditor {
  editor: Editor | null;
  isEditable: boolean;
}

const MenuBar = ({editor, isEditable}: IEditor) => {
  if (!editor) {
    return null;
  }

  return isEditable ? (
    <Background>
      <MenuBarWrap>
        <FontFamilyDropDown editor={editor} />
        <FontSizeDropDown editor={editor} />

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

        {/* 임시 저장 버튼 */}
        <SaveDraftButton />
      </MenuBarWrap>
    </Background>
  ) : null;
};

export default MenuBar;
