import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth-reducer";
import {reportApi} from "./reducers/report-reducer";
import {authApi} from "./reducers/auth-reducer-api";
import heapReducer from "./reducers/alghoritms/heap-reducer";
import countingSortReducer from "./reducers/sorts/countingSortReducer";
import quickSortReducer from "./reducers/sorts/quickSortReducer";
import stackReducer from "./reducers/stackReducer";
import {feedbackApi} from "./reducers/feedback-reducer";
import bstReducer from "./reducers/alghoritms/bst-reducer";
import queueReducer from "./reducers/queueReducer";
import animationControlReducer from "./reducers/animation-control-reducer";
import insertionSortReducer from "./reducers/sorts/insertionSortReducer";
import mergeSortReducer from "./reducers/sorts/mergeSortReducer";
import bucketSortReducer from "./reducers/sorts/bucketSortReducer";
import radixSortReducer from "./reducers/sorts/radixSortReducer";

const store = configureStore({
  reducer: {
    //add reducers here
    auth: authReducer,
    stack: stackReducer,
    queue: queueReducer,
    heap: heapReducer,
    bst: bstReducer,
    countingSort: countingSortReducer,
    quickSort: quickSortReducer,
    insertionSort: insertionSortReducer,
    mergeSort: mergeSortReducer,
    bucketSort: bucketSortReducer,
    radixSort: radixSortReducer,
    animationController: animationControlReducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat([ // serializableCheck: false - do not delete!
      reportApi.middleware,
      authApi.middleware,
      feedbackApi.middleware,
    ]),
});

export default store;

/*********TYPES:**********/
//needed in order to import the state - we use this type in the select function in each slice:
export type RootState = ReturnType<typeof store.getState>;
//we need this type in order to dispatch the action:
export type AppDispatch = typeof store.dispatch;
