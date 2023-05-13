import {ActionType, NodeRole} from '../components/Simulation/BinaryTree/BinaryTreeTypes'

import {Memento} from "./Memento";
import {BSTreeNode} from "./BSTreeNode";


export class BSTreeMemento  extends Memento<BSTreeNode | undefined,string> {
    constructor() {
        super('Search')
    }

    addBlank(codeRef: any, tree: BSTreeNode | undefined, heapSize?: number, nodeRoles:NodeRole[]=[]) {
        this.snapshots.push({
            actions: [],
            data:BSTreeNode.deepCopy(tree),
            codeRef,
            roles:nodeRoles
        });
    }
    addSwap(codeRef: any, tree: BSTreeNode | undefined, index1: number, index2: number, heapSize?: number, nodeRoles:NodeRole[]=[]) {
        this.snapshots.push({
            actions: [{action: ActionType.SWAP, item: index1, item2: index2}],
            data: BSTreeNode.deepCopy(tree),
            codeRef,
            roles:nodeRoles
        });
    }

    getLength(){
        return this.snapshots.length
    }

    addSnapshot(codeRef: any, tree: BSTreeNode | undefined, index: number, action: ActionType, nodeRoles:NodeRole[]=[]) {
        this.snapshots.push({
            actions: [{action, item: index}],
            data:BSTreeNode.deepCopy(tree),
            codeRef,
            roles:nodeRoles
        });
    }
    addDoubleSnapShot(codeRef: any, tree: BSTreeNode | undefined, index1: number, index2: number, action: ActionType, nodeRoles:NodeRole[]=[]) {
        this.snapshots.push({
            actions: [{action, item: index1},{action, item: index2}],
            data:BSTreeNode.deepCopy(tree),
            codeRef,
            roles:nodeRoles
        });
    }

}