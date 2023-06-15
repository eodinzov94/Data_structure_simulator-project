import { build, deleteNode, insert } from "../components/Simulation/AVL/AVL_Algorithms"
import { calculateHeight } from "../components/Simulation/BinaryTree/Helpers/Functions"
import { AppDispatch } from "../store/store"
import BSTreeAnimationController from "./BSTreeAnimationController"
import { BSTreeNode } from "./BSTreeNode"

export class AvlAnimationController extends BSTreeAnimationController {
    private static avlController: null | AvlAnimationController = null

    private constructor(root: BSTreeNode | undefined, dispatch: AppDispatch) {
        super(root, dispatch)
    }

    static getController(root: BSTreeNode | undefined, dispatch: AppDispatch) {
        if (!this.avlController)
            this.avlController = new AvlAnimationController(root, dispatch)
        return this.avlController
    }
    async insert(value: number) {
        let data;
        if (this.memento.getLength()) {
            data = this.memento.getLastData()
        } else {
            data = this.data
        }
        let tempData = BSTreeNode.deepCopy(data)
        let tempRoot = insert(tempData, value,tempData);
        if (calculateHeight(tempRoot) > 6) {
            throw new Error("Tree is too big, max height is 6")
        }
        this.setTreeFromInput([], tempRoot);
    }
    async deleteNode(key: number) {
        const node = deleteNode(BSTreeNode.deepCopy(this.data), key);
        this.setTreeFromInput([], node);
    }
    setTreeFromInput(arr: number[], newRoot?: BSTreeNode) {
        let root: BSTreeNode | undefined
        if (newRoot) {
            root = newRoot;
        } else {
            root = build(arr)
        }
        this.data = root;
        this.memento.clearSnapshots();
        this.setRoot(root);
        this.setCurrentActions([]);
        this.setCurrentRoles([]);
        this.setVisitedNodes([]);
        this.setPassedNodes([])
        this.setTraversalResult([])
    }
}