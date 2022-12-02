// redux-toolkit
import {useAppSelector} from "@app/hook";
// controllers
import {saveNewDraft} from "@controllers/saveDraft.controller";
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
        // const ongoings = await getOneUserOngoings(user.id);
        const ongoingId = await saveNewDraft(user.id, docuInfo);
        if (ongoingId) dispatch(documentActions.saveDocumentID(ongoingId));
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
