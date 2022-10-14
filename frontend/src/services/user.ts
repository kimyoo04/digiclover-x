// routes
import {IUserForm} from "@routes/Profile";
// constants
import http from "@constants/http-common";

const UserDataService = {
  // Get - 회원조회
  // Delete - 회원탈퇴
  // Update - 회원정보수정

  getOneUser() {
    return http.get(`/user`).then((res) => res.data);
  },
  deleteOneUser() {
    return http.delete(`/user`);
  },
  updateOneUser(data: IUserForm) {
    return http.put(`/user`, {data});
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
