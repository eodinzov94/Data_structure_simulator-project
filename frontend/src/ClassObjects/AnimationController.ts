import {AppDispatch} from "../store/store";
import {Events, NodeRole} from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import {CodeReference} from "../components/Simulation/PseudoCode/HeapPseudoCodeData";

abstract class AnimationController {
  speed: number;
  stopFlag: boolean;
  pauseFlag: boolean;
  frame: number;
  dispatch: AppDispatch;
  timeOutsArr: NodeJS.Timeout[];
  protected constructor(dispatch: AppDispatch) {
    this.speed = 1;
    this.pauseFlag = false;
    this.stopFlag = false;
    this.timeOutsArr = [];
    this.frame = 0;
    this.dispatch = dispatch;
  }
  async initNewAnimation() {
    //implement in subclasses
  }

  async playAnimation() {
    //implement in subclasses
  }

  setCurrentActions(actions: Events) {
    //implement in subclasses
  }


  setCurrentRoles(roles: NodeRole[]) {
    //implement in subclasses
  }

  setPlaying(value: boolean) {
    //implement in subclasses
  }

  setReference(ref: CodeReference) {
    //implement in subclasses


  }

  setSpeed(speed: number) {
    this.speed = 1 / speed;
  }

  async pause() {

  }

  async jumpToEnd() {
    //implement in subclasses
  }

  async jumpToStart() {
    //implement in subclasses
  }

  async playNextFrame() {
    //implement in subclasses
  }

  async playPreviousFrame() {
    //implement in subclasses
  }

  protected playFrame() {
    //implement in subclasses
  }

  clearTimeOuts() {
    this.timeOutsArr.forEach((timeOut) => clearTimeout(timeOut));
    this.timeOutsArr = [];
  }

  setRoot(node: any) {
    //implement in subclasses
  }
}

export default AnimationController;
