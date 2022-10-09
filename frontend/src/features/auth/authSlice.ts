import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import AuthDataService from "services/auth";
import {ILogInForm} from "Components/Auth/auth";

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

export const fetchLogin = createAsyncThunk(
  "auth/local-login",
  async ({email, password}: ILogInForm) => {
    const response = await AuthDataService.login({email, password});
    return response.data;
  }
);

export const fetchLogout = createAsyncThunk("auth/logout", async () => {
  const response = await AuthDataService.logout();
  return response.data;
});

export const fetchRefresh = createAsyncThunk("auth/refresh", async () => {
  const response = await AuthDataService.refreshToken();
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //--------------------------------------------------------------------------------
    // fetchLogin
    //--------------------------------------------------------------------------------
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchLogin.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error =
        action.error.message || "Something went wrong, please check fetchlogin";
    });

    //--------------------------------------------------------------------------------
    // fetchLogout
    //--------------------------------------------------------------------------------
    builder.addCase(fetchLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchLogout.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchLogout.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = {};
      state.error =
        action.error.message ||
        "Something went wrong, please check fetchLogout";
    });

    //--------------------------------------------------------------------------------
    // fetchRefresh
    //--------------------------------------------------------------------------------
    builder.addCase(fetchRefresh.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchRefresh.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchRefresh.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error =
        action.error.message ||
        "Something went wrong, please check fetchRefresh";
    });
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
