import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchAsyncUsers = createAsyncThunk('users/fetchAsyncUsers', async ()=>{
    const response = await api.get();
    return response.data 
})


const initialState = {
    users:[]
} 

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        addUsers:(state,{payload})=>{
            state.users = payload; 
        },
    },
    extraReducers:{
        [fetchAsyncUsers.pending]:()=>{
            console.log("pending");

        },
        [fetchAsyncUsers.fulfilled]:(state,{payload})=>{
            console.log("Sucess");
            return{...state, users: payload}

        },
        [fetchAsyncUsers.rejected]:()=>{
            console.log("Rejected");

        },

    }

});

export const {addUsers} = userSlice.actions;
export const getAllUsers =(state) => state.users.users;
export default userSlice.reducer;