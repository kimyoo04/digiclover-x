// redux-toolkit
import {createSlice} from "@reduxjs/toolkit";

type User = {
  id?: string;
  name?: string;
  email?: string;
};

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User;
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
    signin(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      console.log(action.payload);
    },
    signout(state) {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
