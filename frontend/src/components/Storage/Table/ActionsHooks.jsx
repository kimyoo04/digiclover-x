// modules
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
// components
import Button from "@components/Style/buttons";
// firebase
import {deleteDoc, doc} from "firebase/firestore";
import {dbService} from "src/fbase";

const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.2rem;
`;

const DeleteButton = styled(Button)`
  height: 3.4rem;
`;

const ModalButton = styled(Button)`
  height: 3.4rem;

  & i {
  }
`;

const ActionButtons = ({row}) => {
  const navigate = useNavigate();

  const onDeleteAlert = async (documentId) => {
    if (
      window.confirm(
        "정말로 문서를 삭제하시겠습니까? 삭제되면 복구되지 않습니다."
      ) === true
    ) {
      const documentRef = doc(dbService, "documents", documentId);
      await deleteDoc(documentRef).catch((error) => console.log(error));
    } else {
    }
  };

  return (
    <ActionWrapper>
      <ModalButton onClick={() => navigate(`/storage/${row.values.id}`)}>
        <i className="ri-file-list-2-line"></i>
      </ModalButton>
      {/* 유저가 UserId1과 일치할 경우만 활성화하기 */}
      <DeleteButton onClick={() => onDeleteAlert(row.values.id)}>
        <i className="ri-delete-bin-line"></i>
      </DeleteButton>
    </ActionWrapper>
  );
};

const actionHooks = (hooks) => {
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

export default actionHooks;
