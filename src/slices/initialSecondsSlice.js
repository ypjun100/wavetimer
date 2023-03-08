import { createSlice } from '@reduxjs/toolkit';

export const initialSecondsSlice = createSlice({
    name: 'initialSeconds',
    initialState: 3600,
    reducers: {
        setInitialSeconds: (state, action) => { state = action.payload; return state; }
    }
});

export const { setInitialSeconds } = initialSecondsSlice.actions;
export default initialSecondsSlice.reducer;