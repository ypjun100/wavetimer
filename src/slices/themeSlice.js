import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: { theme: 'light' },
    reducers: {
        setLightTheme: (state) => { state.theme = 'light'; },
        setDarkTheme: (state) => { state.theme = 'dark'; },
        switchTheme: (state) => { state.theme = state.theme === 'light' ? 'dark' : 'light'; }
    }
});

export const { setLightTheme, setDarkTheme, switchTheme } = themeSlice.actions;
export default themeSlice.reducer;