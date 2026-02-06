import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./navslice"
import chatSlice from "./chatSlice"

const store = configureStore({
    reducer : {
        nav : navSlice,
        chat : chatSlice,
    }
})

export default store;