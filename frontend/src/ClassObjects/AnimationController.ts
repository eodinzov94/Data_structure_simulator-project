import {
  Events, NodeRole,
  TreeNode,
} from '../components/Simulation/BinaryTree/BinaryTreeTypes'
import { sleepWithID } from "../utils/animation-helpers";
import { arrayToBinaryTree } from "../components/Simulation/BinaryTree/Helpers/Functions";
import {
  setActions,
  setArray,
  setCodeRef,
  setPlaying, setRoles,
  setRoot,
} from '../store/reducers/alghoritms/heap-reducer'
import { AppDispatch } from "../store/store";
import { HeapMemento } from "./HeapMemento";
import { CodeReference } from "../components/Simulation/PseudoCode/HeapPseudoCodeData";

abstract class AnimationController {
  speed: number;
  arr: number[];
  stopFlag: boolean;
  pauseFlag: boolean;
  memento: HeapMemento;
  frame: number;
  dispatch: AppDispatch;
  timeOutsArr: NodeJS.Timeout[];
  protected constructor(arr: number[], dispatch: AppDispatch) {
    this.arr = arr;
    this.speed = 1;
    this.pauseFlag = false;
    this.stopFlag = false;
    this.memento = new HeapMemento();
    this.timeOutsArr = [];
    this.frame = 0;
    this.dispatch = dispatch;
  }

  async initNewAnimation() {
    this.stopFlag = true;
    this.clearTimeOuts();
    if (this.memento.getLength()) {
      this.arr = this.memento.getLastArr();
      this.setCurrentActions([]);
      this.setCurrentRoles([]);
      this.setRoot(arrayToBinaryTree(this.arr));
      this.setCurrentArr(this.arr,this.memento.getLastHeapSize());
    }else{
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
        this.setReference({ name: this.memento.getCurrentAlg(), line: 0 });
        this.setCurrentArr(this.memento.getLastArr(),this.memento.getLastHeapSize());
        this.setRoot(arrayToBinaryTree(this.memento.getLastArr()));
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
      this.setRoot(arrayToBinaryTree(this.memento.getArray(i)));
      this.setCurrentArr(this.memento.getArray(i),this.memento.getHeapSize(i));
      await sleepWithID(500 * this.speed, this.timeOutsArr);
    }
    this.setReference({ name: this.memento.getCurrentAlg(), line: 0 });
    this.setPlaying(false);
    this.frame = 0;
  }

  setCurrentActions(actions: Events) {
    this.dispatch(setActions(actions));
  }

  setRoot(node: TreeNode | null) {
    this.dispatch(setRoot(node));
  }

  setCurrentArr(arr: number[],heapSize?: number) {
    if(heapSize!==undefined){
        this.dispatch(setArray({arr,currentHeapSize:heapSize}));
    }else{
        this.dispatch(setArray({arr,currentHeapSize:arr.length}),);
    }
  }
  setCurrentRoles(roles: NodeRole[]) {
    this.dispatch(setRoles(roles));
  }
  setPlaying(value: boolean) {
    this.dispatch(setPlaying(value));
  }

  setReference(ref: CodeReference) {
    this.dispatch(setCodeRef(ref));
  }

  setSpeed(speed: number) {
    this.speed = 1 / speed;
  }

  async pause() {
    this.pauseFlag = true;
    this.clearTimeOuts();
    this.setPlaying(false);
  }

  async jumpToEnd() {
    await this.pause();
    const i = this.memento.getLength() - 1;
    this.setCurrentActions([]);
    this.setCurrentRoles(this.memento.getRoles(i));
    this.setRoot(arrayToBinaryTree(this.memento.getArray(i)));
    this.setCurrentArr(this.memento.getArray(i),this.memento.getHeapSize(i));
    this.setReference(this.memento.getCodeRef(i));
    this.frame = i;
  }

  async jumpToStart() {
    await this.pause();
    this.frame = 0;
    this.setCurrentActions([]);
    this.setCurrentRoles(this.memento.getRoles(0));
    this.setRoot(arrayToBinaryTree(this.memento.getArray(0)));
    this.setReference(this.memento.getCodeRef(0));
    this.setCurrentArr(this.memento.getArray(0),this.memento.getHeapSize(0));
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

  private playFrame() {
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
    this.setRoot(arrayToBinaryTree(this.memento.getArray(this.frame)));
    this.setCurrentArr(this.memento.getArray(this.frame),this.memento.getHeapSize(this.frame));
  }

  clearTimeOuts() {
    this.timeOutsArr.forEach((timeOut) => clearTimeout(timeOut));
    this.timeOutsArr = [];
  }

  setArray(arr: number[]) {
    this.arr = arr;
    this.memento.clearSnapshots();
    this.setRoot(arrayToBinaryTree(arr));
    this.setCurrentArr(arr);
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
  }
}

export default AnimationController;
