// redux-toolkit
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
// constants
import http from "@constants/http-common";

type User = {
  id: number;
  company: string;
  name: string;
  phone: string;
  email: string;
};

export interface AuthState {
  loading: boolean;
  user: User[];
  error: string;
}

const initialState: AuthState = {
  loading: false,
  user: [],
  error: "",
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  return http
    .post(`/user`)
    .then((response) => response.data.map((user: User) => user.id));
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.error =
        action.error.message || "Something went wrong, please check userSlice";
    });
  },
});

export default userSlice.reducer;
