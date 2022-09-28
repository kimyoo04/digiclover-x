import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import http from "http-common";

type User = {
  id: number;
  company: string;
  name: string;
  phone: string;
  email: string;
};

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | object;
  error: string;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  error: "",
};

export const fetchAuth = createAsyncThunk(
  "auth/local-login",
  async (email, password) => {
    return http
      .post(`/auth/local-login`, {email, password})
      .then((response) => response.data.map((user: User) => user.id));
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAuth.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error =
        action.error.message || "Something went wrong, please check authSlice";
    });
  },
});

export default authSlice.reducer;
