import {IContractor} from "./contractor";
import {DocuKind} from "./docukind";

export interface IDocumentData {
  id: string;

  contractors: IContractor[];

  docuKind: DocuKind;
  docuTitle: string;
  docuContent: string;
  hashFile: string;

  sendEmails: boolean;

  createdAt: number;
  updatedAt: number;
}

export interface IDocuTitle {
  docuTitle: string;
}

export interface DocumentState {
  step: number;
  isBack: boolean;
  isNew: boolean;
  contractors: IContractor[];
  documentID: string;
  docuKind: DocuKind;
  docuTitle: string;
  docuContent: string;
  error: string;
}
