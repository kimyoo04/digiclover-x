import {ISignInForm} from "Components/Style/auth";
import http from "../http-common";

const UserDataService = {
  // Post - 회원가입

  createOneUser(data: ISignInForm) {
    return http.post("/user/signin", {data});
  },

  // Get - 회원조회
  // Delete - 회원탈퇴
  // Update - 회원정보수정

  getOneUser(id: string) {
    return http.get(`/user/${id}`);
  },
  deleteOneUser(id: string) {
    return http.delete(`/user/${id}`);
  },
  updateOneUser(id: string) {
    return http.put(`/user/${id}`);
  },

  // getAll(page = 0) {
  //   return http.get(`restaurants?page=${page}`);
  // }
  // updateReview(data) {
  //   return http.put("/review-edit", data);
  // }
  // deleteReview(id, userId) {
  //   return http.delete(`/review-delete?id=${id}`, {data: {user_id: userId}});
  // }
  // getCuisines(id) {
  //   return http.get(`/cuisines`);
  // }
};

export default UserDataService;
