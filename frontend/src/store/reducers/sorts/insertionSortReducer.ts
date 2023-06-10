import { numbersToSortItems } from "../../../components/Simulation/Sorts/helpers/functions";
import { sortItem } from "../../../components/Simulation/Sorts/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ItemColor {
  BASE = "#84cc16",
  MARKED = "#ecfccb",
}

export interface State {
  data: sortItem[];
  i: number;
  j: number;
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
  i: -2,
  j: -2,
  line: -1,
};

const insertionSortSlice = createSlice({
  name: "insertionsort",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<number[]>) {
      state = { ...initialState };
      state.data = numbersToSortItems(action.payload);
      return state;
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload;
    },
    setI(state, action: PayloadAction<actionPayload>) {
      state.i = action.payload.indexList[0];
      state.line = action.payload.line;
    },
    setJ(state, action: PayloadAction<actionPayload>) {
      state.j = action.payload.indexList[0];
      state.line = action.payload.line;
    },
    setKey(state, action: PayloadAction<actionPayload>) {
      state.keyValue = action.payload.indexList[0];
      state.line = action.payload.line;
    },
    changeElement(state, action: PayloadAction<actionPayload>) {
      //change element value and mark the element
      const { indexList, line } = action.payload;
      state.data[indexList[0]].value = indexList[1];
      state.data[indexList[0]].color = ItemColor.MARKED;
      state.line = line;
    },
    unmark(state, action: PayloadAction<actionPayload>) {
      //change element value and mark the element
      const { indexList, line } = action.payload;
      state.data[indexList[0]].color = ItemColor.BASE;
      state.line = line;
    },
    initAnimation(state) {
      state.i = -2;
      state.j = -2;
      state.line = -1;
      state.keyValue = undefined;
    },
    setState(state, action: PayloadAction<State>) {
      return action.payload;
    },
  },
});

export default insertionSortSlice.reducer;
export const insertionSortActions = insertionSortSlice.actions;
