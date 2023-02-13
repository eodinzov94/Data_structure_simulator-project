import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "../store";

interface UserData{
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    isAdmin:boolean
}

interface AuthState{
    user:UserData | null,
    isLogin:boolean,
    token:string | null
}

interface LoginPayload{
    email:string
    password:string
}

//need to change the isLogin to false.
const initialState:AuthState = {user:null,isLogin:true,token:null};

const authSlice = createSlice({
    name:'auth' ,
    initialState,
    reducers:{
        login(state, action:PayloadAction<LoginPayload>){
            console.log(action.payload.password,action.payload.email);
            state.isLogin = true;
            
        },
        logout(state){
            state={...initialState};
        }
    }
});



export default authSlice.reducer;
export const {login,logout} = authSlice.actions;
export const selectAuthentication = (state: RootState) => state.auth; //use this const in useSelecter in the componnent to select this slice