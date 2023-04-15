import { Item } from "../../components/Simulation/ControlsPanels/SqControlsPanel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ItemColor {
  BASE = "#84cc16",
  MARKED = "#ecfccb",
  PIVOT = "#FF6666",
  DONE = "#E0E0E0",
}

export interface State {
  data: Item[];
  top: number;
  line: number;
}

interface actionPayload {
  indexList: number[];
  line: number;
}

export type quickSortPayload = Item[] | number | actionPayload;

const initialState = {
  data: [] as Item[],
  line: -1,
  top: 0,
};

const stackSlice = createSlice({
  name: "quickSort",
  initialState,
  reducers: {
    init(state, action: PayloadAction<Item[]>) {
      state.data = action.payload;
      state.line = -1;
      state.top = state.data.length - 1;
    },
    incTop(state) {
        const item = {value:"",key:state.data.length}
        state.data =  [item,...state.data];
        state.line = 11
      },
    setTopValue(state, action: PayloadAction<string>) {
        state.data[0].value = action.payload
        state.line = 12
    },
    markTop(state) {
        state.data[0] = {...state.data[0], color:"#ecfccb"}
        state.line = 4
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload
    },
    setValue(state, action: PayloadAction<string>) {
        state.data[0].value = action.payload
      },
    pop(state) {
      state.data.shift()
      state.line = 6
    },
  },
});

export default stackSlice.reducer;
export const stackActions = stackSlice.actions;
