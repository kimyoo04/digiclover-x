import {useAppSelector} from "@app/hook";
import {postOneOngoingDocu} from "@controllers/ongoings.controller";
import {updateOngoingsId} from "@controllers/users.controller";
import {ButtonWrapper, SaveBtn} from "./SaveDraftButtonStyle";

const SaveDraftButton = () => {
  const user = useAppSelector((state) => state.auth.user);
  const docuInfo = useAppSelector((state) => state.document);
  const {contractors, docuKind, docuTitle, docuContent} = docuInfo;

  const onSaveDraft = async () => {
    if (window.confirm("임시 저장 후 화면을 종료하시겠습니까?")) {
      // yes
      if (user.id) {
        const ongoingId = await postOneOngoingDocu(user.id, {
          contractors,
          docuKind,
          docuTitle,
          docuContent,
        });

        await updateOngoingsId(user.id, ongoingId)
          .then(() => console.log("updateOngoingsId success"))
          .catch((error) => console.log("updateOngoingsId error ==> ", error));
      } else {
        console.log("postOneOngoingDocu - 유저 정보가 없습니다.");
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
