import {ILogInForm} from "Components/Style/auth";
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

  // Get - 토큰 재발급 및 로그인 유지

  refreshToken() {
    return http.get(`/auth/refresh-token`);
  },
};

export default AuthDataService;
