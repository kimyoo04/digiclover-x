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

const DocumentDataService = {
  getAllDocuments(): Promise<IDocumentData[]> {
    // 인자 page = 0 넣기
    return http.get(`/documents`).then((res) => res.data);
    // return http.get(`/documents?page=${page}`); // 페이지 구현하기
  },
  createOneDocument(data: IDocuAll) {
    return http.post("/documents", data);
  },

  getOneDocument(id: number): Promise<IDocumentData> {
    return http.get(`/documents/${id}`).then((res) => res.data);
  },

  deleteOneDocument(id: number, userId: string) {
    return http.delete(`/document/${id}`, {data: {userId: userId}});
  },

  updateSignature(imgUrl: string) {
    return http.put("/documents/:id/signning", imgUrl);
  },

  // find(query, by = "name", page = 0) {
  //   return http.get(`restaurants?${by}=${query}&page=${page}`);
  // }

  // getCuisines(id) {
  //   return http.get(`/cuisines`);
  // }
};

export default DocumentDataService;
