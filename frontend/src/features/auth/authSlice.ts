// redux-toolkit
import {createSlice} from "@reduxjs/toolkit";

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin(state) {
      state.isAuthenticated = true;
    },
    signout(state) {
      state.isAuthenticated = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
