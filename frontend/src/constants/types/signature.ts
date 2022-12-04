export interface ISignatureData {
  id?: string;
  uid: string;
  email: string;
  DocumentId: number;

  hashValue?: string;
  isSigned: boolean;
  imgUrl?: string;

  createdAt: string;
  updatedAt: string;
}
