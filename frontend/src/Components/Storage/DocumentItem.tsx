import styled from "styled-components";
import Button from "../style/buttons";

const DocumentWrapper = styled.div`
  width: 80vw;
`;
const DocuInfo = styled.div``;
const FileName = styled.span``;
const Date = styled.span`
  color: ${(props) => props.theme.textColor};
`;
const Hash = styled.span`
  color: ${(props) => props.theme.textColor};
`;
const IconWrapper = styled.div``;

const ConfirmPerson = styled.span`
  color: ${(props) => props.theme.textColor};
`;
const ConfirmText = styled.span`
  color: ${(props) => props.theme.textColor};
`;

const ModalButton = styled(Button)``;

// document model 의 row 하나당 signature row의 특정 컬럼들(contractorPhone, hashValue, imgUrl, updatedAt)만 계약자별 여러개를 한 document row에 조인 하는 방법을 알 필요가 있다.. 그래서 documentsData로 데이터를 할당하여 컴포넌트를 맵함수에 넣는다.

interface IDocuModal {
  onDocuClicked: (docuId: number) => void;
}

const DocumentItem = ({onDocuClicked}: IDocuModal) => {
  const people = ["갑", "을", "병", "정"];

  const documentsData = [
    {
      id: {},

      // 문서 정보 (문서 양식, 문서 제목, 문서 내용)
      docukind: "자유형식",
      docuTitle: "2022년 김유 근로계약서",
      docuContent: "<p>문서 테스트입니다</p>",

      // 문서 파일 헤시값 A
      hashFile: "13asdasc2ce8dh977182gds871nbhd19shxoi1hx1sab181",

      // 계약자 갑, 을, 병, 정 정보
      UserId1: 3,
      UserId2: null,
      UserId3: null,
      UserId4: null,
    },
  ];

  const signaturesData = [
    {
      id: 10,

      DocumentId: 5,
      UserId: 3,
      contractorPhone: "010-8131-5224",

      isSigned: 1,

      hashValue: "qwicmwl1289dj28091dj7y81h2hd1kshjkcbn1askasckljas",
      imgUrl: "12jildj12ijaw89adahscxlhckljq290cjaclkasjc2n",
    },
    {
      id: 11,

      DocumentId: 5,
      UserId: null,
      contractorPhone: "010-9999-9999",

      isSigned: 0,

      hashValue: null,
      imgUrl: null,
    },
  ];

  return (
    <div>
      {signaturesData.map((documentData, index) => {
        return (
          <DocumentWrapper key={documentData.DocumentId}>
            <DocuInfo>
              <FileName>{}</FileName>
              <Date></Date>
              <Hash></Hash>
            </DocuInfo>
            <IconWrapper>
              <ConfirmPerson>{people[index]}</ConfirmPerson>
              <ConfirmText>
                {documentData.isSigned ? "인증완료" : "인증예정"}
              </ConfirmText>
            </IconWrapper>
            <ModalButton onClick={() => onDocuClicked(documentData.DocumentId)}>
              상세보기
            </ModalButton>
          </DocumentWrapper>
        );
      })}
    </div>
  );
};

export default DocumentItem;
