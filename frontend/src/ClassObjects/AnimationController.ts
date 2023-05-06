import {AppDispatch} from "../store/store";
import {Events, NodeRole} from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import {setActions, setRoles} from "../store/reducers/alghoritms/heap-reducer";
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
    this.dispatch(setActions(actions));
  }


  setCurrentRoles(roles: NodeRole[]) {
    this.dispatch(setRoles(roles));
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
    this.pauseFlag = true;
    this.clearTimeOuts();
    this.setPlaying(false);
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
