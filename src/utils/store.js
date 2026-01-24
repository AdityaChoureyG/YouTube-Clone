import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./navslice"

const store = configureStore({
    reducer : {
        nav : navSlice,
    }
})

export default store;