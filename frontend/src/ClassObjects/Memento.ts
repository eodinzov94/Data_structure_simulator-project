import {ActionType, Events} from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import {CodeReference} from "../components/Simulation/PseudoCode/HeapPseudoCodeData";


interface Snapshot {
    actions: Events;
    array: number[];
    reference: CodeReference;
}


export class Memento {
    snapshots: Snapshot[];
//TODO:Add explanation for why we used byCopy and byRef
    constructor() {
        this.snapshots = [];
    }
    getLength(){
        return this.snapshots.length
    }
    getArray(index: number){
        return this.snapshots[index].array
    }
    getLast(){
        return this.snapshots[this.snapshots.length -1].array
    }
    getActions(index : number){
        return this.snapshots[index].actions
    }
    clearSnapshots(){
        this.snapshots = []
    }
    getCurrentAlg(){
        return this.snapshots[this.snapshots.length -1].reference.name
    }
    getReference(index: number){
        return this.snapshots[index].reference
    }
    addBlankByCopy(ref: CodeReference, array: number[]) {
        this.snapshots.push({
            actions: [],
            array: [...array],
            reference: ref
        });
    }
    addBlankByRef(ref: CodeReference) {
        this.snapshots.push({
            actions: [],
            array: this.getLast(),
            reference: ref
        });
    }

    addSwap(ref: CodeReference, array: number[], index1: number, index2: number) {
        this.snapshots.push({
            actions: [{action: ActionType.SWAP, item: index1, item2: index2}],
            array: [...array],
            reference: ref
        });
    }

    addSnapshotByCopy(ref: CodeReference, array: number[], index: number, action: ActionType) {
        this.snapshots.push({
            actions: [{action, item: index}],
            array: [...array],
            reference: ref
        });
    }
    addSnapshotByRef(ref: CodeReference, index: number, action: ActionType) {
        this.snapshots.push({
            actions: [{action, item: index}],
            array: this.getLast(),
            reference: ref
        });
    }
}