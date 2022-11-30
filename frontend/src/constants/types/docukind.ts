export type DocuKind = "자유양식" | "MOU" | "근로계약서" | "차용증" | "";

export interface IDocuKindForm {
  docuKind: DocuKind;
  extraError?: string;
}

export interface IDocuTitleForm {
  docuTitle: string;
  extraError?: string;
}
