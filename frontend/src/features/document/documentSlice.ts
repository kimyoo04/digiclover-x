// redux-toolkit
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// types
import {DocuKind, DocumentState, IContractor} from "@constants/types/document";

const initialState: DocumentState = {
  step: 1,
  isBack: false,
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
    // ----------------------------------------------------------------------
    // 문서 작성 시작 버튼 및 문서 작성 중간 초기화 버튼 기능
    // 이메일 전송 후 모든 값 초기화
    initialDocumentData(state) {
      state.step = 1;
      state.isBack = false;
      state.contractors = [];
      state.docuKind = "";
      state.docuTitle = "";
      state.docuContent = "";
      state.imgUrl = "";
      state.error = "";
    },
    // contractor 저장
    afterContractors(state, action: PayloadAction<IContractor[]>) {
      state.step += 1;
      state.isBack = false;
      state.contractors = action.payload;
    },
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    // contractor 로 돌아가기
    beforeDocukind(state) {
      state.step = 1;
      state.isBack = true;
    },
    // 문서 종류 저장
    afterDocukind(state, action: PayloadAction<DocuKind>) {
      state.step += 1;
      state.isBack = false;
      state.docuKind = action.payload;
    },
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    // docukind 로 돌아가기
    beforeWriting(state) {
      state.step = 2;
      state.isBack = true;
    },
    // 문서 제목 임시 저장
    saveDocuTitle(state, action: PayloadAction<string>) {
      state.docuTitle = action.payload;
    },
    // 문서 제목 저장
    afterWritingDocuTitle(state, action: PayloadAction<string>) {
      state.step += 1;
      state.isBack = false;
    },
    // 문서 내용 저장
    afterWritingDocuContent(state, action: PayloadAction<string>) {
      state.isBack = false;
      state.docuContent = action.payload;
    },
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    // writing 으로 돌아가기
    beforeSignning(state) {
      state.step = 3;
      state.isBack = true;
    },
    // 서명 후 DB 저장용 데이터 완성
    afterSignning(state, action: PayloadAction<string>) {
      state.step += 1;
      state.isBack = false;
      state.imgUrl = action.payload;
    },
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    // signning 으로 돌아가기
    beforeSignaturePlacing(state) {
      state.step = 4;
      state.isBack = true;
    },
    // 서명한 png 파일 x, y 좌표 얻기
    afterSignaturePlacing(state) {
      state.step += 1;
      state.isBack = false;
      //  구현 필요-----------------------------------------------------------------
    },
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    // signning 으로 돌아가기
    beforeEmail(state) {
      state.step = 5;
      state.isBack = true;
    },
  },
});

export const documentActions = documentSlice.actions;
export default documentSlice.reducer;
