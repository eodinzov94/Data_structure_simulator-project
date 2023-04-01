import { Events, HeapSnapshots, TreeNode } from '../components/Simulation/BinaryTree/BinaryTreeTypes'
import { sleepWithID } from '../utils/animation-helpers'
import { arrayToBinaryTree } from '../components/Simulation/BinaryTree/Helpers/Functions'
import { setActions, setArray, setPlaying, setRoot } from '../store/reducers/alghoritms/heap-reducer'
import { AppDispatch } from '../store/store'


abstract class AnimationController {
  speed: number
  arr: number[]
  stopFlag: boolean
  pauseFlag: boolean
  actionArray: Events[]
  heapSnapshots: HeapSnapshots
  frame: number
  dispatch: AppDispatch
  timeOutsArr: NodeJS.Timeout[]


  protected constructor(arr: number[],
                        dispatch: AppDispatch,
  ) {
    this.arr = arr
    this.speed = 1
    this.pauseFlag = false
    this.stopFlag = false
    this.actionArray = []
    this.heapSnapshots = []
    this.timeOutsArr = []
    this.frame = -1
    this.dispatch = dispatch
  }

  async initNewAnimation() {
    this.stopFlag = true
    this.clearTimeOuts()
    if(this.heapSnapshots.length){
      this.arr = this.heapSnapshots[this.heapSnapshots.length - 1]
    }
    this.actionArray = []
    this.heapSnapshots = []
    this.stopFlag = false
  }

  async playAnimation() {
    this.setPlaying(true)
    this.pauseFlag = false
    if (this.actionArray.length !== this.heapSnapshots.length) {
      throw new Error('Heap snapshot length does not match actions array length')
    }
    console.log(this.frame)
    for (let i = this.frame; i < this.actionArray.length; i++) {
      this.frame = i
      if (this.stopFlag) {
        this.setCurrentArr(this.heapSnapshots[this.heapSnapshots.length - 1])
        this.setRoot(arrayToBinaryTree(this.heapSnapshots[this.heapSnapshots.length - 1]))
        this.setCurrentActions([])
        return;
      }
      if (this.pauseFlag) {
        return;
      }
      this.setCurrentActions(this.actionArray[i])
      this.setRoot(arrayToBinaryTree(this.heapSnapshots[i]))
      this.setCurrentArr(this.heapSnapshots[i])
      await sleepWithID(500 * this.speed, this.timeOutsArr)
    }
    this.setPlaying(false)
  }

  setCurrentActions(actions: Events) {
    this.dispatch(setActions(actions))
  }

  setRoot(node: TreeNode) {
    this.dispatch(setRoot(node))
  }

  setCurrentArr(arr: number[]) {
    this.dispatch(setArray(arr))
  }
  setPlaying(value:boolean) {
    this.dispatch(setPlaying(value))
  }
  setSpeed(speed: number) {
    this.speed = 1/speed
  }
  async pause() {
    this.pauseFlag = true
    this.clearTimeOuts()
    this.setPlaying(false)
  }
  async jumpToEnd() {
    await this.pause()
    const i = this.actionArray.length - 1
    this.setCurrentActions([])
    this.setRoot(arrayToBinaryTree(this.heapSnapshots[i]))
    this.setCurrentArr(this.heapSnapshots[i])
    this.frame = i
  }
  async jumpToStart() {
    await this.pause()
    this.frame = 0
    this.setCurrentActions([])
    this.setRoot(arrayToBinaryTree(this.heapSnapshots[0]))
    this.setCurrentArr(this.heapSnapshots[0])
  }
  async playNextFrame() {
    await this.pause()
    this.frame += 1
    this.playFrame()
  }
  async playPreviousFrame() {
    await this.pause()
    this.frame -= 1
    this.playFrame()
  }
  private playFrame() {
    if(this.frame >= this.actionArray.length ){
      this.frame = this.actionArray.length
      return;
    }
    if(this.frame < 0){
      this.frame = 0
      return;
    }
    this.setCurrentActions(this.actionArray[this.frame])
    this.setRoot(arrayToBinaryTree(this.heapSnapshots[this.frame]))
    this.setCurrentArr(this.heapSnapshots[this.frame])
  }

  clearTimeOuts() {
    this.timeOutsArr.forEach(timeOut => clearTimeout(timeOut))
    this.timeOutsArr = []
  }
}

export default AnimationController