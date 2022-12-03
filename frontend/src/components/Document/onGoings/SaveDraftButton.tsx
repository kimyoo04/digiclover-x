// redux-toolkit
import {useAppSelector} from "@app/hook";
// controllers
import {saveDraft} from "@controllers/saveDraft.controller";
import {documentActions} from "@features/document/documentSlice";
import {useDispatch} from "react-redux";
// style
import {ButtonWrapper, SaveBtn} from "./SaveDraftButtonStyle";

const SaveDraftButton = () => {
  const user = useAppSelector((state) => state.auth.user);
  const docuInfo = useAppSelector((state) => state.document);
  const dispatch = useDispatch();

  const onSaveDraft = async () => {
    if (window.confirm("임시 저장 후 화면을 종료하시겠습니까?")) {
      // yes
      if (user.id) {
        // const draftrs = await getOneUserDrafts(user.id);
        const draftId = await saveDraft(user.id, docuInfo);
        if (draftId) dispatch(documentActions.saveDocumentID(draftId));
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
