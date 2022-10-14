// redux-toolkit
import {configureStore} from "@reduxjs/toolkit";
// features
import authReducer from "@features/auth/authSlice";
import userReducer from "@features/user/userSlice";
import documentReducer from "@features/document/documentSlice";
import themeReducer from "@features/theme/themeSlice";
import alertReducer from "@features/alert/alertSlice";

// import {createLogger} from "redux-logger";
// const logger = createLogger();

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    document: documentReducer,
    theme: themeReducer,
    alert: alertReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// useDispatch, useSelect를 사용할 때 필요
export type AppDispatch = typeof store.dispatch;
