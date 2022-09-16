import {atom} from "recoil";

//--------------------------------------------------------------------------------
// 유저의 로그인 / 로그아웃 확인 및 특정 라우터 접근 제한 기능
//--------------------------------------------------------------------------------
export const isLoggedInState = atom<boolean>({
  key: "user",
  default: false,
});

//--------------------------------------------------------------------------------
// document/contractor 페이지 폼 데이터 저장 기능
//--------------------------------------------------------------------------------
export interface IContractor {
  conpanyName: string;
  name: string;
  phone: string;
  email: string;
}

export const contractorState = atom<IContractor[]>({
  key: "toDo",
  default: [],
});

//--------------------------------------------------------------------------------
// document/docukind 페이지 폼 데이터 저장 기능
//--------------------------------------------------------------------------------
// 문서 종류 추가될 때마다 넣어 줄 것!
export type TDocukind = "free" | "mou" | "labor" | "dept" | "";

export const docukindState = atom<TDocukind>({
  key: "docukind",
  default: "",
});

//--------------------------------------------------------------------------------
// document/write 페이지 tiptap 문서내용 저장 및 document/signning 페이지 뷰어 기능
//--------------------------------------------------------------------------------
export interface IDocuContent {
  writer: string; // 작성자 (로그인한 유저의 세션 쿠키 uid 값)
  title: string; // 문서 제목 (파일 이름)
  content: string; // tiptap text editor 내용
}

export const docuContentState = atom<IDocuContent>({
  key: "docuContent",
  default: {writer: "", title: "", content: ""},
});

//--------------------------------------------------------------------------------
// document/signning 페이지 서명 완료시 POST 요청 전 마지막 모든 데이터 저장 기능
//--------------------------------------------------------------------------------
export interface IDocument {
  contractors: IContractor[];
  docukind: TDocukind;
  documentContent: IDocuContent;
}

export const documentState = atom<IDocument>({
  key: "document",
  default: {
    contractors: [],
    docukind: "",
    documentContent: {
      writer: "",
      title: "",
      content: "",
    },
  },
});
