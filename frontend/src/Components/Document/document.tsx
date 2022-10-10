import {DocuKind} from "features/document/documentSlice";
import {motion} from "framer-motion";
import styled from "styled-components";

export const FormWrapper = styled(motion.div)`
  width: 80vw;
  padding: 3rem;
  max-width: 40rem;

  background-color: ${(props) => props.theme.bgWhiteTransColor1};
  border: 1px solid ${(props) => props.theme.bgWhiteColor};
  border-radius: 12px;
`;

export const Label = styled.label`
  display: block;
  text-align: right;
  color: ${(props) => props.theme.secondaryMintColor};
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
`;

export const ErrorMessage = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
  color: ${(props) => props.theme.dangerColor};
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 10px;

  border: none;
  border-radius: 6px;

  color: black;
  font-size: 14px;

  transition: 0.1s;

  &::placeholder {
    color: ${(props) => props.theme.primaryBlueColor};
    font-size: 1.2rem;
  }
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
