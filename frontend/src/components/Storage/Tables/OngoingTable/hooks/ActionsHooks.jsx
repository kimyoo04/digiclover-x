// modules
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
// components
import Button from "@components/Style/buttons";
import {breakpoints} from "@components/Util/breakPoints";
// controllers
import {deleteOneOngoing} from "@controllers/ongoings.controller";

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

const ModalButton = styled(DeleteButton)``;

const ActionButtons = ({row}) => {
  const navigate = useNavigate();

  // 나중에 deletedAt: utc time 추가하는 것으로 대체하기
  const onDeleteAlert = async (documentID) => {
    const msg = "정말로 문서를 삭제하시겠습니까? 삭제되면 복구되지 않습니다.";
    if (window.confirm(msg) === true) await deleteOneOngoing(documentID);
  };

  return (
    <ActionWrapper>
      <ModalButton
        onClick={() => navigate(`/storage/ongoing/${row.values.id}`)}
      >
        <i className="ri-file-list-2-line"></i>
      </ModalButton>

      <DeleteButton onClick={() => onDeleteAlert(row.values.id)}>
        <i className="ri-delete-bin-line"></i>
      </DeleteButton>
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
