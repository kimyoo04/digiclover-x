// redux-toolkit
import {useAppSelector} from "@app/hook";
// controllers
import {saveNewDraft} from "@controllers/saveDraft.controller";
import {getOneUserOngoings} from "@controllers/users.controller";
// style
import {ButtonWrapper, SaveBtn} from "./SaveDraftButtonStyle";

const SaveDraftButton = () => {
  const user = useAppSelector((state) => state.auth.user);
  const docuInfo = useAppSelector((state) => state.document);

  const onSaveDraft = async () => {
    if (window.confirm("임시 저장 후 화면을 종료하시겠습니까?")) {
      // yes
      if (user.id) {
        const ongoings = await getOneUserOngoings(user.id);

        // 저장된 draft 이면
        if (!docuInfo.isNew) {
          // 저장된 문서의 일부분만 업데이트
          // 업데이트한 문서를 제일 뒤 인덱스로 옮긴 후 업데이트
          // 새로운 draft 이면
        } else {
          if (ongoings.length === 5) {
            // 저장된 문서 개수가 5개 이상이면

            // 삭제 여부 선택 & 모달 활성화

            // 오래된 것부터 삭제
            ongoings.shift();
          }
          saveNewDraft(user.id, docuInfo);
        }
      }
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
