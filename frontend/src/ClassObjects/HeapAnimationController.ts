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
import {sleepWithID} from "../utils/animation-helpers";
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
import {CodeReference} from "../components/Simulation/PseudoCode/HeapPseudoCodeData";

class HeapAnimationController extends AnimationController {
    private static controller: null | HeapAnimationController = null
    data: number[];
    memento: HeapMemento

    private constructor(arr: number[], dispatch: AppDispatch) {
        super(dispatch)
        this.data = arr;
        this.memento = new HeapMemento();
        buildMaxHeap([...this.data], this.memento)
    }

    static getController(arr: number[],
                         dispatch: AppDispatch) {
        if (!HeapAnimationController.controller)
            HeapAnimationController.controller = new HeapAnimationController(arr, dispatch)
        return HeapAnimationController.controller
    }

    async buildMaxHeap() {
        await this.initNewAnimation()
        buildMaxHeap([...this.data], this.memento)
        this.setReference({name: this.memento.getCurrentAlg(), line: 0})
        this.frame = 0
        await this.playAnimation()
    }

    async heapMax() {
        await this.initNewAnimation()
        heapMax([...this.data], this.memento)
        this.setReference({name: this.memento.getCurrentAlg(), line: 0})
        this.frame = 0
        await this.playAnimation()
    }

    async extractMax() {
        await this.initNewAnimation()
        heapExtractMax([...this.data], this.memento)
        this.setReference({name: this.memento.getCurrentAlg(), line: 0})
        this.frame = 0
        await this.playAnimation()
    }

    async insertKey(key: number) {
        if (this.data.length === 15) {
            throw new Error("Array is full");
        }
        await this.initNewAnimation()
        maxHeapInsert([...this.data], key, this.memento)
        this.setReference({name: this.memento.getCurrentAlg(), line: 0})
        this.frame = 0
        await this.playAnimation()
    }

    async heapSort() {
        await this.initNewAnimation()
        maxHeapSort([...this.data], this.memento)
        this.setReference({name: this.memento.getCurrentAlg(), line: 0})
        this.frame = 0
        await this.playAnimation()
    }

    async initNewAnimation() {
        this.stopFlag = true;
        this.clearTimeOuts();
        if (this.memento.getLength()) {
            this.data = this.memento.getLastData();
            this.setCurrentActions([]);
            this.setCurrentRoles([]);
            this.setRoot(arrayToBinaryTree(this.data));
            this.setCurrentArr(this.data, this.memento.getLastHeapSize());
        } else {
            this.setCurrentRoles([]);
        }
        this.memento.clearSnapshots();
        this.stopFlag = false;
    }

    async playAnimation() {
        this.setPlaying(true);
        this.pauseFlag = false;
        for (let i = this.frame; i < this.memento.getLength(); i++) {
            this.frame = i;
            if (this.stopFlag) {
                this.setReference({name: this.memento.getCurrentAlg(), line: 0});
                this.setCurrentArr(this.memento.getLastData(), this.memento.getLastHeapSize());
                this.setRoot(arrayToBinaryTree(this.memento.getLastData()));
                this.setCurrentActions([]);
                this.setCurrentRoles([]);
                return;
            }
            if (this.pauseFlag) {
                return;
            }
            this.setReference(this.memento.getCodeRef(i));
            this.setCurrentActions(this.memento.getActions(i));
            this.setCurrentRoles(this.memento.getRoles(i));
            this.setRoot(arrayToBinaryTree(this.memento.getData(i)));
            this.setCurrentArr(this.memento.getData(i), this.memento.getHeapSize(i));
            await sleepWithID(500 * this.speed, this.timeOutsArr);
        }
        this.setReference({name: this.memento.getCurrentAlg(), line: 0});
        this.setPlaying(false);
        this.frame = 0;
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

    async pause() {
        this.pauseFlag = true;
        this.clearTimeOuts();
        this.setPlaying(false);
    }

    setCurrentRoles(roles: NodeRole[]) {
        this.dispatch(setRoles(roles));
    }

    async jumpToEnd() {
        await this.pause();
        const i = this.memento.getLength() - 1;
        this.setCurrentActions([]);
        this.setCurrentRoles(this.memento.getRoles(i));
        this.setRoot(arrayToBinaryTree(this.memento.getData(i)));
        this.setCurrentArr(this.memento.getData(i), this.memento.getHeapSize(i));
        this.setReference(this.memento.getCodeRef(i));
        this.frame = i;
    }


    setReference(ref: CodeReference) {
        this.dispatch(setCodeRef(ref));
    }


    async jumpToStart() {
        await this.pause();
        this.frame = 0;
        this.setCurrentActions([]);
        this.setCurrentRoles(this.memento.getRoles(0));
        this.setRoot(arrayToBinaryTree(this.memento.getData(0)));
        this.setReference(this.memento.getCodeRef(0));
        this.setCurrentArr(this.memento.getData(0), this.memento.getHeapSize(0));
    }

    async playNextFrame() {
        await this.pause();
        this.frame += 1;
        this.playFrame();
    }

    async playPreviousFrame() {
        await this.pause();
        this.frame -= 1;
        this.playFrame();
    }

    protected playFrame() {
        if (!this.memento) {
            return;
        }
        if (this.frame >= this.memento.getLength()) {
            this.frame = this.memento.getLength();
            return;
        }
        if (this.frame < 0) {
            this.frame = 0;
            return;
        }
        this.setCurrentActions(this.memento.getActions(this.frame));
        this.setCurrentRoles(this.memento.getRoles(this.frame));
        this.setReference(this.memento.getCodeRef(this.frame));
        this.setRoot(arrayToBinaryTree(this.memento.getData(this.frame)));
        this.setCurrentArr(this.memento.getData(this.frame), this.memento.getHeapSize(this.frame));
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