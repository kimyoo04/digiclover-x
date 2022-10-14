// modules
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
// constants
import http from "@constants/http-common";
// components
import {ISignInForm} from "@components/Auth/auth";
import {ILogInForm} from "@components/Auth/auth";
import {setCookie} from "@util/cookie";
import {removeUser} from "@util/auth";
// dotenv
dotenv.config({path: __dirname + "/.env"});
declare var process: {
  env: {
    JWT_SECRET_KEY: string;
  };
};

const AuthDataService = {
  // Post - 회원가입

  async createOneUser(data: ISignInForm) {
    return http.post("/auth/signin", {data});
  },

  // Post - 로컬 로그인

  async login({email, password}: ILogInForm) {
    const response = await http.post(`/auth/local-login`, {email, password});
    const jwtToken = await response.data;

    // 쿠키에 토큰 저장
    setCookie("accessJwtToken", jwtToken);

    // 토큰 decode
    const decodedUserId = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    localStorage.setItem("user", JSON.stringify(decodedUserId)); //토큰에 저장되어있는 userID
  },

  // Post - 로그아웃

  async logout() {
    return http.post(`/auth/logout`).then(() => removeUser());
  },

  // Get - 토큰 재발급 및 로그인 유지

  async refreshToken() {
    return http.get(`/auth/refresh-token`);
  },
};

export default AuthDataService;
