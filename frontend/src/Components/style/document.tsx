import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-height: 94vh;
  padding-top: 100px;
  background-color: ${(props) => props.theme.bgColor};
`;

export const FormWrapper = styled.div`
  background-color: ${(props) => props.theme.bgWhiteTransColor1};
  border: 1px solid ${(props) => props.theme.bgWhiteColor};
  border-radius: 12px;
  padding: 50px;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  text-align: right;
  color: ${(props) => props.theme.secondaryMintColor};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
`;

export const ErrorMessage = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
  color: ${(props) => props.theme.dangerColor};
`;

export const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 6px;
  font-size: 14px;
  transition: 0.1s;
  color: black;
  border: none;
  padding-left: 10px;
`;

export interface IContractorForm {
  companyName: string;
  name: string;
  phone: string;
  email: string;
  extraError?: string;
}

export interface IDocuKindForm {
  docuKind: "free" | "mou" | "labor" | "dept" | "";
  extraError?: string;
}

export interface IDocuTitleForm {
  docuTitle: string;
  extraError?: string;
}
