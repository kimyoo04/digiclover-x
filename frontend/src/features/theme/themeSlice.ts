// redux-toolkit
import {createSlice} from "@reduxjs/toolkit";

interface ITheme {
  isDark: boolean;
}

const initialState: ITheme = {
  isDark: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
  },
});

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;
