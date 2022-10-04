import {configureStore} from "@reduxjs/toolkit";
import {createLogger} from "redux-logger";

import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import documentReducer from "../features/document/documentSlice";
import themeSlice from "features/theme/themeSlice";

const logger = createLogger();

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    document: documentReducer,
    theme: themeSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// useDispatch, useSelect를 사용할 때 필요
export type AppDispatch = typeof store.dispatch;
