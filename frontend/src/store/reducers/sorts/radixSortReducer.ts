import { numbersToSortItems } from "../../../components/Simulation/Sorts/helpers/functions";
import { sortItem } from "../../../components/Simulation/Sorts/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  data: sortItem[];
  sortData: sortItem[];
  i: number;
  line: number;
  currDigit: number;
}

interface actionPayload {
  payload: number;
  line: number;
}

const initialState: State = {
  data: [] as sortItem[],
  sortData: [] as sortItem[],
  i: -1,
  currDigit: -1,
  line: -1,
};

const radixSortSlice = createSlice({
  name: "radixsort",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<number[]>) {
      state = { ...initialState };
      state.data = numbersToSortItems(action.payload);
      //state.sortData = numbersToSortItems(state.data.map(e => e.value!%10));
      for (let item of state.data) {
        item.digit = -1;
      }
      return state;
    },
    setSortData(state, action: PayloadAction<number>) {
      if (action.payload === -1) {
        state.sortData = [] as sortItem[];
      } else {
        state.line = 3;
        for (let item of state.data) {
          let val = Math.floor((item.value / Math.pow(10,action.payload))) % 10;
          item.digit = val;
          state.sortData = numbersToSortItems(state.data.map((e) => e.digit!));
        }
      }
      return state;
    },
    sort(state) {
      state.line = 4;
      state.data = state.data.sort((a, b) => a.digit! - b.digit!);
      state.sortData = state.sortData.sort((a, b) => a.value - b.value);
      return state;
    },
    setCurrentDigit(state, action: PayloadAction<number>){
      state.line = 1;
      state.currDigit = action.payload;
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload;
    },
    initAnimation(state) {
      state = {...initialState}
    },
    setState(state, action: PayloadAction<State>) {
      return action.payload;
    },
  },
});

export default radixSortSlice.reducer;
export const radixSortActions = radixSortSlice.actions;
