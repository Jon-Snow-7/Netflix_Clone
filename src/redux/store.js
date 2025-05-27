import { configureStore } from "@reduxjs/toolkit";
import continueReducer from './slice/continueSlice';
export const store=configureStore({
    reducer:{
        continue:continueReducer,
    }
})