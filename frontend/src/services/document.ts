import {IDocuAll} from "atom/documentAtom";
import http from "../http-common";

export interface IDocumentData {
  id: number;

  // 문서 정보 (문서 양식, 문서 제목, 문서 내용)
  docukind: string;
  docuTitle: string;
  docuContent: string;

  // 문서 파일 헤시값 A
  hashFile: string;

  // 계약자 갑, 을, 병, 정 정보
  UserId1: number | null;
  UserId2: number | null;
  UserId3: number | null;
  UserId4: number | null;

  createdAt: string;
}

export interface IDocumentsData {
  documentsData?: IDocumentData[];
}

export interface ISignatureData {
  id: number;
  DocumentId: number;
  UserId: number | null;
  contractorPhone: number;
  hashValue: string | null;
  imgUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IModalData {
  [key: number]: ISignatureData; // 정확히 맞는지 확인하기
  id: number;
  docukind: string;
  docuTitle: string;
  docuContent: string;
  hashFile: string;
  UserId1: number | null;
  UserId2: number | null;
  UserId3: number | null;
  UserId4: number | null;
  createdAt: string;
}

const DocumentDataService = {
  // get - 유저의 모든 문서들

  getAllDocuments(): Promise<IDocumentData[]> {
    // 인자 page = 0 넣기
    return http.get(`/documents`).then((res) => res.data);
  },

  // post - 1개 문서 생성

  createOneDocument(data: IDocuAll) {
    return http.post("/documents", {data});
  },

  // get - 문서 1 개 조회 (+ 문서에 포함된 서명들)

  getOneDocument(id: string | undefined): Promise<IModalData> {
    return http.get(`/documents/${id}`).then((res) => res.data);
  },

  // delete - 문서 삭제

  deleteOneDocument(id: number, userId: string) {
    // userId와 UserId1 컬럼 비교 후 삭제
    return http.delete(`/document/${id}`, {data: userId});
  },

  // put - 수신자 서명 후 값 수정

  updateSignature(imgUrl: string) {
    return http.put("/documents/:id/signning", {imgUrl});
  },

  // find(query, by = "name", page = 0) {
  //   return http.get(`restaurants?${by}=${query}&page=${page}`);
  // }

  // getCuisines(id) {
  //   return http.get(`/cuisines`);
  // }
};

export default DocumentDataService;
