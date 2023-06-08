import { numbersToSortItems } from "../../../components/Simulation/Sorts/helpers/functions";
import { sortItem } from "../../../components/Simulation/Sorts/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface State {
  data: sortItem[];
  sortData: sortItem[];
  i: number;
  line: number;
  keyValue?: number;
}

interface actionPayload {
  indexList: number[];
  line: number;
}

export type insertionSortPayload =
  | number[]
  | number
  | actionPayload
  | undefined;

const initialState: State = {
  data: [] as sortItem[],
  sortData: [] as sortItem[],
  i: -1,
  line: -1,
};

const radixSortSlice = createSlice({
  name: "radixsort",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<number[]>) {
      state = { ...initialState };
      state.data = numbersToSortItems(action.payload);
      state.sortData = numbersToSortItems(state.data.map(e => e.value!%10));
      for(let item of state.data){
        item.digit = item.value%10;
      }
      return state;
    },
    sort(state){
      state.data = state.data.sort((a,b) => a.digit! - b.digit!)
      state.sortData = state.sortData.sort((a,b) => a.value - b.value)
      return state;
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload;
    },
    initAnimation(state) {
      state.i = -1;
      state.line = -1;
      state.keyValue = undefined;
    },
    setState(state, action: PayloadAction<State>) {
      return action.payload;
    },
  },
});

export default radixSortSlice.reducer;
export const radixSortActions = radixSortSlice.actions;
