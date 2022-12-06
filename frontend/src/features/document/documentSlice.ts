// redux-toolkit
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// types
import {DocumentState, IDocumentData} from "@constants/types/document";
import {DocuKind} from "@constants/types/docukind";
import {IContractor} from "@constants/types/contractor";

const initialState: DocumentState = {
  step: 1,
  isBack: false,
  isNew: true,
  contractors: [],
  documentID: "",
  docuKind: "",
  docuTitle: "",
  docuContent: "",
  error: "",
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    // ----------------------------------------------------------------------
    initialDocumentData(state) {
      state.step = 1;
      state.isBack = false;
      state.isNew = true;
      state.contractors = [];
      state.docuKind = "";
      state.docuTitle = "";
      state.docuContent = "";
      state.error = "";
    },
    afterContractors(state, action: PayloadAction<IContractor[]>) {
      state.step += 1;
      state.isBack = false;
      state.contractors = action.payload;
    },
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    beforeDocukind(state) {
      state.step = 1;
      state.isBack = true;
    },
    afterDocukind(state, action: PayloadAction<DocuKind>) {
      state.step += 1;
      state.isBack = false;
      state.docuKind = action.payload;
    },
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    beforeWriting(state) {
      state.step = 2;
      state.isBack = true;
    },
    saveDocuTitle(state, action: PayloadAction<string>) {
      state.docuTitle = action.payload;
    },
    afterWritingDocuTitle(state) {
      state.step += 1;
      state.isBack = false;
    },
    afterWritingDocuContent(state, action: PayloadAction<string>) {
      state.isBack = false;
      state.docuContent = action.payload;
    },
    enterWriting(state, action: PayloadAction<IDocumentData>) {
      state.step = 3;
      state.isBack = false;
      state.isNew = false;

      state.contractors = action.payload.contractors;
      state.documentID = action.payload.id;
      state.docuTitle = action.payload.docuTitle;
      state.docuKind = action.payload.docuKind;
      state.docuContent = action.payload.docuContent;
    },
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    beforeSignning(state) {
      state.step = 3;
      state.isBack = true;
    },
    afterSignning(state) {
      state.step += 1;
      state.isBack = false;
    },
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    beforeSignaturePlacing(state) {
      state.step = 4;
      state.isBack = true;
    },
    afterSignaturePlacing(state) {
      state.step += 1;
      state.isBack = false;
      //  구현 필요-----------------------------------------------------------------
    },
    enterSignaturePlacing(state, action: PayloadAction<IDocumentData>) {
      state.step = 5;
      state.isBack = false;
      state.isNew = false;

      state.contractors = action.payload.contractors;
      state.documentID = action.payload.id;
      state.docuTitle = action.payload.docuTitle;
      state.docuKind = action.payload.docuKind;
      state.docuContent = action.payload.docuContent;
    },
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    beforeEmail(state) {
      state.step = 5;
      state.isBack = true;
    },
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    saveDocumentID(state, action: PayloadAction<string>) {
      state.documentID = action.payload;
    },
  },
});

export const documentActions = documentSlice.actions;
export default documentSlice.reducer;
