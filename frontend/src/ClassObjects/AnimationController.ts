import {Events, TreeNode} from '../components/Simulation/BinaryTree/BinaryTreeTypes'
import { sleepWithID } from '../utils/animation-helpers'
import { arrayToBinaryTree } from '../components/Simulation/BinaryTree/Helpers/Functions'
import {setActions, setArray, setCodeRef, setPlaying, setRoot} from '../store/reducers/alghoritms/heap-reducer'
import { AppDispatch } from '../store/store'
import {Memento} from "./Memento";
import {CodeReference} from "../components/Simulation/PseudoCode/HeapPseudoCodeData";


abstract class AnimationController {
  speed: number
  arr: number[]
  stopFlag: boolean
  pauseFlag: boolean
  memento: Memento
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
    this.memento = new Memento()
    this.timeOutsArr = []
    this.frame = -1
    this.dispatch = dispatch
  }

  async initNewAnimation() {
    this.stopFlag = true
    this.clearTimeOuts()
    if(this.memento.getLength()){
      const i = this.memento.getLength() - 1
      this.arr = this.memento.getLast()
      this.setCurrentActions([])
      this.setRoot(arrayToBinaryTree(this.memento.getArray(i)))
      this.setCurrentArr(this.memento.getArray(i))
    }
    this.memento.clearSnapshots()
    this.stopFlag = false
  }

  async playAnimation() {
    this.setPlaying(true)
    this.pauseFlag = false
    for (let i = this.frame; i < this.memento.getLength(); i++) {
      this.frame = i
      if (this.stopFlag) {
        this.setReference({name:this.memento.getCurrentAlg(),line:0})
        this.setCurrentArr(this.memento.getLast())
        this.setRoot(arrayToBinaryTree(this.memento.getLast()))
        this.setCurrentActions([])
        return;
      }
      if (this.pauseFlag) {
        return;
      }
      this.setReference(this.memento.getReference(i))
      this.setCurrentActions(this.memento.getActions(i))
      this.setRoot(arrayToBinaryTree(this.memento.getArray(i)))
      this.setCurrentArr(this.memento.getArray(i))
      await sleepWithID(500 * this.speed, this.timeOutsArr)
    }
    this.setReference({name:this.memento.getCurrentAlg(),line:0})
    this.setPlaying(false)
    this.frame = 0
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
  setReference(ref:CodeReference) {
    this.dispatch(setCodeRef(ref))
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
    const i = this.memento.getLength() - 1
    this.setCurrentActions([])
    this.setRoot(arrayToBinaryTree(this.memento.getArray(i)))
    this.setCurrentArr(this.memento.getArray(i))
    this.setReference(this.memento.getReference(i))
    this.frame = i
  }
  async jumpToStart() {
    await this.pause()
    this.frame = 0
    this.setCurrentActions([])
    this.setRoot(arrayToBinaryTree(this.memento.getArray(0)))
    this.setReference(this.memento.getReference(0))
    this.setCurrentArr(this.memento.getArray(0))
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
    if(!this.memento){
      return
    }
    if(this.frame >= this.memento.getLength() ){
      this.frame = this.memento.getLength()
      return;
    }
    if(this.frame < 0){
      this.frame = 0
      return;
    }
    this.setCurrentActions(this.memento.getActions(this.frame))
    this.setReference(this.memento.getReference(this.frame))
    this.setRoot(arrayToBinaryTree(this.memento.getArray(this.frame)))
    this.setCurrentArr(this.memento.getArray(this.frame))
  }

  clearTimeOuts() {
    this.timeOutsArr.forEach(timeOut => clearTimeout(timeOut))
    this.timeOutsArr = []
  }
  setArray(arr: number[]) {
    this.arr = arr
    this.memento.clearSnapshots()
    this.setRoot(arrayToBinaryTree(arr))
    this.setCurrentArr(arr)
  }
}

export default AnimationController