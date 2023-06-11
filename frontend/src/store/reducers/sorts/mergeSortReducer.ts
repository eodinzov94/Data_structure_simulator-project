import { numbersToSortItems } from "../../../components/Simulation/Sorts/helpers/functions";
import { sortItem } from "../../../components/Simulation/Sorts/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemColor } from "./quickSortReducer";

export interface State {
  tree: mergeNode[];
  line: number;
}

interface actionPayload {
  line: number;
  nodeIndex: number;
}

interface addNodePayload extends actionPayload {
  data: number[];
}

interface changeNodeValuePayload extends actionPayload {
  value: number;
  index: number;
}

export type insertionSortPayload =
  | number[]
  | number
  | addNodePayload
  | undefined;

export interface mergeNode {
  data: sortItem[];
  index: number;
}

const initialState: State = {
  tree: [] as mergeNode[],
  line: -1,
};

const mergeSortSlice = createSlice({
  name: "insertionsort",
  initialState,
  reducers: {
    init(state, action: PayloadAction<number[]>) {
      state = { ...initialState };
      // 4 levels tree
      state.tree = Array.from({ length: 16 }, () => ({ data: [], index: 0 }));
      state.tree[1].data = numbersToSortItems(action.payload); //head
      return state;
    },
    addNode(state, action: PayloadAction<addNodePayload>) {
      const { nodeIndex, data, line } = action.payload;
      state.line = line;
      state.tree[nodeIndex].data = numbersToSortItems(data);
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload;
    },
    changeValue(state, action: PayloadAction<changeNodeValuePayload>) {
      const { nodeIndex, value, line, index } = action.payload;
      state.tree[nodeIndex].data[index].value = value;
      state.tree[nodeIndex].data[index].hide = false;
      state.line = line;
    },
    deleteNodes(state, action: PayloadAction<number[]>) {
      for (let i of action.payload) state.tree[i].data = [];
    },
    initNodeData(state, action: PayloadAction<number>) {
      for (var i = 0; i < state.tree[action.payload].data.length; i++) {
        state.tree[action.payload].data[i].hide = true;
      }
    },
    markNode(state, action: PayloadAction<actionPayload>) {
      const { line, nodeIndex } = action.payload;
      for (var i = 0; i < state.tree[nodeIndex].data.length; i++) {
        state.tree[nodeIndex].data[i].color = ItemColor.MARKED;
      }
      state.line = line;
    },
    setState(state, action: PayloadAction<State>) {
      return action.payload;
    },
  },
});

export default mergeSortSlice.reducer;
export const mergeSortActions = mergeSortSlice.actions;
