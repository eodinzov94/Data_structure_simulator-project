import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TreeNode } from '../../../components/Simulation/BinaryTree/BinaryTreeTypes'
import { Events } from '../../../components/Simulation/BinaryTree/BinaryTreeTypes'
import { arrayToBinaryTree } from '../../../components/Simulation/BinaryTree/Helpers/Functions'



// const heapArray = [17, 14, 13, 10, 5, 8, 7, 2, 1, 0]
const heapArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, -Infinity]

const initialState = {root:arrayToBinaryTree(heapArray),
  currentActions:[] as Events,
  currentArr:heapArray,
isPlaying :false};

const heapSlice = createSlice({
  name:'heap' ,
  initialState,
  reducers:{
    setRoot(state,action:PayloadAction<TreeNode>){
      state.root = action.payload
      return state
    },
    setActions(state,action:PayloadAction<Events>){
      state.currentActions = action.payload
      return state
    },
    setArray(state,action:PayloadAction<number[]>){
      state.currentArr = action.payload
      return state
    },
    setPlaying(state,action:PayloadAction<boolean>){
      state.isPlaying = action.payload
      return state
    }
  }
});


export default heapSlice.reducer;
export const {setRoot,setPlaying,setActions,setArray} = heapSlice.actions;

