import BinaryTree from '../BinaryTree/BinaryTree'
import {TreeNode} from '../BinaryTree/BinaryTreeTypes'
import {useEffect, useRef, useState} from 'react'
import {arrayToBinaryTree} from '../BinaryTree/Helpers/Functions'
import {sleep} from '../../../utils/animation-helpers'
import {Events, HeapSnapshots} from '../BinaryTree/Helpers/MapActionToStyles'
import {buildMaxHeap} from './HeapAlgorithms'
import HeapArray from './HeapArray/HeapArray'
import HeapAnimationController from "../BinaryTree/ClassObjects/HeapAnimationController";

function calculateHeight(root: TreeNode | undefined): number {
    if (!root) {
        return 0
    }
    return Math.max(calculateHeight(root.left), calculateHeight(root.right)) + 1
}
const Heap = () => {
    // const heapArray = [17, 14, 13, 10, 5, 8, 7, 2, 1, 0]
    const heapArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, -Infinity]
    const heapRoot = arrayToBinaryTree(heapArray)
    const [root, setRoot] = useState<TreeNode>(heapRoot)
    const [currentActions, setCurrentActions] = useState<Events>([])
    const [currentArr, setCurrentArr] = useState(heapArray)
    const currentFrame = useRef(-1)
    const speed = useRef(1);
    const stopFlag = useRef(false);
    const pauseFlag = useRef(false);
    const controller = HeapAnimationController.getController(heapArray, speed, pauseFlag, stopFlag, setCurrentArr, setRoot, setCurrentActions, currentFrame)

    useEffect( () =>
        console.log(heapArray)
    ,[heapArray])

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
                <HeapArray items={currentArr} actions={currentActions} speed={speed}/>
            </div>
            <div className="container mx-auto max-w-7xl px-0 py-0">
                <BinaryTree root={root} level={0} height={calculateHeight(root)} speed={speed}
                            actions={currentActions}/>
            </div>
            <br/>
            <button className='' onClick={() => {
                stopFlag.current = !stopFlag.current
            }}>
                Skip to end of animation
            </button>
            <br/>
            <button className='' onClick={() => {
                pauseFlag.current = !pauseFlag.current
            }}>
                Toggle Animation Pause
            </button>
            <br/>
            <button className='' onClick={() => {
                speed.current = speed.current / 2
            }}>
                Faster Animation
            </button>
            <br/>
            <button className='' onClick={() => {
                speed.current = speed.current * 2
            }}>
                Slower Animation
            </button>
        </>
    )
}

export default Heap
