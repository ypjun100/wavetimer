import { combineReducers, configureStore } from "@reduxjs/toolkit";

import themeReducer from "./slices/themeSlice";
import initialSecondsReducer from './slices/initialSecondsSlice'

const reducers = combineReducers({
    theme: themeReducer,
    initialSeconds: initialSecondsReducer
});

export default configureStore({
    reducer: reducers,
    devTools: true
});