import BinaryTree from '../BinaryTree/BinaryTree'
import { TreeNode } from '../BinaryTree/BinaryTreeTypes'
import HeapArray from './HeapArray/HeapArray'
import HeapAnimationController from '../../../ClassObjects/HeapAnimationController'
import { useAppSelector } from '../../../store/hooks'
import { useDispatch } from 'react-redux'
import PlayerControlsPanel from '../ControlsPanels/PlayerControlsPanel'

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
        switch (animation) {
            case 'BuildHeap':
                await controller.buildMaxHeap()
                return
          case 'GetMax':
            await controller.heapMax()
            return
          case 'ExtractMax':
            await controller.extractMax()
            return
            default:
                return
        }

    }
    return (
        <>
            <button onClick={async () => await Animate('BuildHeap')}>Start Animation</button>
          <button onClick={async () => await Animate('GetMax')}>Heap get Max</button>
          <button onClick={async () => await Animate('ExtractMax')}>Heap extract Max</button>
            <div className="container mx-auto max-w-7xl px-0 py-0 mt-64">
                <HeapArray items={currentArr} actions={currentActions} speed={controller.speed}/>
            </div>
            <div className="container mx-auto max-w-7xl px-0 py-0">
                <BinaryTree root={root} level={0} height={calculateHeight(root)} speed={controller.speed}
                            actions={currentActions}/>
            </div>
          <PlayerControlsPanel controller={controller}/>
            {/*<br/>*/}
            {/*<button className='' onClick={() => {*/}
            {/*    controller.stopFlag = !controller.stopFlag*/}
            {/*}}>*/}
            {/*    Skip to end of animation*/}
            {/*</button>*/}
            {/*<br/>*/}
            {/*<button className='' onClick={() => {*/}
            {/*    controller.pauseFlag = !controller.pauseFlag*/}
            {/*}}>*/}
            {/*    Toggle Animation Pause*/}
            {/*</button>*/}
            {/*<br/>*/}
            {/*<button className='' onClick={() => {*/}
            {/*  controller.speed = controller.speed / 2*/}
            {/*}}>*/}
            {/*    Faster Animation*/}
            {/*</button>*/}
            {/*<br/>*/}
            {/*<button className='' onClick={() => {*/}
            {/*  controller.speed = controller.speed * 2*/}
            {/*}}>*/}
            {/*    Slower Animation*/}
            {/*</button>*/}
        </>
    )
}

export default Heap
