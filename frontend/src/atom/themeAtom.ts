import {atom} from "recoil";

//--------------------------------------------------------------------------------
// 다크 모드 테마 / 라이트 모드 테마 토글 기능
//--------------------------------------------------------------------------------
export const isDarkState = atom<boolean>({
  key: "theme",
  default: false,
});