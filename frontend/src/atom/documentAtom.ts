import {atom} from "recoil";

//--------------------------------------------------------------------------------
// document 페이지들에 순서 대로 접근하는지 체크 기능
//--------------------------------------------------------------------------------
export const docuProcessState = atom<number>({
  key: "docuProcess",
  default: 0,
});

//--------------------------------------------------------------------------------
// document/contractor 페이지 폼 데이터 저장 기능
//--------------------------------------------------------------------------------
export interface IContractor {
  companyName: string;
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
export interface IDocuKind {
  docuKind: "자유양식" | "MOU" | "근로계약서" | "차용증" | string;
}

export const docuKindState = atom<IDocuKind>({
  key: "docuKind",
  default: {docuKind: ""},
});

//--------------------------------------------------------------------------------
// document/writing 페이지 폼 데이터 저장 기능
//--------------------------------------------------------------------------------
// 문서 종류 추가될 때마다 넣어 줄 것!
export interface IDocuTitle {
  docuTitle: string;
}

export const docuTitleState = atom<IDocuTitle>({
  key: "docuTitle",
  default: {docuTitle: ""},
});

//--------------------------------------------------------------------------------
// document/writing 페이지 tiptap 문서내용 저장 및 document/signning 페이지 뷰어 기능
//--------------------------------------------------------------------------------
export interface IDocuContent {
  docuContent: string; // tiptap text editor 내용
}

export const docuContentState = atom<IDocuContent>({
  key: "docuContent",
  default: {docuContent: ""},
});

//--------------------------------------------------------------------------------
// document/signning 페이지 서명 완료시 POST 요청 전 마지막 모든 데이터 저장 기능
//--------------------------------------------------------------------------------
export interface IDocuInfo {
  docuKind: "자유양식" | "MOU" | "근로계약서" | "차용증" | string;
  docuTitle: string;
  docuContent: string;
}

export interface IDocuAll {
  contractors: IContractor[];
  docuInfo: IDocuInfo;
  imgUrl: string;
}

export const docuAllState = atom<IDocuAll>({
  key: "docuAll",
  default: {
    contractors: [],
    docuInfo: {
      docuKind: "",
      docuTitle: "",
      docuContent: "",
    },
    imgUrl: "",
  },
});
