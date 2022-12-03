import {IContractor} from "./contractor";
import {DocuKind} from "./docukind";

export interface IDraftData {
  id?: string;
  uid: string;
  contractor: IContractor;

  docuKind: DocuKind;
  docuTitle: string;
  docuContent: string;

  createdAt: number;
  expiresAt: number;
}
