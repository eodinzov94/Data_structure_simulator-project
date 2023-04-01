import { buildMaxHeap, heapExtractMax, heapMax } from '../components/Simulation/Heap/HeapAlgorithms'
import { AppDispatch } from '../store/store'
import AnimationController from './AnimationController'


class HeapAnimationController extends AnimationController {
  private static controller: null | HeapAnimationController = null

  private constructor(arr: number[], dispatch: AppDispatch) {
    super(arr, dispatch)
  }

  static getController(arr: number[],
                       dispatch: AppDispatch) {
    if (!HeapAnimationController.controller)
      HeapAnimationController.controller = new HeapAnimationController(arr, dispatch)
    return HeapAnimationController.controller
  }

  async buildMaxHeap() {
    await this.initNewAnimation()
    buildMaxHeap([...this.arr], this.actionArray, this.heapSnapshots)
    this.frame = 0
    await this.playAnimation()
  }

  async heapMax() {
    await this.initNewAnimation()
    heapMax([...this.arr], this.actionArray, this.heapSnapshots)
    this.frame = 0
    await this.playAnimation()
  }

  async extractMax() {
    await this.initNewAnimation()
    heapExtractMax([...this.arr], this.actionArray, this.heapSnapshots)
    this.frame = 0
    await this.playAnimation()
  }

  async insertKey() {
    // TODO:implement
  }

  async heapSort() {
    // TODO:implement
  }
}

export default HeapAnimationController