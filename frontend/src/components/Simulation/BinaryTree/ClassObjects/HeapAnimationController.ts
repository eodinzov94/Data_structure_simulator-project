import {Dispatch, MutableRefObject, SetStateAction} from "react";
import {TreeNode} from "../BinaryTreeTypes";
import {Events, HeapSnapshots} from "../Helpers/MapActionToStyles";
import {sleep} from "../../../../utils/animation-helpers";
import {buildMaxHeap} from "../../Heap/HeapAlgorithms";
import {arrayToBinaryTree} from "../Helpers/Functions";

class HeapAnimationController {
    speed: MutableRefObject<number>;
    arr: number[];
    stopFlag: MutableRefObject<boolean>;
    pauseFlag: MutableRefObject<boolean>;
    setCurrentArr: Dispatch<SetStateAction<number[]>>;
    setRoot: Dispatch<SetStateAction<TreeNode>>;
    setCurrentActions: Dispatch<SetStateAction<Events>>;
    actionArray: Events[];
    heapSnapshots: HeapSnapshots;
    frame: MutableRefObject<number>;


    private static controller: null | HeapAnimationController = null

    private constructor(arr: number[],
                        speed: MutableRefObject<number>,
                        pauseFlag: MutableRefObject<boolean>,
                        stopFlag: MutableRefObject<boolean>,
                        setCurrentArr: Dispatch<SetStateAction<number[]>>,
                        setRoot: Dispatch<SetStateAction<TreeNode>>,
                        setCurrentActions: Dispatch<SetStateAction<Events>>,
                        frame: MutableRefObject<number>) {
        this.arr = arr;
        this.speed = speed;
        this.pauseFlag = pauseFlag;
        this.stopFlag = stopFlag;
        this.setCurrentArr = setCurrentArr;
        this.setRoot = setRoot;
        this.setCurrentActions = setCurrentActions;
        this.actionArray = [];
        this.heapSnapshots = [];
        this.frame = frame;
    }

    public static getController(arr: number[],
                                speed: MutableRefObject<number>,
                                pauseFlag: MutableRefObject<boolean>,
                                stopFlag: MutableRefObject<boolean>,
                                setCurrentArr: Dispatch<SetStateAction<number[]>>,
                                setRoot: Dispatch<SetStateAction<TreeNode>>,
                                setCurrentActions: Dispatch<SetStateAction<Events>>,
                                frame: MutableRefObject<number>) {
        if (!HeapAnimationController.controller)
            HeapAnimationController.controller = new HeapAnimationController(arr, speed, pauseFlag, stopFlag, setCurrentArr, setRoot, setCurrentActions, frame)
        return HeapAnimationController.controller
    }

    public async buildMaxHeap() {
        this.stopFlag.current = true
        await sleep(500 * this.speed.current)
        this.actionArray = [];
        this.heapSnapshots = [];
        this.stopFlag.current = false;
        this.pauseFlag.current = false;
        buildMaxHeap(this.arr, this.actionArray, this.heapSnapshots)
        this.frame.current = 0;
        await this.playAnimation()

    }

    private async playAnimation() {
        if (this.actionArray.length !== this.heapSnapshots.length) {
            throw new Error("Heap snapshot length does not match actions array length")
        }
        for (let i = this.frame.current; i < this.actionArray.length; i++) {
            // if (this.stopFlag.current) {
            //     this.setCurrentArr(this.heapSnapshots[this.heapSnapshots.length - 1])
            //     this.setRoot(arrayToBinaryTree(this.heapSnapshots[this.heapSnapshots.length - 1]))
            //     this.setCurrentFrame(this.heapSnapshots.length)
            //     this.frame.current = i
            //     this.setCurrentActions([])
            //     return
            // }
            // if(this.pauseFlag.current){
            //     this.setCurrentFrame(i)
            //     this.frame.current = i
            //     return
            // }
            this.setCurrentActions(this.actionArray[i])
            this.setRoot(arrayToBinaryTree(this.heapSnapshots[i]))
            this.setCurrentArr(this.heapSnapshots[i])
            await sleep(500 * this.speed.current)
        }
    }
}

export default HeapAnimationController;