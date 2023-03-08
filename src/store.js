import { combineReducers, configureStore } from "@reduxjs/toolkit";

import themeReducer from "./slices/themeSlice";
import initialSecondsReducer from './slices/initialSecondsSlice'
import breakSecondsReducer from './slices/breakSecondsSilce'

const reducers = combineReducers({
    theme: themeReducer,
    initialSeconds: initialSecondsReducer,
    breakSeconds: breakSecondsReducer
});

export default configureStore({
    reducer: reducers,
    devTools: true
});