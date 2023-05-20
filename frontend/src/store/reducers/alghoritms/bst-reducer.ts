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
    error:'', //TODO:error in search in bst
    currentAlg: 'Search' as BSTAlgNames,
    currentLine:0,
    currentRoles:[] as NodeRole[],
    visitedNodes:[] as number[],
    inputValues: {
        Successor: 1,
        Predecessor: 2,
        Search: 3,
        Insert: 4,
        DeleteNode: 5,
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
        setError(state,action:PayloadAction<string>){
            state.error = action.payload
            return state
        },
        setPlaying(state,action:PayloadAction<boolean>){
            state.isPlaying = action.payload
            return state
        },
        setVisited(state,action:PayloadAction<number[]>){
            state.visitedNodes = action.payload
            return state
        },
        setInputArray(state,action:PayloadAction<string>){
            state.inputArray = action.payload
            return state
        },
        setInput(state,action:PayloadAction<{val:number,key:"Successor"|"Predecessor"|"Search"|"Insert"|"DeleteNode"}>){
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
    setError,
    setRoles,
    setVisited
} = bstSlice.actions;

