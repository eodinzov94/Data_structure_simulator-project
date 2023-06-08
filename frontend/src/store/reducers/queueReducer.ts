import { Item } from "../../components/Simulation/ControlsPanels/SqControlsPanel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface HeadPosition {
    curr: number;
    prev: number;
}

export interface State {
  data: Item[];
  headPosition: HeadPosition;
  tailPosition: number;
  key: number;
  line: number;
}

const initialState = {
  data: [] as Item[],
  line: -1,
  headPosition: {curr:0 , prev:35} ,
  tailPosition: -35 ,
  key: 0
};

const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    inputData(state, action: PayloadAction<Item[]>) {
      state.data = action.payload;
      state.key = state.data.length;
      state.headPosition = { curr: -35 * state.data.length, prev: state.headPosition.curr };
      state.tailPosition = -35 + 35 * state.data.length;
    },
    dequeue(state){
        state.line = 6
        const new_data = [...state.data]
        new_data.splice(0, 1);
        state.data = new_data
        state.tailPosition -= 35
        state.headPosition.curr -= 35

    },
    moveTail(state,action: PayloadAction<number>){
        state.tailPosition += action.payload
    },
    markHead(state){
        state.data[0].color = "#ecfccb"
        state.line = 4
    },
    incHead(state) {
        const prevState = state.headPosition
        state.headPosition = { curr: prevState.curr + 35, prev: prevState.curr };
        state.line = 5
        
      },
    incTail(state){
        //for enqueue
        //state.data.push({value:" ",key:state.key})
        state.line = 11
        // state.headPosition = { curr: state.headPosition.curr - 35, prev: state.headPosition.curr }
        state.tailPosition += 35
       // state.key += 1
    },
    enqueue(state,action: PayloadAction<string>){
        state.data.push({value:action.payload,key:state.key})
        state.headPosition = { curr: state.headPosition.curr - 35, prev: state.headPosition.curr }
        state.line = 12
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload
    },

  },
});

export default queueSlice.reducer;
export const queueActions = queueSlice.actions;
