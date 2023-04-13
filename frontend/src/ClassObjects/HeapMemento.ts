import {ActionType, Events} from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import {CodeReference} from "../components/Simulation/PseudoCode/HeapPseudoCodeData";


interface Snapshot {
    actions: Events;
    array: number[];
    codeRef: CodeReference;
}


export class HeapMemento {
    snapshots: Snapshot[];
    constructor() {
        this.snapshots = [];
    }
    getLength(){
        return this.snapshots.length
    }
    getArray(index: number){
        if(index < 0 || index >= this.snapshots.length){
            throw new Error('Index out of range')
        }
        return this.snapshots[index].array
    }
    getLast(){
        if(!this.snapshots.length){
            throw new Error('No snapshots')
        }
        return this.snapshots[this.snapshots.length -1].array
    }
    getActions(index : number){
        if (index < 0 || index >= this.snapshots.length){
            throw new Error('Index out of range')
        }
        return this.snapshots[index].actions
    }
    clearSnapshots(){
        this.snapshots = []
    }
    getCurrentAlg(){
        if(this.snapshots.length){
            return this.snapshots[0].codeRef.name
        }
        return 'BuildMaxHeap'
    }
    getCodeRef(index: number){
        return this.snapshots[index].codeRef
    }
    addBlank(codeRef: CodeReference, array: number[]) {
        this.snapshots.push({
            actions: [],
            array:HeapMemento.getArrayToAdd(this, array),
            codeRef
        });
    }

    addSwap(codeRef: CodeReference, array: number[], index1: number, index2: number) {
        this.snapshots.push({
            actions: [{action: ActionType.SWAP, item: index1, item2: index2}],
            array: [...array],
            codeRef,
        });
    }

    addSnapshot(codeRef: CodeReference, array: number[], index: number, action: ActionType) {
        this.snapshots.push({
            actions: [{action, item: index}],
            array: HeapMemento.getArrayToAdd(this, array),
            codeRef
        });
    }

    /*
    * Static method to get the array to add, method checks if new copy is needed
    * if not, it returns the last array reference, otherwise it returns new array as copy of provided array
    * @param memento: Memento object, array: number[]
    * returns: number[]
    * */
    static getArrayToAdd(memento:HeapMemento, runtimeArr: number[]) {
        //check if memento is empty or runtimeArr is not the same as last runtimeArr, if so new copy is needed
      if(!memento.getLength() || runtimeArr.length !== memento.getLast().length){
          return [...runtimeArr]
      }
      try {
          const lastArr = memento.getLast()
          //check if runtimeArr is the same as the last runtimeArr
          for (let i = 0; i < runtimeArr.length; i++) {
              if (runtimeArr[i] !== lastArr[i]) {
                  return [...runtimeArr]
              }
          }
          return lastArr
      } catch (e) {
          //Should never happen
          console.log(e)
          return [...runtimeArr]
      }

    }
}