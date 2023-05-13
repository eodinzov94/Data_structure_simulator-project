import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Events, NodeRole} from '../../../components/Simulation/BinaryTree/BinaryTreeTypes'
import {CodeReference} from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import {BSTreeNode} from "../../../ClassObjects/BSTreeNode";

const initialState = {
    currentActions:[] as Events,
    currentRoot:undefined as BSTreeNode | undefined,
    isPlaying :false,
    inputArray:'',
    inputSearch: 0,
    inputDelete: 0,
    inputKey: 0,
    currentAlg: 'Stam', //as keyof typeof BST_PseudoCode,
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
        setInputKey(state,action:PayloadAction<number>){
            state.inputKey = action.payload
            return state
        },
        setInputSearch(state,action:PayloadAction<number>){
            state.inputSearch = action.payload
            return state
        },
        setInputDelete(state,action:PayloadAction<number>){
            state.inputDelete = action.payload
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


export default bstSlice.reducer;
export const {
    setRoot,
    setCodeRef,
    setInputKey,
    setInputSearch,
    setInputDelete,
    setInputArray,
    setPlaying,
    setActions,
    setRoles
} = bstSlice.actions;

