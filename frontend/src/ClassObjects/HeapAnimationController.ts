import {
  buildMaxHeap,
  heapExtractMax,
  heapMax,
  maxHeapInsert,
  maxHeapSort
} from '../components/Simulation/Heap/HeapAlgorithms'
import { AppDispatch } from '../store/store'
import AnimationController from './AnimationController'


class HeapAnimationController extends AnimationController {
  private static controller: null | HeapAnimationController = null

  private constructor(arr: number[], dispatch: AppDispatch) {
    super(arr, dispatch)
    buildMaxHeap([...this.arr], this.memento)
  }

  static getController(arr: number[],
                       dispatch: AppDispatch) {
    if (!HeapAnimationController.controller)
      HeapAnimationController.controller = new HeapAnimationController(arr, dispatch)
    return HeapAnimationController.controller
  }

  async buildMaxHeap() {
    await this.initNewAnimation()
    buildMaxHeap([...this.arr], this.memento)
    this.setReference({name:this.memento.getCurrentAlg(),line:0})
    this.frame = 0
    await this.playAnimation()
  }

  async heapMax() {
    await this.initNewAnimation()
    heapMax([...this.arr], this.memento)
    this.setReference({name:this.memento.getCurrentAlg(),line:0})
    this.frame = 0
    await this.playAnimation()
  }

  async extractMax() {
    await this.initNewAnimation()
    heapExtractMax([...this.arr], this.memento)
    this.setReference({name:this.memento.getCurrentAlg(),line:0})
    this.frame = 0
    await this.playAnimation()
  }

  async insertKey(key:number) {
    await this.initNewAnimation()
    maxHeapInsert([...this.arr], key, this.memento)
    this.setReference({name:this.memento.getCurrentAlg(),line:0})
    this.frame = 0
    await this.playAnimation()
  }

  async heapSort() {
    await this.initNewAnimation()
    maxHeapSort([...this.arr], this.memento)
    this.setReference({name:this.memento.getCurrentAlg(),line:0})
    this.frame = 0
    await this.playAnimation()
  }
}

export default HeapAnimationController