import { numbersToSortItems } from "../../components/Simulation/Sorts/helpers/functions";
import {
  Colors,
  sortItem,
} from "../../components/Simulation/Sorts/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  A: sortItem[];
  B: sortItem[];
  C: sortItem[];
  k: number;
  indexA: number;
  indexB: number;
  indexC: number;
  line: number;
}

interface initPayload {
  data: number[];
  arr_name: string;
  line?: number;
}

interface indexPayload {
  index: number;
  arr_name: string;
  line: number;
}

interface selectItem {
  index: number;
  arr_name: string;
}

interface colorPayload {
  items: selectItem[];
  val: Colors;
  line: number;
}

interface valuePayload {
  index: number;
  arr_name: string;
  value: number;
}

export type countingSortPayload =
  | initPayload
  | indexPayload
  | colorPayload
  | undefined
  | number
  | valuePayload;


const initialState = {
  A: [] as sortItem[],
  B: [] as sortItem[],
  C: [] as sortItem[],
  k: 0,
  indexA: -2,
  indexB: -2,
  indexC: -2,
  line: -1,
};

const countingSortSlice = createSlice({
  name: "countingSort",
  initialState,
  reducers: {
    init(state, action: PayloadAction<initPayload>) {
      const { data, arr_name, line } = action.payload;
      let arr;
      switch (arr_name) {
        case "A": {
          arr = numbersToSortItems(data);
          state.A = arr;
          state.k = Math.max(...data);
          break;
        }
        case "B": {
          arr = numbersToSortItems(data);
          state.B = arr;
          break;
        }
        case "C": {
          arr = numbersToSortItems(data);
          state.C = arr;
          break;
        }
      }
      if (line !== undefined) state.line = line;
      return state;
    },
    setIndex(state, action: PayloadAction<indexPayload>) {
      const { index, arr_name, line } = action.payload;
      switch (arr_name) {
        case "A": {
          state.indexA = index;
          break;
        }
        case "B": {
          state.indexB = index;
          break;
        }
        case "C": {
          state.indexC = index;
          break;
        }
      }
      state.line = line;
      return state;
    },
    counting(state) {
      const index = state.A[state.indexA].value;
      state.C[index].value = state.C[index].value + 1;
      return state;
    },
    accumulate(state) {
      const index = state.indexC;
      state.C[index].value = state.C[index].value + state.C[index - 1].value;
      return state;
    },
    decreasingC(state) {
      const index = state.A[state.indexA].value;
      state.C[index].value = state.C[index].value - 1;
      state.line = state.line + 1;
      return state;
    },
    setValue(state, action: PayloadAction<valuePayload>) {
      const { index, arr_name, value } = action.payload;
      switch (arr_name) {
        case "A": {
          state.A[index].value = value;
          break;
        }
        case "B": {
          state.B[index].value = value;
          break;
        }
        case "C": {
          state.C[index].value = value;
          break;
        }
      }
      return state;
    },
    setColor(state, action: PayloadAction<colorPayload>) {
      const { items, val, line } = action.payload;
      for (var item of items) {
        switch (item.arr_name) {
          case "A": {
            state.A[item.index].color = val;
            break;
          }
          case "B": {
            state.B[item.index].color = val;
            break;
          }
          case "C": {
            state.C[item.index].color = val;
            break;
          }
        }
      }
      state.line = line;
      return state;
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload;
    },
  },
});

export default countingSortSlice.reducer;
export const {
  init,
  setIndex,
  setColor,
  counting,
  accumulate,
  decreasingC,
  setLine,
  setValue,
} = countingSortSlice.actions;
