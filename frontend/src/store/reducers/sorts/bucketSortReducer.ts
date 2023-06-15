import { numbersToSortItems } from "../../../components/Simulation/Sorts/helpers/functions";
import { sortItem } from "../../../components/Simulation/Sorts/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemColor } from "./quickSortReducer";

export interface Bucket {
  title: string;
  data: sortItem[];
  index: number;
}

export interface State {
  data: sortItem[];
  buckets: Bucket[];
  line: number;
  bucketIndex: number;
}

interface actionLinePayload {
  payload: Payload;
  line: number;
}

interface setBucketPayload {
  items: sortItem[];
  bucketIndex: number;
}
type Payload = setBucketPayload | Bucket | number | Bucket[];

export type BucketSortPayload =
  | actionLinePayload
  | number[]
  | number
  | undefined;

const initialState: State = {
  data: [] as sortItem[],
  buckets: [] as Bucket[],
  line: -1,
  bucketIndex: -1,
};

const bucketSortSlice = createSlice({
  name: "bucketsort",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<number[]>) {
      state = {...initialState};
      state.data = numbersToSortItems(action.payload);
      return state;
    },
    pushData(state, action: PayloadAction<actionLinePayload>) {
      const index = action.payload.payload as number;
      state.data = [
        ...state.data,
        ...state.buckets[index].data.map((e) => ({
          ...e,
          color: ItemColor.BASE,
        })),
      ];
      state.line = action.payload.line;
    },
    setBuckets(state, action: PayloadAction<actionLinePayload>) {
      state.buckets = [...action.payload.payload as Bucket[]];
      state.line = action.payload.line;
    },
    markElement(state, action: PayloadAction<actionLinePayload>) {
      state.data[action.payload.payload as number].color = ItemColor.MARKED;
      state.line = action.payload.line;
    },
    markBucket(state, action: PayloadAction<actionLinePayload>) {
      const index = action.payload.payload as number;
      for (let item of state.buckets[index].data) item.color = ItemColor.MARKED;
      state.line = action.payload.line;
    },
    pushToBucket(state, action: PayloadAction<actionLinePayload>) {
      state.buckets[action.payload.payload as number].data.push(state.data[0]);
      state.line = action.payload.line;
    },
    removeFromStart(state, action: PayloadAction<number>) {
      state.data = [...state.data.slice(1)];
      state.line = action.payload;
      return state;
    },
    setBucketData(state, action: PayloadAction<actionLinePayload>) {
      const { items, bucketIndex } = action.payload.payload as setBucketPayload;
      state.buckets[bucketIndex].data = items;
      state.line = action.payload.line;
    },
    sortBucket(state, action: PayloadAction<actionLinePayload>){
        const bucketIndex = action.payload.payload as number;
        state.buckets[bucketIndex].data.sort((a,b)=>a.value-b.value)
        state.line=action.payload.line;
    },
    setBucketIndex(state, action: PayloadAction<actionLinePayload>){
      state.bucketIndex = action.payload.payload as number;
      state.line = action.payload.line;
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload;
    },
    setState(state, action: PayloadAction<State>) {
      return action.payload;
    },
  },
});

export default bucketSortSlice.reducer;
export const bucketSortActions = bucketSortSlice.actions;
