import {
    buildMaxHeap,
    heapExtractMax,
    heapMax,
    maxHeapInsert,
    maxHeapSort
} from '../components/Simulation/Heap/HeapAlgorithms'
import {AppDispatch} from '../store/store'
import AnimationController from './AnimationController'
import {arrayToBinaryTree} from "../components/Simulation/BinaryTree/Helpers/Functions";
import {Events, NodeRole, TreeNode} from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import {
    setActions,
    setArray,
    setCodeRef,
    setPlaying,
    setRoles,
    setRoot
} from "../store/reducers/alghoritms/heap-reducer";
import {HeapMemento} from "./HeapMemento";
import {CodeReference, HeapAlgNames} from "../components/Simulation/PseudoCode/HeapPseudoCodeData";

class HeapAnimationController extends AnimationController<number[], HeapAlgNames> {
    private static controller: null | HeapAnimationController = null

    private constructor(arr: number[], dispatch: AppDispatch,) {
        super(dispatch, new HeapMemento(), arr)
        buildMaxHeap([...this.data], this.memento as HeapMemento)
    }

    static getController(arr: number[],
                         dispatch: AppDispatch) {
        if (!HeapAnimationController.controller)
            HeapAnimationController.controller = new HeapAnimationController(arr, dispatch)
        return HeapAnimationController.controller
    }

    async buildMaxHeap() {
        await this.playAlgorithm(buildMaxHeap, [...this.data], this.memento)
    }

    async heapMax() {
        await this.playAlgorithm(heapMax, [...this.data], this.memento)
    }

    async extractMax() {
        await this.playAlgorithm(heapExtractMax, [...this.data], this.memento)

    }

    async insertKey(key: number) {
        if (this.data.length === 15) {
            throw new Error("Array is full");
        }
        await this.playAlgorithm(maxHeapInsert, [...this.data], this.memento, key)
    }

    async heapSort() {
        await this.playAlgorithm(maxHeapSort, [...this.data], this.memento)
    }

    async initNewAnimation() {
        this.stopFlag = true;
        this.clearTimeOuts();
        if (this.memento.getLength()) {
            this.data = this.memento.getLastData();
            this.setCurrentActions([]);
            this.setCurrentRoles([]);
            this.setRoot(arrayToBinaryTree(this.data));
            this.setCurrentArr(this.data, (this.memento as HeapMemento).getLastHeapSize());
        } else {
            this.setCurrentRoles([]);
        }
        this.memento.clearSnapshots();
        this.stopFlag = false;
    }

    setRoot(node: TreeNode | null) {
        this.dispatch(setRoot(node));
    }

    setCurrentArr(arr: number[], heapSize?: number) {
        if (heapSize !== undefined) {
            this.dispatch(setArray({arr, currentHeapSize: heapSize}));
        } else {
            this.dispatch(setArray({arr, currentHeapSize: arr.length}),);
        }
    }

    setPlaying(value: boolean) {
        this.dispatch(setPlaying(value));
    }

    setCurrentActions(actions: Events) {
        this.dispatch(setActions(actions));
    }


    setCurrentRoles(roles: NodeRole[]) {
        this.dispatch(setRoles(roles));
    }


    setAllData(frame: number) {
        this.setCurrentActions(this.memento.getActions(frame));
        this.setCurrentRoles(this.memento.getRoles(frame));
        this.setReference(this.memento.getCodeRef(frame));
        this.setRoot(arrayToBinaryTree(this.memento.getData(frame)));
        this.setCurrentArr(this.memento.getData(frame), (this.memento as HeapMemento).getHeapSize(frame));
    }

    setReference(ref: CodeReference) {
        this.dispatch(setCodeRef(ref));
    }

    initData(arr: number[], heapSize?: number) {
        this.setReference({name: this.memento.getCurrentAlg(), line: 0});
        this.setCurrentArr(arr, heapSize);
        this.setRoot(arrayToBinaryTree(arr));
        this.setCurrentActions([]);
        this.setCurrentRoles([]);
    }

    setArrFromInput(arr: number[]) {
        this.data = arr;
        this.memento.clearSnapshots();
        this.setRoot(arrayToBinaryTree(arr));
        this.setCurrentArr(arr);
        this.setCurrentActions([]);
        this.setCurrentRoles([]);
    }
}

export default HeapAnimationController