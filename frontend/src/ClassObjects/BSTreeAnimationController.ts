import AnimationController from "./AnimationController";
import { BSTreeMemento } from "./BSTreeMemento";
import {
    build, deleteNodeWrapper,
    getMaxWrapper,
    getMinWrapper,
    inorderTraversal,
    insert,
    insertWithAnimations,
    postorderTraversal,
    predecessor,
    preorderTraversal,
    searchWrapper,
    successor
} from "../components/Simulation/BST/BST_Algorithms";
import { AppDispatch } from "../store/store";
import {
    setActions,
    setCodeRef, setError,
    setPassedNodes,
    setPlaying,
    setRoles,
    setRoot, setTraversalResults,
    setVisited
} from "../store/reducers/alghoritms/bst-reducer";
import { ActionType, Events, NodeRole } from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import { BSTreeNode } from "./BSTreeNode";
import { calculateHeight } from "../components/Simulation/BinaryTree/Helpers/Functions";


class BSTreeAnimationController extends AnimationController<BSTreeNode | undefined, string> {
    private static controller: null | BSTreeAnimationController = null

    private constructor(root: BSTreeNode | undefined, dispatch: AppDispatch) {
        super(dispatch, new BSTreeMemento(), root)
    }

    static getController(root: BSTreeNode | undefined,
        dispatch: AppDispatch) {
        if (!BSTreeAnimationController.controller)
            BSTreeAnimationController.controller = new BSTreeAnimationController(root, dispatch)
        return BSTreeAnimationController.controller
    }


    setRoot(node: BSTreeNode | undefined) {
        this.dispatch(setRoot(node));
    }


    setCurrentActions(actions: Events) {
        this.dispatch(setActions(actions));
    }


    setCurrentRoles(roles: NodeRole[]) {
        this.dispatch(setRoles(roles));
    }

    setPlaying(value: boolean) {
        this.dispatch(setPlaying(value));
    }

    async jumpToEnd() {
        await this.pause();
        const i = this.memento.getLength() - 1;
        this.setCurrentActions([]);
        this.setCurrentRoles(this.memento.getRoles(i));
        this.setRoot(this.memento.getData(i));
        this.setReference(this.memento.getCodeRef(i));
        this.setVisitedNodes((this.memento as BSTreeMemento).getVisitedNodes(i));
        this.setPassedNodes((this.memento as BSTreeMemento).getPassedNodes(i))
        this.setTraversalResult((this.memento as BSTreeMemento).getTraversalResults(i))
        this.frame = i;
    }

    //TODO: change to appropriate reference type
    setReference(ref: any) {
        this.dispatch(setCodeRef(ref));
    }

    setAllData(index: number) {
        const actions = this.memento.getActions(index);
        this.setRoot(this.memento.getData(index));
        this.setCurrentActions(actions);
        this.setCurrentRoles(this.memento.getRoles(index));
        this.setReference(this.memento.getCodeRef(index));
        this.setVisitedNodes((this.memento as BSTreeMemento).getVisitedNodes(index));
        this.setPassedNodes((this.memento as BSTreeMemento).getPassedNodes(index))
        this.setTraversalResult((this.memento as BSTreeMemento).getTraversalResults(index))
        if (actions.length > 0 && actions[0].action === ActionType.ERROR) {
            this.setError(actions[0]?.error || "ERROR")
        }
    }
    setError(error: string) {
        this.dispatch(setError(error));
    }
    initData(data: BSTreeNode | undefined) {
        this.setReference({ name: this.memento.getCurrentAlg(), line: 0 });
        this.setRoot(data);
        this.setCurrentActions([]);
        this.setCurrentRoles([]);
        this.setVisitedNodes([]);
        this.setPassedNodes([])
        this.setTraversalResult([])

    }
    setPassedNodes(passedNodes: number[]) {
        this.dispatch(setPassedNodes(passedNodes));
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
    setVisitedNodes(visitedNodes: number[]) {
        this.dispatch(setVisited(visitedNodes));
    }
    setTraversalResult(result: number[]) {
        this.dispatch(setTraversalResults(result));
    }
    async search(key: number) {
        await this.playAlgorithm(searchWrapper, key, this.memento as BSTreeMemento, this.data);
    }
    async inorder() {
        await this.playAlgorithm(inorderTraversal, this.memento as BSTreeMemento);
    }
    async preorder() {
        await this.playAlgorithm(preorderTraversal, this.memento as BSTreeMemento);
    }

    async postorder() {
        await this.playAlgorithm(postorderTraversal, this.memento as BSTreeMemento);
    }
    async insert(value: number) {
        let data;
        if (this.memento.getLength()) {
            data = this.memento.getLastData()
        } else {
            data = this.data
        }
        const tempRoot = insert(BSTreeNode.deepCopy(data), BSTreeNode.createNewNode(data, value));
        if (calculateHeight(tempRoot) > 6) {
            throw new Error("Tree is too big, max height is 6")
        }
        await this.playAlgorithm(insertWithAnimations, BSTreeNode.createNewNode(data, value), this.memento as BSTreeMemento);
    }

    async deleteNode(key: number) {
        await this.playAlgorithm(deleteNodeWrapper, key, this.memento as BSTreeMemento);
    }

    async min() {
        await this.playAlgorithm(getMinWrapper, this.memento as BSTreeMemento);
    }

    async max() {
        await this.playAlgorithm(getMaxWrapper, this.memento as BSTreeMemento);
    }

    async successor(key: number) {
        await this.playAlgorithm(successor, key, this.memento as BSTreeMemento);
    }

    async predecessor(key: number) {
        await this.playAlgorithm(predecessor, key, this.memento as BSTreeMemento);
    }


}

export default BSTreeAnimationController