import {ActionType, NodeRole} from '../components/Simulation/BinaryTree/BinaryTreeTypes'

import {Memento} from "./Memento";
import {BSTreeNode} from "./BSTreeNode";


export class BSTreeMemento  extends Memento<BSTreeNode | undefined,string> {
    visitedNodesSnapshots: number[][]
    passedNodesSnapshots: number[][]
    constructor() {
        super('Search')
        this.visitedNodesSnapshots = []
        this.passedNodesSnapshots = []
    }
    clearSnapshots() {
        super.clearSnapshots();
        this.visitedNodesSnapshots = []
        this.passedNodesSnapshots = []
    }

    addBlank(codeRef: any, tree: BSTreeNode | undefined, heapSize?: number, nodeRoles:NodeRole[]=[],visitedNodes:number[]=[],passedNodes:number[]=[]) {
        this.snapshots.push({
            actions: [],
            data:BSTreeNode.deepCopy(tree),
            codeRef,
            roles:nodeRoles
        });
        this.visitedNodesSnapshots.push([...visitedNodes])
        this.passedNodesSnapshots.push([...passedNodes])
    }
    addSwap(codeRef: any, tree: BSTreeNode | undefined, index1: number, index2: number, heapSize?: number, nodeRoles:NodeRole[]=[],visitedNodes:number[]=[],passedNodes:number[]=[]) {
        this.snapshots.push({
            actions: [{action: ActionType.SWAP, item: index1, item2: index2}],
            data: BSTreeNode.deepCopy(tree),
            codeRef,
            roles:nodeRoles
        });
        this.visitedNodesSnapshots.push([...visitedNodes])
        this.passedNodesSnapshots.push([...passedNodes])
    }

    getLength(){
        return this.snapshots.length
    }

    addSnapshot(codeRef: any, tree: BSTreeNode | undefined, index: number, action: ActionType, nodeRoles:NodeRole[]=[],visitedNodes:number[]=[],passedNodes:number[]=[]) {
        this.snapshots.push({
            actions: [{action, item: index}],
            data:BSTreeNode.deepCopy(tree),
            codeRef,
            roles:nodeRoles
        });
        this.visitedNodesSnapshots.push([...visitedNodes])
        this.passedNodesSnapshots.push([...passedNodes])
    }
    addDoubleSnapShot(codeRef: any, tree: BSTreeNode | undefined, index1: number, index2: number, action: ActionType, nodeRoles:NodeRole[]=[],visitedNodes:number[]=[],passedNodes:number[]=[]) {
        this.snapshots.push({
            actions: [{action, item: index1},{action, item: index2}],
            data:BSTreeNode.deepCopy(tree),
            codeRef,
            roles:nodeRoles
        });
        this.visitedNodesSnapshots.push([...visitedNodes])
        this.passedNodesSnapshots.push([...passedNodes])
    }
    getVisitedNodes(index: number){
        if(index < 0 || index >= this.visitedNodesSnapshots.length){
            throw new Error('Index out of range')
        }
        return this.visitedNodesSnapshots[index]
    }
    getPassedNodes(index: number){
        if(index < 0 || index >= this.passedNodesSnapshots.length){
            throw new Error('Index out of range')
        }
        return this.passedNodesSnapshots[index]
    }
}