import { createSlice } from "@reduxjs/toolkit";

export const numberOfTimesSlice = createSlice({
    name: 'numberOfTimes',
    initialState: 0,
    reducers: {
        setNumberOfTimes: (state, action) => { state = action.payload; return state; }
    }
});

export const { setNumberOfTimes } = numberOfTimesSlice.actions;
export default numberOfTimesSlice.reducer;