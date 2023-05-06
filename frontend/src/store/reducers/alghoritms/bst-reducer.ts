import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Events, NodeRole} from '../../../components/Simulation/BinaryTree/BinaryTreeTypes'
import {CodeReference} from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import {BST_Node} from "../../../components/Simulation/BST/BST_Algorithms";


const initialState = {
    currentActions:[] as Events,
    currentRoot:undefined as BST_Node | undefined,
    isPlaying :false,
    inputArray:'',
    inputKey: 0,
    currentAlg: 'Stam', //as keyof typeof HeapPseudoCode,
    currentLine:0,
    currentRoles:[] as NodeRole[]
};

const bstSlice = createSlice({
    name:'bst' ,
    initialState,
    reducers:{
        setRoot(state,action:PayloadAction<BST_Node | undefined>){
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
    setInputArray,
    setPlaying,
    setActions,
    setRoles
} = bstSlice.actions;

