// modules
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
// services
import {IDocumentData, IDocumentsData} from "@services/document";
// components
import Button from "@components/Style/buttons";
import {useAppSelector} from "@app/hook";
import {dbService} from "src/fbase";
import {deleteDoc, doc} from "firebase/firestore";

const DocumentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 20px;
    background-color: ${(props) => props.theme.bgWhiteTransColor1};
    border: 1.5px solid ${(props) => props.theme.bgWhiteTransColor2};
    border-radius: 6px;
    margin-bottom: 4px;
  `,
  DocuInfo = styled.div`
    display: flex;
    justify-content: space-between;
    flex-flow: column wrap;
    gap: 6px;
    margin: 10px;
  `,
  FileName = styled.span`
    color: ${(props) => props.theme.textColor};
    font-weight: 700;
  `,
  Date = styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
  `,
  Hash = styled(Date)``;

const SignWrapper = styled.div`
    width: 340px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin: 10px;
    gap: 6px;
  `,
  SignnedIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background-color: ${(props) => props.theme.primaryGreenColor};
  `,
  UnsignnedIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background-color: white;
  `,
  ConfirmPerson = styled.span`
    display: block;
    font-weight: 700;
    padding: 10px;
  `,
  ConfirmText = styled.span`
    padding: 10px 10px 10px 0;
  `;

const ActionWrapper = styled.div``;

const ModalButton = styled(Button)`
  width: 80px;
  height: 40px;
  margin: 0.2rem;
`;
const DeleteButton = styled(Button)`
  width: 80px;
  height: 40px;
  margin: 0.2rem;
`;

interface ISignIcon {
  userId: string | null;
  people: string;
}

const SignIcon = ({userId, people}: ISignIcon) => {
  switch (userId) {
    case null:
      return null;
    case "0":
      return (
        <UnsignnedIcon>
          <ConfirmPerson>{people}</ConfirmPerson>
          <ConfirmText>예정</ConfirmText>
        </UnsignnedIcon>
      );
    case "-1":
      return (
        <UnsignnedIcon>
          <ConfirmPerson>{people}</ConfirmPerson>
          <ConfirmText>거절</ConfirmText>
        </UnsignnedIcon>
      );
    default:
      return (
        <SignnedIcon>
          <ConfirmPerson>{people}</ConfirmPerson>
          <ConfirmText>완료</ConfirmText>
        </SignnedIcon>
      );
  }
};

const DocumentItem = ({documentsData}: IDocumentsData) => {
  const navigate = useNavigate();
  const onDocuClicked = (documentId: string) => {
    // 선택한 문서 아이디로 이동 (DocumentModal 컴포넌트)
    navigate(`/storage/${documentId}`);
  };
  const onDeleteAlert = async (documentId: string) => {
    if (
      window.confirm(
        "정말로 문서를 삭제하시겠습니까? 삭제되면 복구되지 않습니다."
      ) === true
    ) {
      const documentRef = doc(dbService, "documents", documentId);
      await deleteDoc(documentRef);
    } else {
    }
  };

  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      {documentsData?.map(
        ({
          id,
          docuTitle,
          createdAt,
          hashFile,
          UserId1,
          UserId2,
          UserId3,
          UserId4,
        }: IDocumentData) => {
          const userIds = [UserId1, UserId2, UserId3, UserId4];

          return (
            <DocumentWrapper key={id}>
              <DocuInfo>
                <FileName>{`${docuTitle}.PDF`}</FileName>
                {/* <Hash>{hashFile.slice(0, 50)}...</Hash> */}
              </DocuInfo>

              <SignWrapper>
                {userIds.map((userId, index) => {
                  return (
                    <SignIcon
                      userId={userId}
                      people={["갑", "을", "병", "정"][index]}
                      key={index}
                    />
                  );
                })}
              </SignWrapper>
              <ActionWrapper>
                <ModalButton onClick={() => onDocuClicked(id)}>
                  상세보기
                </ModalButton>
                {user.id === UserId1 ? (
                  <DeleteButton onClick={() => onDeleteAlert(id)}>
                    문서 삭제
                  </DeleteButton>
                ) : null}
              </ActionWrapper>
            </DocumentWrapper>
          );
        }
      )}
    </div>
  );
};

export default DocumentItem;
