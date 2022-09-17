import styled from "styled-components";
import Button from "../style/buttons";

const DocumentWrapper = styled.div``;
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

  const documentOnlyData = [
    {
      id: 7,
      docuName: "퍼그야 제발...",
      hashFile: "d41d8cd98f00b204e9800998ecf8427e",
      createdAt: "2022-09-07",
      updatedAt: "2022-09-07",
    },
    {
      id: 6,
      docuName: "찐짜",
      hashFile: "d41d8cd98f00b204e9800998ecf8427e",
      createdAt: "2022-09-07",
      updatedAt: "2022-09-07",
    },
  ];

  const documentsData = [
    {
      contractorPhone: "010-0000-1234",
      isSigned: 0,
      hashValue: "0",
      imgUrl: null,
      DocumentId: 3,
      createdAt: "2022-09-07",
      updatedAt: "2022-09-07",
    },
    {
      contractorPhone: "010-8131-1234",
      isSigned: 1,
      hashValue: "ed5e0a8220a2c05bbaefaf4a77acd2c1",
      imgUrl:
        "2vkeMJ2CQK1AzTulSmB8L8lzazvVjsCOAvet7sEdnWbS1/BJO98RUnMC2whsGxhHlwquSvKpbTpyLIEDCwwvY5VAOe/A/Z14egEylbx+Dy2wbWAcjWfyG5OHhnH+2QsMA2TST6ULkNnXkgkMBNavD2+KU9p5ftSmWo6bWqCZG+kCZOpS0P++BNZ/qU4679GH9V68+jKiffXvPATGEhAgY0nrp2uBTXYcPt3ddQkscnICZJHLbtL7FDhVePzVJ7z3Se1cjQkIkMYWxHDmJ3BSgLgsO7+1NOLtBATIdl6OJvAQgVckuWntmVTCQ6EsQUCALGGVzZEAAQIHEBAgB0B1SgIECCxBQIAsYZXNkQABAgcQECAHQHVKAgQILEFAgCxhlc2RAAECBxAQIAdAdUoCBAgsQUCALGGVzZEAAQIHEBAgB0B1SgIECCxBQIAsYZXNkQABAgcQ8Dj3A6A6JQECBJYgMAyQSb+KwKMfllBu5kiAQE8CwwC5P8k5U01OgEwlr18CBAjUCfhK2zo3rQgQILB4gWGA3JHkwqlE7ECmktcvAQIE6gSGAfK+JO+oO83urQTI7obOQIAAgTEFhgFyWZJvj9n5sC8BMpW8fgkQILC9wEuTfHXQbNLX8Ek7395OCwIECCxa4ANJrhUgi64BkydAgECVwJ1JzhcgVXYaESBAYNEC9yY5V4AsugZMngABAlUC5YODZwmQKjuNCBAgsGiB8uiS4b3rSe9jT9r5osvA5AkQILC9gADZ3kwLAgQIEEjSzKPcy2rYgahJAgQIzEdAgMxnrYyUAAECTQk0810gdiBN1YXBECBA4JQCdyV5zOCI65O8Z0ozl7Cm1Nc3AQIENhdo6vKVHcjm",
      DocumentId: 5,
      createdAt: "2022-09-07",
      updatedAt: "2022-09-08",
    },
  ];

  return (
    <div>
      {documentsData.map((documentData, index) => {
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
              <ModalButton
                onClick={() => onDocuClicked(documentData.DocumentId)}
              >
                상세보기
              </ModalButton>
            </IconWrapper>
          </DocumentWrapper>
        );
      })}
    </div>
  );
};

export default DocumentItem;
