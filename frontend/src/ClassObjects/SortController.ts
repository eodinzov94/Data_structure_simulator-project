import { SortOperations } from "../components/Simulation/Sorts/helpers/types";
import { animationControlActions } from "../store/reducers/animation-control-reducer";
import { AppDispatch } from "../store/store";
import { sleep } from "../utils/animation-helpers";

export default class SortController {
  private static controller: null | SortController;
  speed: number;
  frame: number;
  isAnimate: boolean;
  stopFlag: boolean;
  dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.speed = 1;
    this.frame = 0;
    this.isAnimate = false;
    this.stopFlag = false;
    this.dispatch = dispatch;
  }

  //singleton
  static getController(dispatch: AppDispatch) {
    if (!SortController.controller)
      SortController.controller = new SortController(dispatch);
    return SortController.controller;
  }

  //Setters
  setSpeed(speed: number) {
    this.speed = 1 / speed;
  }
  setFrame(frame: number) {
    this.frame = frame;
  }
  setIsAnimate(val: boolean) {
    this.isAnimate = val;
  }
  setStopFlag(val: boolean) {
    console.log(val);

    this.stopFlag = val;
    this.dispatch(animationControlActions.SetIsPlaying(!val));
  }

  //Animation Funcs
  async Sort(opArr: SortOperations) {
    this.dispatch(animationControlActions.SetIsPlaying(true));
    this.dispatch(animationControlActions.SetIsAnimate(true));

    this.stopFlag = false;

    for (var op of opArr) {
      if (this.stopFlag) {
        break;
      }
      this.dispatch(op.action(op.payload));
      await sleep(1000 * this.speed);
    }
  }
}
