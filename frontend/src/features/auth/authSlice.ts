// redux-toolkit
import {createSlice} from "@reduxjs/toolkit";
import {AuthState} from "@constants/types/user";

const initialState: AuthState = {
  loading: false,
  provider: "local",
  isAuthenticated: false,
  user: {id: "", company: "", name: "", email: "", phone: "", uid: ""},
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
