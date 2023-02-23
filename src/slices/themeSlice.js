import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: { theme: 'light' },
    reducers: {
        setThemeLight: (state) => { state.theme = 'light'; },
        setThemeDark: (state) => { state.theme = 'dark'; },
        switchTheme: (state) => { state.theme = state.theme === 'light' ? 'dark' : 'light'; }
    }
});

export const { setThemeLight, setThemeDark, switchTheme } = themeSlice.actions;
export default themeSlice.reducer;