import { createSlice } from "@reduxjs/toolkit";

export const breakSecondsSlice = createSlice({
    name: 'breakSeconds',
    initialState: 0,
    reducers: {
        setBreakSeconds: (state, action) => { state = action.payload; return state; }
    }
});

export const { setBreakSeconds } = breakSecondsSlice.actions;
export default breakSecondsSlice.reducer;