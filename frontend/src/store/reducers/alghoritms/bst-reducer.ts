import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Events, NodeRole} from '../../../components/Simulation/BinaryTree/BinaryTreeTypes'
import {CodeReference} from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import {BSTreeNode} from "../../../ClassObjects/BSTreeNode";
import {BSTAlgNames} from "../../../components/Simulation/PseudoCode/BSTreePseudoCodeData";

const initialState = {
    currentActions:[] as Events,
    currentRoot:undefined as BSTreeNode | undefined,
    isPlaying :false,
    inputArray:'',
    currentAlg: 'Search' as BSTAlgNames,
    currentLine:0,
    currentRoles:[] as NodeRole[],
    inputValues: {
        Search: 1,
        Insert: 2,
        DeleteNode: 3,
    }
};

const bstSlice = createSlice({
    name:'bst' ,
    initialState,
    reducers:{
        setRoot(state,action:PayloadAction<BSTreeNode | undefined>){
            state.currentRoot = action.payload
            return state
        },
        setActions(state,action:PayloadAction<Events>){
            state.currentActions = action.payload
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
        setInput(state,action:PayloadAction<{val:number,key:"Search"|"Insert"|"DeleteNode"}>){
            state.inputValues[action.payload.key] = action.payload.val
            return state
        },
        setCodeRef(state, action:PayloadAction<CodeReference<BSTAlgNames>>){
            state.currentAlg = action.payload.name
            state.currentLine = action.payload.line
            return state
        },
        setRoles(state,action:PayloadAction<NodeRole[]>){
            state.currentRoles = action.payload
        }
    }
});


export default bstSlice.reducer;
export const {
    setRoot,
    setCodeRef,
    setInput,
    setInputArray,
    setPlaying,
    setActions,
    setRoles
} = bstSlice.actions;

