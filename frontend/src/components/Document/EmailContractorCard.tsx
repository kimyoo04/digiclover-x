// modules
import styled from "styled-components";
// types
import {IContractor} from "@constants/types/document";

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

const EmailContractorCard = (contractor: IContractor) => {
  return (
    <Card>
      <InfoWrapper>
        <Info>회사명 :</Info>
        <InfoText>{contractor.companyName}</InfoText>
      </InfoWrapper>
      <InfoWrapper>
        <Info>성명 :</Info>
        <InfoText>{contractor.name}</InfoText>
      </InfoWrapper>
      <InfoWrapper>
        <Info>이메일 :</Info>
        <InfoText>{contractor.email}</InfoText>
      </InfoWrapper>
    </Card>
  );
};

export default EmailContractorCard;
