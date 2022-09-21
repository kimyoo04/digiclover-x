import {ISignInForm} from "Components/style/auth";
import http from "../http-common";

const UserDataService = {
  // getAll(page = 0) {
  //   return http.get(`restaurants?page=${page}`);
  // }
  getUserLocalLogIn() {
    return http.get(`/user/login`);
  },
  getOneUser(id: string) {
    return http.get(`/user/${id}`);
  },
  // find(query, by = "name", page = 0) {
  //   return http.get(`restaurants?${by}=${query}&page=${page}`);
  // }
  createUser(data: ISignInForm) {
    return http.post("/user/signin", {data});
  },
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
