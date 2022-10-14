// modules
import {getCookie, removeCookie} from "./cookie";

// 로그인 - localStorage 에 저장

export const getUser = () => {
  const userInfo =
    localStorage.getItem("user") && getCookie("accessJwtToken")
      ? JSON.parse(localStorage.getItem("user")!)
      : null;
  return userInfo;
};

// 로그아웃 - localStorage 에서 삭제

export const removeUser = () => {
  removeCookie("accessJwtToken");
  localStorage.clear();
};
