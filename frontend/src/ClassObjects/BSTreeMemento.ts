import {ActionType, NodeRole} from '../components/Simulation/BinaryTree/BinaryTreeTypes'
import {BST_Node} from "../components/Simulation/BST/BST_Algorithms";
import {Memento} from "./Memento";


export class BSTreeMemento  extends Memento<BST_Node | undefined,string> {
    constructor() {
        super('Stam')
    }

    addBlank(codeRef: any, tree: BST_Node | undefined,heapSize?: number,nodeRoles:NodeRole[]=[]) {
        this.snapshots.push({
            actions: [],
            data:BSTreeMemento.getTreeToAdd(this, tree),
            codeRef,
            roles:nodeRoles
        });
    }
    addSwap(codeRef: any, tree: BST_Node | undefined, index1: number, index2: number,heapSize?: number,nodeRoles:NodeRole[]=[]) {
        this.snapshots.push({
            actions: [{action: ActionType.SWAP, item: index1, item2: index2}],
            data: BSTreeMemento.getTreeToAdd(this, tree),// TODO: deep copy tree
            codeRef,
            roles:nodeRoles
        });
    }

    getLength(){
        return this.snapshots.length
    }

    addSnapshot(codeRef: any, tree: BST_Node | undefined, index: number, action: ActionType,heapSize?: number,nodeRoles:NodeRole[]=[]) {
        this.snapshots.push({
            actions: [{action, item: index}],
            data:BSTreeMemento.getTreeToAdd(this, tree),
            codeRef,
            roles:nodeRoles
        });
    }

    static getTreeToAdd(memento:BSTreeMemento, runtimeTree: BST_Node | undefined) {
        //TODO:Implement this
            return runtimeTree
    }

}