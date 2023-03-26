import BinaryTree from '../BinaryTree/BinaryTree'
import { TreeNode } from '../BinaryTree/BinaryTreeTypes'
import { useState } from 'react'
import { arrayToBinaryTree } from '../BinaryTree/Helpers/Functions'
import { sleep } from '../../../utils/animation-helpers'
import { Events, HeapSnapshots } from '../BinaryTree/Helpers/MapActionToStyles'
import { buildMaxHeap } from './HeapAlgorithms'
import HeapArray from './HeapArray/HeapArray'

function calculateHeight(root: TreeNode | undefined): number {
  if (!root) {
    return 0
  }
  return Math.max(calculateHeight(root.left), calculateHeight(root.right)) + 1
}
const Heap = () => {
  // const heapArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const heapArray= [1,2,3]
  const heapRoot = arrayToBinaryTree(heapArray)
  const [root, setRoot] = useState<TreeNode>(heapRoot)
  const [currentActions, setCurrentActions] = useState<Events>([])
  const [currentArr, setCurrentArr] = useState(heapArray)


  const Animate = async () => {
    const actionsArr: Events[] = []
    const heapSnapshots: HeapSnapshots = []
    buildMaxHeap(heapArray, actionsArr,heapSnapshots)
    //change to iterate with i, and i will be saved as state - will help with memento
    if(actionsArr.length!==heapSnapshots.length){
      throw new Error("Heap snapshot length does not match actions array length")
    }
    for (let i = 0; i < actionsArr.length; i++) {
      setCurrentActions(actionsArr[i])
      setRoot(arrayToBinaryTree(heapSnapshots[i]))
      setCurrentArr(heapSnapshots[i])
      await sleep(2000)
    }
  }
    return (
      <>
        <button onClick={Animate}>Start Animation</button>
        <div className="container mx-auto max-w-7xl px-0 py-0 mt-60">
          <HeapArray items={currentArr} actions={currentActions}/>
        </div>
        <BinaryTree root={root} level={0} height={calculateHeight(root)} speed={1} zoomPercentage={1}
                    actions={currentActions} />
        {/*<button onClick={() => setCurrentArr(heapArray2)}>*/}
        {/*    Click me 2!*/}
        {/*</button>*/}
      </>
    )
  }

  export default Heap
