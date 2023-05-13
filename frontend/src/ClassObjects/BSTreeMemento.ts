import {ActionType, NodeRole} from '../components/Simulation/BinaryTree/BinaryTreeTypes'

import {Memento} from "./Memento";
import {BSTreeNode} from "./BSTreeNode";


export class BSTreeMemento  extends Memento<BSTreeNode | undefined,string> {
    constructor() {
        super('Stam')
    }

    addBlank(codeRef: any, tree: BSTreeNode | undefined, heapSize?: number, nodeRoles:NodeRole[]=[]) {
        this.snapshots.push({
            actions: [],
            data:BSTreeMemento.getTreeToAdd(tree),
            codeRef,
            roles:nodeRoles
        });
    }
    addSwap(codeRef: any, tree: BSTreeNode | undefined, index1: number, index2: number, heapSize?: number, nodeRoles:NodeRole[]=[]) {
        this.snapshots.push({
            actions: [{action: ActionType.SWAP, item: index1, item2: index2}],
            data: BSTreeMemento.getTreeToAdd(tree),
            codeRef,
            roles:nodeRoles
        });
    }

    getLength(){
        return this.snapshots.length
    }

    addSnapshot(codeRef: any, tree: BSTreeNode | undefined, index: number, action: ActionType, heapSize?: number, nodeRoles:NodeRole[]=[]) {
        this.snapshots.push({
            actions: [{action, item: index}],
            data:BSTreeMemento.getTreeToAdd(tree),
            codeRef,
            roles:nodeRoles
        });
    }

    static getTreeToAdd(runtimeTree: BSTreeNode | undefined) {
        if (!runtimeTree) {
            return undefined;
        }

        const newNode: BSTreeNode = {
            value: runtimeTree.value,
            id: runtimeTree.id,
            left: BSTreeMemento.getTreeToAdd(runtimeTree.left),
            right: BSTreeMemento.getTreeToAdd(runtimeTree.right),
        };

        if (newNode.left) {
            newNode.left.parent = newNode;
        }
        if (newNode.right) {
            newNode.right.parent = newNode;
        }

        return newNode;
    }

}