import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: 'light',
    reducers: {
        setLightTheme: () => { return 'light'; },
        setDarkTheme: () => { return 'dark'; },
        switchTheme: (state) => { return state === 'light' ? 'dark' : 'light'; }
    }
});

export const { setLightTheme, setDarkTheme, switchTheme } = themeSlice.actions;
export default themeSlice.reducer;