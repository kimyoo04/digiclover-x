import styled from "styled-components";

interface IContractor {
  companyName: string;
  name: string;
  phone: string;
  email: string;
}

const Card = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
  width: 400px;
  padding: 40px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 6px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.span`
  display: inline-block;
  font-weight: 700;
`;
const InfoText = styled.span`
  display: inline-block;
  font-weight: 400;
`;

const ContractorCard = (children: IContractor) => {
  return (
    <Card>
      <InfoWrapper>
        <Info>회사명 :</Info>
        <InfoText>{children.companyName}</InfoText>
      </InfoWrapper>
      <InfoWrapper>
        <Info>성명 :</Info>
        <InfoText>{children.name}</InfoText>
      </InfoWrapper>
      <InfoWrapper>
        <Info>전화번호 :</Info>
        <InfoText>{children.phone}</InfoText>
      </InfoWrapper>
      <InfoWrapper>
        <Info>이메일 :</Info>
        <InfoText>{children.email}</InfoText>
      </InfoWrapper>
    </Card>
  );
};

export default ContractorCard;
