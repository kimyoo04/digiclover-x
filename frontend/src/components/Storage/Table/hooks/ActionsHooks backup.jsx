// modules
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
// components
import Button from "@components/Style/buttons";
// redux-toolkit
import {useAppSelector} from "@app/hook";
// firebase
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {dbService} from "src/fbase";
import {breakpoints} from "@components/Util/breakPoints";

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
  const user = useAppSelector((state) => state.auth.user);

  const onDeleteAlert = async (documentId) => {
    if (
      window.confirm(
        "정말로 문서를 삭제하시겠습니까? 삭제되면 복구되지 않습니다."
      ) === true
    ) {
      // 1. 문서 삭제
      const documentRef = doc(dbService, "documents", documentId);
      await deleteDoc(documentRef).catch((error) => console.log(error));

      // 2. 유저 아이디와 일치하는 서명 찾기
      let signaturesId = [];
      const signautesQuery = query(
        collection(dbService, "signatures"),
        where("DocumentId", "==", documentId)
      );

      // 3. 서명에서 id만 추출 후 배열 생성
      const signautesQuerySnapshot = await getDocs(signautesQuery);
      signautesQuerySnapshot.forEach((doc) => {
        signaturesId.push(doc.id);
      });

      // 4. 서명들 삭제
      for (let signatureId of signaturesId) {
        console.log(signatureId);
        const signatureRef = doc(dbService, "signatures", signatureId);
        await deleteDoc(signatureRef).catch((error) => console.log(error));
      }
    } else {
      // Do nothing
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
