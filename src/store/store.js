import { configureStore } from "@reduxjs/toolkit";
import userReducer from'./Users/usersSlice'


export const store = configureStore({
    reducer:{
        users:userReducer
    },
})