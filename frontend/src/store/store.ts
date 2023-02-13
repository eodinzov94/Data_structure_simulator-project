import { configureStore } from "@reduxjs/toolkit" 
import authReducer from "./reducers/auth-reducer"
import {reportApi} from "./reducers/report-reducer";

const store = configureStore({
    reducer:{
        //add reducers here
        auth: authReducer,
        [reportApi.reducerPath]: reportApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reportApi.middleware),
});

export default store;




/*********TYPES:**********/
//needed in order to import the state - we use this type in the selcet function in each slice:
export type RootState = ReturnType<typeof store.getState>; 
//we need this type in order to dispatch the action:
export type AppDispatch = typeof store.dispatch