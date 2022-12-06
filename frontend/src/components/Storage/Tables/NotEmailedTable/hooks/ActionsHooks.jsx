// modules
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
// components
import Button from "@components/Style/buttons";
import {breakpoints} from "@components/Util/breakPoints";
// redux-toolkit
import {useAppDispatch, useAppSelector} from "@app/hook";
// controllers
import {
  deleteOneDocument,
  getOneDocument,
} from "@controllers/documents.controller";
import {deleteSignaturesByDocumentId} from "@controllers/signatures.controller";
import {documentActions} from "@features/document/documentSlice";

const ActionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;

const DeleteButton = styled(Button)`
  width: 100%;
  height: 3.4rem;

  & i {
    ${breakpoints("font-size", "rem", [
      {300: 1},
      {400: 1.2},
      {500: 1.4},
      {600: 1.6},
    ])}
  }
`;

const EnterWritingButton = styled(DeleteButton)``;

const ActionButtons = ({row}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  // 나중에 deletedAt: utc time 추가하는 것으로 대체하기
  const onDeleteAlert = async (documentID) => {
    const msg = "정말로 문서를 삭제하시겠습니까? 삭제되면 복구되지 않습니다.";
    if (window.confirm(msg) === true) {
      // 문서 삭제 및 서명들 삭제
      await deleteOneDocument(documentID);
      await deleteSignaturesByDocumentId(documentID);
    }
  };

  return (
    <ActionWrapper>
      <EnterWritingButton
        onClick={async () => {
          const documentData = await getOneDocument(row.values.id);
          dispatch(documentActions.enterSignaturePlacing(documentData));
          navigate(`/document/write`);
        }}
      >
        <i className="ri-mail-send-line"></i>
      </EnterWritingButton>

      {row.values.requester.uid === user.id ? (
        <DeleteButton onClick={() => onDeleteAlert(row.values.id)}>
          <i className="ri-delete-bin-line"></i>
        </DeleteButton>
      ) : null}
    </ActionWrapper>
  );
};

const ActionHooks = (hooks) => {
  hooks.visibleColumns.push((columns) => [
    ...columns,
    {
      id: "action",
      Header: "Action",
      Cell: ({row}) => {
        return <ActionButtons row={row} />;
      },
    },
  ]);
};

export default ActionHooks;
