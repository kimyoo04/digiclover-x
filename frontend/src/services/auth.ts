import {ILogInForm} from "Components/style/auth";
import http from "../http-common";

const AuthDataService = {
  // Post - 로컬 로그인

  login({email, password}: ILogInForm) {
    return http.post(`/auth/local-login`, {email, password});
  },

  // Post - 로그아웃

  logout() {
    return http.post(`/auth/logout`);
  },
};

export default AuthDataService;
