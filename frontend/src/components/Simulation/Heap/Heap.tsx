import BinaryTree from '../BinaryTree/BinaryTree'
import { TreeNode } from '../BinaryTree/BinaryTreeTypes'
import HeapArray from './HeapArray/HeapArray'
import HeapAnimationController from '../BinaryTree/ClassObjects/HeapAnimationController'
import { useAppSelector } from '../../../store/hooks'
import { useDispatch } from 'react-redux'

function calculateHeight(root: TreeNode | undefined): number {
    if (!root) {
        return 0
    }
    return Math.max(calculateHeight(root.left), calculateHeight(root.right)) + 1
}
const Heap = () => {
    const root = useAppSelector(state => state.heap.root)
    const currentActions = useAppSelector(state => state.heap.currentActions)
    const currentArr = useAppSelector(state => state.heap.currentArr)
    const controller = HeapAnimationController
                                              .getController(currentArr,useDispatch())

    const Animate = async (animation: string) => {
        // switch (animation) {
        //     case 'abc':
        //         return
        //
        //     default:
        //         await controller.buildMaxHeap()
        //         return
        // }
        await controller.buildMaxHeap()
    }
    return (
        <>
            <button onClick={async () => await Animate('')}>Start Animation</button>
            <div className="container mx-auto max-w-7xl px-0 py-0 mt-64">
                <HeapArray items={currentArr} actions={currentActions} speed={controller.speed}/>
            </div>
            <div className="container mx-auto max-w-7xl px-0 py-0">
                <BinaryTree root={root} level={0} height={calculateHeight(root)} speed={controller.speed}
                            actions={currentActions}/>
            </div>
            <br/>
            <button className='' onClick={() => {
                controller.stopFlag = !controller.stopFlag
            }}>
                Skip to end of animation
            </button>
            <br/>
            <button className='' onClick={() => {
                controller.pauseFlag = !controller.pauseFlag
            }}>
                Toggle Animation Pause
            </button>
            <br/>
            <button className='' onClick={() => {
              controller.speed = controller.speed / 2
            }}>
                Faster Animation
            </button>
            <br/>
            <button className='' onClick={() => {
              controller.speed = controller.speed * 2
            }}>
                Slower Animation
            </button>
        </>
    )
}

export default Heap
