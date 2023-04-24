import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NodeRole, TreeNode } from '../../../components/Simulation/BinaryTree/BinaryTreeTypes'
import { Events } from '../../../components/Simulation/BinaryTree/BinaryTreeTypes'
import { arrayToBinaryTree } from '../../../components/Simulation/BinaryTree/Helpers/Functions'
import {CodeReference, HeapPseudoCode} from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";



const heapArray = [2, 1, 0]


const initialState = {root:arrayToBinaryTree(heapArray),
  currentActions:[] as Events,
  currentArr:heapArray,
  isPlaying :false,
  inputArray:'',
  currentAlg: 'BuildMaxHeap' as keyof typeof HeapPseudoCode,
  currentLine:0,
  inputKey: 0,
  currentHeapSize:heapArray.length,
  currentRoles:[] as NodeRole[]
};

const heapSlice = createSlice({
  name:'heap' ,
  initialState,
  reducers:{
    setRoot(state,action:PayloadAction<TreeNode | null>){
      state.root = action.payload
      return state
    },
    setActions(state,action:PayloadAction<Events>){
      state.currentActions = action.payload
      return state
    },
    setArray(state,action:PayloadAction<{arr:number[],currentHeapSize:number}>){
      state.currentArr = action.payload.arr
      state.currentHeapSize = action.payload.currentHeapSize
      return state
    },
    setPlaying(state,action:PayloadAction<boolean>){
      state.isPlaying = action.payload
      return state
    },
    setInputArray(state,action:PayloadAction<string>){
      state.inputArray = action.payload
      return state
    },
    setInputKey(state,action:PayloadAction<number>){
      state.inputKey = action.payload
      return state
    },
    setCodeRef(state, action:PayloadAction<CodeReference>){
      state.currentAlg = action.payload.name
      state.currentLine = action.payload.line
      return state
    },
    setRoles(state,action:PayloadAction<NodeRole[]>){
      state.currentRoles = action.payload
    }
  }
});


export default heapSlice.reducer;
export const {
  setRoot,
  setCodeRef,
  setInputKey,
  setInputArray,
  setPlaying,
  setActions,
  setArray,
  setRoles
} = heapSlice.actions;

