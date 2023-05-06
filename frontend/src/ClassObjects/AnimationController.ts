import {AppDispatch} from "../store/store";
import {NodeRole} from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import {Memento} from "./Memento";
import {sleepWithID} from "../utils/animation-helpers";

abstract class AnimationController<T, Y> {
    speed: number;
    stopFlag: boolean;
    pauseFlag: boolean;
    frame: number;
    dispatch: AppDispatch;
    timeOutsArr: NodeJS.Timeout[];
    memento: Memento<T, Y>
    data: T;

    protected constructor(dispatch: AppDispatch, memento: Memento<T, Y>, data: T) {
        this.speed = 1;
        this.pauseFlag = false;
        this.stopFlag = false;
        this.timeOutsArr = [];
        this.frame = 0;
        this.dispatch = dispatch;
        this.memento = memento;
        this.data = data;
    }


    async initNewAnimation() {
        this.stopFlag = true;
        this.clearTimeOuts();
        if (this.memento.getLength()) {
            this.data = this.memento.getLastData();
            this.initData(this.data)
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
                this.initData(this.memento.getLastData());
                return;
            }
            if (this.pauseFlag) {
                return;
            }
            this.setAllData(i)
            await sleepWithID(500 * this.speed, this.timeOutsArr);
        }
        this.setReference({name: this.memento.getCurrentAlg(), line: 0});
        this.setPlaying(false);
        this.frame = 0;
    }

    async playAlgorithm(algFunc: Function, ...args: any[]) {
        await this.initNewAnimation()
        algFunc(...args)
        this.setReference({name: this.memento.getCurrentAlg(), line: 0})
        this.frame = 0
        await this.playAnimation()
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
        await this.jumpToFrame(this.memento.getLength() - 1)
        this.setCurrentRoles([])
    }

    async jumpToFrame(frame: number) {
        if (!this.memento) {
            return;
        }
        if (frame >= this.memento.getLength()) {
            this.frame = this.memento.getLength();
            return;
        }
        if (frame < 0) {
            this.frame = 0;
            return;
        }
        this.frame = frame;
        await this.pause();
        this.setAllData(this.frame)
    }

    async jumpToStart() {
        await this.jumpToFrame(0)
    }

    async playNextFrame() {
        await this.jumpToFrame(this.frame + 1)
    }

    async playPreviousFrame() {
        await this.jumpToFrame(this.frame - 1)
    }


    clearTimeOuts() {
        this.timeOutsArr.forEach((timeOut) => clearTimeout(timeOut));
        this.timeOutsArr = [];
    }

    setAllData(frame: number) {
        //implement in subclasses
    }

    initData(...args: any[]) {
        //implement in subclasses
    }

    setReference(ref: any) {
        //implement in subclasses
    }

    setCurrentRoles(roles: NodeRole[]) {
        //implement in subclasses
    }

    setPlaying(value: boolean) {
        //implement in subclasses
    }

}

export default AnimationController;
