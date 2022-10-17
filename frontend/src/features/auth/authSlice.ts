// redux-toolkit
import {createSlice} from "@reduxjs/toolkit";

type initUser = {
  id?: string;
  name?: string;
  email?: string;
};

export interface AuthState {
  loading: boolean;
  provider: string;
  isAuthenticated: boolean;
  user: initUser;
  error: string;
}

export interface IUser {
  company: string;
  name: string;
  email: string;
  phone: string;
}

const initialState: AuthState = {
  loading: false,
  provider: "local",
  isAuthenticated: false,
  user: {},
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    signout(state) {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
