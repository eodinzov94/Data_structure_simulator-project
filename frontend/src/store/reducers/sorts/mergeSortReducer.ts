import { numbersToSortItems } from "../../../components/Simulation/Sorts/helpers/functions";
import { sortItem } from "../../../components/Simulation/Sorts/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemColor } from "./quickSortReducer";

export interface State {
  tree: mergeNode[];
  line: number;
  left: number;
  right: number;
}

interface basePayload {
  line: number;
}

interface nodes extends basePayload {
  nodesList: number[];
}

interface markElements extends nodes {
  elements: number[];
  color: ItemColor;
}

interface setIndexesPayload extends basePayload {
  left: number;
  right: number;
}

interface actionOnNodePayload extends basePayload {
  nodeIndex: number;
}

interface addNodePayload extends actionOnNodePayload {
  data: number[];
}

interface changeNodeValuePayload extends actionOnNodePayload {
  value: number;
  index: number;
}

export type mergeSortPayload =
  | number[]
  | number
  | addNodePayload
  | changeNodeValuePayload
  | nodes
  | actionOnNodePayload
  | markElements
  | setIndexesPayload
  | undefined;

export interface mergeNode {
  data: sortItem[];
}

const initialState: State = {
  tree: Array.from({ length: 16 }, () => ({ data: [] })),
  line: -1,
  right: -2,
  left: -2,
};

const mergeSortSlice = createSlice({
  name: "mergesort",
  initialState,
  reducers: {
    init(state, action: PayloadAction<number[]>) {
      state = { ...initialState };
      // 4 levels tree
      state.tree = Array.from({ length: 16 }, () => ({ data: [] }));
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
    deleteNodes(state, action: PayloadAction<nodes>) {
      const { nodesList, line } = action.payload;
      state.line = line;
      for (let i of nodesList) state.tree[i].data = [];
    },
    initNodeData(state, action: PayloadAction<actionOnNodePayload>) {
      const { line, nodeIndex } = action.payload;
      state.line = line;
      for (var i = 0; i < state.tree[nodeIndex].data.length; i++) {
        state.tree[nodeIndex].data[i].hide = true;
      }
    },
    markNode(state, action: PayloadAction<actionOnNodePayload>) {
      const { line, nodeIndex } = action.payload;
      for (var i = 0; i < state.tree[nodeIndex].data.length; i++) {
        state.tree[nodeIndex].data[i].color = ItemColor.MARKED;
      }
      state.line = line;
    },
    markElementInNode(state, action: PayloadAction<markElements>) {
      const { line, nodesList, elements, color } = action.payload;
      let node, element;
      for (var i = 0; i < nodesList.length; i++) {
        node = nodesList[i];
        element = elements[i];
        state.tree[node].data[element].color = color;
      }
      state.line = line;
    },
    setIndexes(state, action: PayloadAction<setIndexesPayload>) {
      const { line, right, left } = action.payload;
      state.left = left;
      state.right = right;
      state.line = line;
    },
    setState(state, action: PayloadAction<State>) {
      return action.payload;
    },
  },
});

export default mergeSortSlice.reducer;
export const mergeSortActions = mergeSortSlice.actions;
