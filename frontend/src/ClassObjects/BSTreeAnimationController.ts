import AnimationController from "./AnimationController";
import {BSTreeMemento} from "./BSTreeMemento";
import {
    build, deleteNodeWrapper,
    getMax,
    getMin,
    insertWithAnimations,
    predecessor,
    search,
    successor
} from "../components/Simulation/BST/BST_Algorithms";
import {AppDispatch} from "../store/store";
import {setActions, setCodeRef, setPlaying, setRoles, setRoot} from "../store/reducers/alghoritms/bst-reducer";
import {Events, NodeRole} from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import {BSTreeNode} from "./BSTreeNode";


class BSTreeAnimationController extends AnimationController<BSTreeNode | undefined,string> {
    private static controller: null | BSTreeAnimationController = null

    private constructor(root: BSTreeNode | undefined, dispatch: AppDispatch) {
        super(dispatch, new BSTreeMemento(),root)
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
        this.frame = i;
    }

    //TODO: change to appropriate reference type
    setReference(ref:any) {
        this.dispatch(setCodeRef(ref));
    }

    setAllData(index: number) {
        this.setRoot(this.memento.getData(index));
        this.setCurrentActions(this.memento.getActions(index));
        this.setCurrentRoles(this.memento.getRoles(index));
        this.setReference(this.memento.getCodeRef(index));
    }
    initData(data: BSTreeNode | undefined) {
        this.setReference({name: this.memento.getCurrentAlg(), line: 0});
        this.setRoot(data);
        this.setCurrentActions([]);
        this.setCurrentRoles([]);
    }
    setTreeFromInput(arr:number[]) {
        const root = build(arr);
        this.data = root;
        this.memento.clearSnapshots();
        this.setRoot(root);
        this.setCurrentActions([]);
        this.setCurrentRoles([]);
    }

    async search(key:number) {
            await this.playAlgorithm(search,this.data,key, this.memento as BSTreeMemento,this.data);
    }

    async insert(value: number) {
            await this.playAlgorithm(insertWithAnimations,this.data,BSTreeNode.createNewNode(this.data,value) , this.memento as BSTreeMemento);
    }

    async deleteNode(key:number) {
        const root = deleteNodeWrapper(this.data, key, this.memento as BSTreeMemento);
        this.setRoot(BSTreeNode.deepCopy(root));
    }

    async min() {
            await this.playAlgorithm(getMin,this.data,this.memento as BSTreeMemento);
    }

    async max() {
            await this.playAlgorithm(getMax,this.data, this.memento as BSTreeMemento);
    }

    async successor(key:number) {
            await this.playAlgorithm(successor,this.data, key, this.memento as BSTreeMemento);
    }

    async predecessor(key:number) {
            await this.playAlgorithm(predecessor,this.data, key, this.memento as BSTreeMemento);
    }

    async build() {

    }
}

export default BSTreeAnimationController