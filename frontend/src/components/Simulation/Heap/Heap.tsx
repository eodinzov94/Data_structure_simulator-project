import BinaryTree from '../BinaryTree/BinaryTree'
import { TreeNode } from '../BinaryTree/BinaryTreeTypes'
import { useState } from 'react'
import { arrayToBinaryTree } from '../BinaryTree/Helpers/Functions'
import { sleep } from '../../../utils/animation-helpers'
import { Events, HeapSnapshots } from '../BinaryTree/Helpers/MapActionToStyles'
import { buildMaxHeap } from './HeapAlgorithms'

function calculateHeight(root: TreeNode | undefined): number {
  if (!root) {
    return 0
  }
  return Math.max(calculateHeight(root.left), calculateHeight(root.right)) + 1
}

const Heap = () => {
  const heapArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const heapRoot = arrayToBinaryTree(heapArray)
  // const treeNode2 = arrayToBinaryTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
  // const treeNode3 = arrayToBinaryTree([1, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
  const [root, setRoot] = useState<TreeNode>(heapRoot)
  const [currentActions, setCurrentActions] = useState<Events | null>(null)


  const Animate = async () => {
    const actionsArr: Events[] = []
    const heapSnapshots: HeapSnapshots = []
    buildMaxHeap(heapArray, actionsArr,heapSnapshots)
    //change to iterate with i, and i will be save as state - will help with memento
    if(actionsArr.length!==heapSnapshots.length){
      throw new Error("Heap snapshot length does not match actions array length")
    }
    for (let i = 0; i < actionsArr.length; i++) {
      if(heapSnapshots[i]!==null){
        setCurrentActions(actionsArr[i])
        setRoot(arrayToBinaryTree(heapSnapshots[i]!))
      }else{
        setCurrentActions(actionsArr[i])
      }
      await sleep(2000)
    }
  }
    return (
      <>
        <BinaryTree root={root} level={0} height={calculateHeight(root)} speed={1} zoomPercentage={1}
                    actions={currentActions} />
        <button onClick={Animate}>Start Animation</button>
        {/*<button onClick={() => setRoot(treeNode2!)}>*/}
        {/*    Click me 2!*/}
        {/*</button>*/}
        {/*<button onClick={() => setRoot(treeNode3!)}>*/}
        {/*    Click me 3!*/}
        {/*</button>*/}
      </>
    )
  }

  export default Heap
