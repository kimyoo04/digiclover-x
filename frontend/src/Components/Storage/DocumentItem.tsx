// modules
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
// services
import {IDocumentData, IDocumentsData} from "@services/document";
// components
import Button from "@components/Style/buttons";

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

const ModalButton = styled(Button)`
  width: 80px;
  height: 40px;
  margin: 10px;
`;

interface ISignIcon {
  contractorId: number | null;
  people: string;
}

const SignIcon = ({contractorId, people}: ISignIcon) => {
  return (
    <>
      {contractorId !== null ? (
        contractorId !== 0 ? (
          <SignnedIcon>
            <ConfirmPerson>{people}</ConfirmPerson>
            <ConfirmText>완료</ConfirmText>
          </SignnedIcon>
        ) : (
          <UnsignnedIcon>
            <ConfirmPerson>{people}</ConfirmPerson>
            <ConfirmText>예정</ConfirmText>
          </UnsignnedIcon>
        )
      ) : null}
    </>
  );
};

const DocumentItem = ({documentsData}: IDocumentsData) => {
  const navigate = useNavigate();
  function onDocuClicked(documentId: number) {
    // 선택한 문서 아이디로 이동 (DocumentModal 컴포넌트)
    navigate(`/storage/${documentId}`);
  }

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
          const people = ["갑", "을", "병", "정"];
          const contractors = [UserId1, UserId2, UserId3, UserId4];

          return (
            <DocumentWrapper key={id}>
              <DocuInfo>
                <FileName>{docuTitle}</FileName>
                <Date>{createdAt}</Date>
                <Hash>{hashFile.slice(0, 50)}...</Hash>
              </DocuInfo>
              <SignWrapper>
                {contractors.map((contractor, index) => {
                  return (
                    <SignIcon
                      contractorId={contractor}
                      people={people[index]}
                      key={index}
                    />
                  );
                })}
              </SignWrapper>
              <ModalButton onClick={() => onDocuClicked(id)}>
                상세보기
              </ModalButton>
            </DocumentWrapper>
          );
        }
      )}
    </div>
  );
};

export default DocumentItem;
