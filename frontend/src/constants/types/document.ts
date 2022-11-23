export interface IDocumentData {
  id: string;

  // 문서 정보 (문서 양식, 문서 제목, 문서 내용)
  docukind: string;
  docuTitle: string;
  docuContent: string;

  // 문서 파일 헤시값 A
  hashFile: string;

  // 계약자 갑, 을, 병, 정 정보
  UserId1: string | null;
  UserId2: string | null;
  UserId3: string | null;
  UserId4: string | null;

  createdAt: string;
}

export interface IDocumentsData {
  documentsData?: IDocumentData[];
}

export interface ISignatureData {
  id: string;
  DocumentId: number;
  UserId: number | null;
  contractorPhone: number;
  hashValue: string | null;
  imgUrl: string | null;
  isSigned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISignatureData {
  [key: number]: ISignatureData; // 정확히 맞는지 확인하기
}

export type DocuKind = "자유양식" | "MOU" | "근로계약서" | "차용증" | "";

export interface IDocuTitle {
  docuTitle: string;
}

export interface DocumentState {
  step: number;
  isBack: boolean;
  contractors: IContractor[];
  docuKind: DocuKind;
  docuTitle: string;
  docuContent: string;
  imgUrl: string;
  error: string;
}

export interface IContractorForm {
  companyName: string;
  name: string;
  contractorPhone: string;
  email: string;
  extraError?: string;
}

export interface IContractor {
  uid?: string;
  companyName: string;
  name: string;
  email: string;
}

export interface IDocuKindForm {
  docuKind: DocuKind;
  extraError?: string;
}

export interface IDocuTitleForm {
  docuTitle: string;
  extraError?: string;
}
