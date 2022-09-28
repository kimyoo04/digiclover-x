import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import http from "http-common";

type Document = {
  id: number;
  company: string;
  name: string;
  phone: string;
  email: string;
};

export interface DocumentState {
  loading: boolean;
  documents: Document[];
  error: string;
}

const initialState: DocumentState = {
  loading: false,
  documents: [],
  error: "",
};

export const fetchDocuments = createAsyncThunk(
  "document/fetchAllDocuments",
  async () => {
    return http
      .get(`/documents`)
      .then((response) =>
        response.data.map((documents: Document) => documents.id)
      );
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDocuments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchDocuments.fulfilled,
      (state, action: PayloadAction<Document[]>) => {
        state.loading = false;
        state.documents = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.loading = false;
      state.documents = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default documentSlice.reducer;
