import { configureStore } from "@reduxjs/toolkit" 
import authReducer from "./reducers/auth-reducer"

const store = configureStore({
    reducer:{
        //add reducers here
        auth: authReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch