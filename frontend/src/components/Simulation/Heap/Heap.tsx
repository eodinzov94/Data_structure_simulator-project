import BinaryTree from '../BinaryTree/BinaryTree'
import {TreeNode} from '../BinaryTree/BinaryTreeTypes'
import HeapArray from './HeapArray/HeapArray'
import HeapAnimationController from '../../../ClassObjects/HeapAnimationController'
import {useAppSelector} from '../../../store/hooks'
import {useDispatch} from 'react-redux'
import PlayerControlsPanel from '../ControlsPanels/PlayerControlsPanel'
import HeapControlsPanel from '../ControlsPanels/HeapControlsPanel'
import {PseudoCode} from "../PseudoCode/PseudoCode";
import {HeapsortPseudoCode} from "../PseudoCode/HeapPseudoCodeData";
import {FC} from "react";

function calculateHeight(root: TreeNode | undefined): number {
    if (!root) {
        return 0
    }
    return Math.max(calculateHeight(root.left), calculateHeight(root.right)) + 1
}

const Heap: FC = () => {
    const root = useAppSelector(state => state.heap.root)
    const currentActions = useAppSelector(state => state.heap.currentActions)
    const currentArr = useAppSelector(state => state.heap.currentArr)
    const currentAlg = useAppSelector(state => state.heap.currentAlg)
    const currentLine = useAppSelector(state => state.heap.currentLine)
    const controller = HeapAnimationController
        .getController(currentArr, useDispatch())


    return (
        <>
            <HeapControlsPanel controller={controller}/>
            <div className="container mx-auto max-w-7xl px-0 py-0 mt-64">
                <HeapArray items={currentArr} actions={currentActions} speed={controller.speed}/>
            </div>
            <div className="container mx-auto max-w-7xl px-0 py-0">
                <BinaryTree root={root} level={0} height={calculateHeight(root)} speed={controller.speed}
                            actions={currentActions}/>
            </div>
            <PlayerControlsPanel controller={controller}/>
            <div className="flex justify-end mr-5">
                <div className=" w-fit">
                    {/*//TODO:Re-align psuedocode from far right*/}
                    <PseudoCode line={currentLine} code={HeapsortPseudoCode[currentAlg]}/>
                </div>
            </div>
        </>
    )
}

export default Heap
