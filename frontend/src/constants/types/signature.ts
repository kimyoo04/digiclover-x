export interface ISignatureData {
  uid: string | null;
  email: string;
  DocumentId: number;

  hashValue?: string;
  isSigned: boolean;
  imgUrl?: string;

  createdAt: string;
  updatedAt: string;
}

export interface ISignatureData {
  [key: number]: ISignatureData; // 정확히 맞는지 확인하기
}
