import {ButtonWrapper, SaveBtn} from "./SaveDraftButtonStyle";

const SaveDraftButton = () => {
  const onSaveDraft = () => {
    if (window.confirm("임시 저장 후 화면을 종료하시겠습니까?")) {
      // yes
      // 임시 저장 controller 필요
    } else {
      // no
    }
  };

  return (
    <ButtonWrapper>
      <SaveBtn onClick={onSaveDraft}>
        <span>Save Draft</span>
      </SaveBtn>
    </ButtonWrapper>
  );
};

export default SaveDraftButton;
