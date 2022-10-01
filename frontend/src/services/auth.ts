import {ILogInForm} from "Components/style/auth";
import http from "../http-common";

const AuthDataService = {
  // Post - 로컬 로그인

  getUserLocalLogIn({email, password}: ILogInForm) {
    return http.post(`/auth/local-login`, {email, password});
  },

  // Post - 로그아웃

  getUserLogOut() {
    return localStorage.removeItem("authToken");
  },
};

export default AuthDataService;
