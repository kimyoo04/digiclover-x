import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type DocuKind = "자유양식" | "MOU" | "근로계약서" | "차용증" | "";

export interface IDocuTitle {
  docuTitle: string;
}

export interface IContractor {
  companyName: string;
  name: string;
  email: string;
}

export interface DocumentState {
  step: number;
  contractors: IContractor[];
  docuKind: DocuKind;
  docuTitle: string;
  docuContent: string;
  imgUrl: string;
  error: string;
}

const initialState: DocumentState = {
  step: 1,
  contractors: [],
  docuKind: "",
  docuTitle: "",
  docuContent: "",
  imgUrl: "",
  error: "",
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    // 문서 작성 시작 버튼 및 문서 작성 중간 초기화 버튼 기능
    // 이메일 전송 후 모든 값 초기화
    initialDocumentData(state) {
      state.step = 1;
      state.contractors = [];
      state.docuKind = "";
      state.docuTitle = "";
      state.docuContent = "";
      state.imgUrl = "";
      state.error = "";
    },

    // contractor 로 돌아가기
    afterContractors(state, action: PayloadAction<IContractor[]>) {
      state.step += 1;
      state.contractors = action.payload;
    },

    // contractor 로 돌아가기
    beforeDocukind(state) {
      state.step = 1;
    },

    // 문서 종류 저장
    afterDocukind(state, action: PayloadAction<DocuKind>) {
      state.step += 1;
      state.docuKind = action.payload;
    },

    // docukind 로 돌아가기
    beforeWriting(state) {
      state.step = 2;
    },

    // 문서 제목 저장
    afterWritingDocuTitle(state, action: PayloadAction<string>) {
      state.step += 1;
      state.docuTitle = action.payload;
    },

    // 문서 내용 저장
    afterWritingDocuContent(state, action: PayloadAction<string>) {
      state.docuContent = action.payload;
    },

    // writing 으로 돌아가기
    beforeSignning(state) {
      state.step = 3;
    },

    // 서명 후 DB 저장용 데이터 완성
    afterSignning(state, action: PayloadAction<string>) {
      state.step += 1;
      state.imgUrl = action.payload;
    },
    // writing 으로 돌아가기
    beforeSignaturePlacing(state) {
      state.step = 4;
    },

    // 서명한 png 파일 x, y 좌표 얻기
    afterSignaturePlacing(state) {
      state.step += 1;
      //  구현 필요-----------------------------------------------------------------
    },

    // signning 으로 돌아가기
    beforeEmail(state) {
      state.step = 5;
    },
  },
});

export const documentActions = documentSlice.actions;
export default documentSlice.reducer;
