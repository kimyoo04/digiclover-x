import {DocuKind} from "features/document/documentSlice";
import styled from "styled-components";

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
  contractorPhone: string;
  email: string;
  extraError?: string;
}

export interface IDocuKindForm {
  docuKind: DocuKind;
  extraError?: string;
}

export interface IDocuTitleForm {
  docuTitle: string;
  extraError?: string;
}
