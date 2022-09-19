import {IDocuAll} from "atom/documentAtom";
import http from "../http-common";

class DocumentDataService {
  getAllDocuments() {
    // 인자 page = 0 넣기
    return http.get(`/documents`);
    // return http.get(`/documents?page=${page}`); // 페이지 구현하기
  }
  createOneDocument(data: IDocuAll) {
    return http.post("/document", data);
  }

  getOneDocument(id: number) {
    return http.get(`/documents/${id}`);
  }

  deleteOneDocument(id: number, userId: string) {
    return http.delete(`/document/${id}`, {data: {userId: userId}});
  }

  updateSignature(imgUrl: string) {
    return http.put("/documents/:id/signning", imgUrl);
  }

  // find(query, by = "name", page = 0) {
  //   return http.get(`restaurants?${by}=${query}&page=${page}`);
  // }

  // getCuisines(id) {
  //   return http.get(`/cuisines`);
  // }
}

export default new DocumentDataService();
