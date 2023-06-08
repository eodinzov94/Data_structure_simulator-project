import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth-reducer";
import { reportApi } from "./reducers/report-reducer";
import { authApi } from "./reducers/auth-reducer-api";
import heapReducer from "./reducers/alghoritms/heap-reducer";
import countingSortReducer from "./reducers/sorts/countingSortReducer";
import quickSortReducer from "./reducers/sorts/quickSortReducer";
import stackReducer from "./reducers/stackReducer";
import { feedbackApi } from "./reducers/feedback-reducer";
import queueReducer from "./reducers/queueReducer";
import animationControlReducer from "./reducers/animation-control-reducer";
import insertionSortReducer from "./reducers/sorts/insertionSortReducer";
import bucketSortReducer from "./reducers/sorts/bucketSortReducer";
import radixSortReducer from "./reducers/sorts/radixSortReducer";

const store = configureStore({
  reducer: {
    //add reducers here
    auth: authReducer,
    countingSort: countingSortReducer,
    quickSort: quickSortReducer,
    insertionSort: insertionSortReducer,
    bucketSort: bucketSortReducer,
    radixSort: radixSortReducer,
    stack: stackReducer,
    queue: queueReducer,
    heap: heapReducer,
    animationController: animationControlReducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      reportApi.middleware,
      authApi.middleware,
      feedbackApi.middleware,
    ]),
});

export default store;

/*********TYPES:**********/
//needed in order to import the state - we use this type in the selcet function in each slice:
export type RootState = ReturnType<typeof store.getState>;
//we need this type in order to dispatch the action:
export type AppDispatch = typeof store.dispatch;
