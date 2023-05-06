import AnimationController from "./AnimationController";
import {BSTreeMemento} from "./BSTreeMemento";
import {BST_Node} from "../components/Simulation/BST/BST_Algorithms";
import {AppDispatch} from "../store/store";
import {setActions, setCodeRef, setPlaying, setRoles, setRoot} from "../store/reducers/alghoritms/bst-reducer";
import {Events, NodeRole} from "../components/Simulation/BinaryTree/BinaryTreeTypes";


class BSTreeAnimationController extends AnimationController<BST_Node | null,string> {
    private static controller: null | BSTreeAnimationController = null

    private constructor(root: BST_Node | null, dispatch: AppDispatch) {
        super(dispatch, new BSTreeMemento(),root)
    }

    static getController(root: BST_Node,
                         dispatch: AppDispatch) {
        if (!BSTreeAnimationController.controller)
            BSTreeAnimationController.controller = new BSTreeAnimationController(root, dispatch)
        return BSTreeAnimationController.controller
    }


    setRoot(node: BST_Node | null) {
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
    setReference(ref: any) {
        this.dispatch(setCodeRef(ref));
    }

    setAllData(index: number) {
        this.setRoot(this.memento.getData(index));
        this.setCurrentActions(this.memento.getActions(index));
        this.setCurrentRoles(this.memento.getRoles(index));
        this.setReference(this.memento.getCodeRef(index));
    }
    initData(data: BST_Node | null) {
        this.setReference({name: this.memento.getCurrentAlg(), line: 0});
        this.setRoot(data);
        this.setCurrentActions([]);
        this.setCurrentRoles([]);
    }
    setTreeFromInput(root: BST_Node | null) {
        this.data = root;
        this.memento.clearSnapshots();
        this.setRoot(root);
        this.setCurrentActions([]);
        this.setCurrentRoles([]);
    }
}

export default BSTreeAnimationController