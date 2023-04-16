import { configureStore } from "@reduxjs/toolkit" 
import authReducer from "./reducers/auth-reducer"
import {reportApi} from "./reducers/report-reducer";
import { authApi } from './reducers/auth-reducer-api'
import countingSortReducer from "./reducers/countingSortReducer";
import quickSortReducer from "./reducers/quickSortReducer";
import stackReducer from "./reducers/stackReducer";

const store = configureStore({
    reducer:{
        //add reducers here
        auth: authReducer,
        countingSort: countingSortReducer ,
        quickSort: quickSortReducer,
        stack: stackReducer,
        [reportApi.reducerPath]: reportApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([reportApi.middleware,authApi.middleware])

});

export default store;


/*********TYPES:**********/
//needed in order to import the state - we use this type in the selcet function in each slice:
export type RootState = ReturnType<typeof store.getState>; 
//we need this type in order to dispatch the action:
export type AppDispatch = typeof store.dispatch