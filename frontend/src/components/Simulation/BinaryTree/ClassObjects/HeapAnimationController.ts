import { TreeNode } from '../BinaryTreeTypes'
import { Events, HeapSnapshots } from '../Helpers/MapActionToStyles'
import { sleep } from '../../../../utils/animation-helpers'
import { buildMaxHeap } from '../../Heap/HeapAlgorithms'
import { arrayToBinaryTree } from '../Helpers/Functions'
import { setActions, setArray, setRoot } from '../../../../store/reducers/alghoritms/heap-reducer'
import { AppDispatch } from '../../../../store/store'


class HeapAnimationController {
  speed: number
  arr: number[]
  stopFlag: boolean
  pauseFlag: boolean
  actionArray: Events[]
  heapSnapshots: HeapSnapshots
  frame: number
  dispatch: AppDispatch


  private static controller: null | HeapAnimationController = null

  private constructor(arr: number[],
                      dispatch: AppDispatch,
  ) {
    this.arr = arr
    this.speed = 1
    this.pauseFlag = false
    this.stopFlag = false
    this.actionArray = []
    this.heapSnapshots = []
    this.frame = -1
    this.dispatch = dispatch
  }

  public static getController(arr: number[],
                              dispatch: AppDispatch) {
    if (!HeapAnimationController.controller)
      HeapAnimationController.controller = new HeapAnimationController(arr, dispatch)
    return HeapAnimationController.controller
  }

  public async buildMaxHeap() {
    this.stopFlag = true
    await sleep(500 * this.speed)
    this.actionArray = []
    this.heapSnapshots = []
    this.stopFlag = false
    this.pauseFlag = false
    buildMaxHeap([...this.arr], this.actionArray, this.heapSnapshots)
    this.frame = 0
    await this.playAnimation()

  }

  private async playAnimation() {
    if (this.actionArray.length !== this.heapSnapshots.length) {
      throw new Error('Heap snapshot length does not match actions array length')
    }
    for (let i = this.frame; i < this.actionArray.length; i++) {
      if (this.stopFlag) {
        this.setCurrentArr(this.heapSnapshots[this.heapSnapshots.length - 1])
        this.setRoot(arrayToBinaryTree(this.heapSnapshots[this.heapSnapshots.length - 1]))
        this.frame = i
        this.setCurrentActions([])
        break
      }
      if (this.pauseFlag) {
        this.frame = i
        break
      }
      this.setCurrentActions(this.actionArray[i])
      this.setRoot(arrayToBinaryTree(this.heapSnapshots[i]))
      this.setCurrentArr(this.heapSnapshots[i])
      await sleep(500 * this.speed)
    }
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
}

export default HeapAnimationController