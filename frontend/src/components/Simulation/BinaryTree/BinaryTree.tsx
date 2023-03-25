import {TreeNode} from './BinaryTreeTypes'
import BinaryTreeNode from './BinaryTreeNode'
import Branch from './Branch'
import {FC, useState} from 'react'
import {AnimatePresence} from "framer-motion";

interface BTProps {
    root: TreeNode
    position?: {
        top: number,
        left: number
    }
    level: number
    zoomPercentage: number
    speed: number
    height: number
}

type StackItem = {
    node: TreeNode;
    left: number;
    top: number;
    level: number;
    branchPosition?: { x1: number, x2: number, y1: number, y2: number };
};
const gapY = 50
const BinaryTree: FC<BTProps> = (props) => {
    const {zoomPercentage, speed, level, root, height} = props
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
    // useEffect(() => {
    //     function handleResize() {
    //         setViewportWidth(window.innerWidth)
    //     }
    //
    //     window.addEventListener('resize', handleResize)
    //
    //     // Clean up the event listener on unmount
    //     return () => {
    //         window.removeEventListener('resize', handleResize)
    //     }
    // }, [])
    let top, left, leftNodeX, leftNodeY, rightNodeX, rightNodeY
    top = 120
    left = viewportWidth / 2
    const tree = []
    const stack: StackItem[] = [{node: root, left: left, top: top, level: level}]

//TODO: document this shit - Ron.
    while (stack.length) {
        const item = stack.pop()
        if (!item) {
            break
        }
        const {node, left, top, level, branchPosition} = item
        let nodeElement
        if (branchPosition) {
            nodeElement =
                <BinaryTreeNode style={{transition: `transform ${1}s`}}
                                position={{top: Math.round(top), left: Math.round(left)}} zoomPercentage={1}
                                id={node.id}
                                value={node.value} speed={1}>
                    <Branch zoomPercentage={1} pos={branchPosition}/>
                </BinaryTreeNode>
        } else {
            nodeElement = <BinaryTreeNode style={{transition: `transform ${1}s`}}
                                          position={{top: Math.round(top), left: Math.round(left)}} zoomPercentage={1}
                                          id={node.id}
                                          value={node.value} speed={1}/>
        }
        if (node.right) {
            rightNodeX = left + Math.min(viewportWidth, 1100) / (height * (2 ** (level - 0.5)))
            rightNodeY = top + gapY
            stack.push({
                node: node.right,
                left: Math.round(rightNodeX),
                top: Math.round(rightNodeY),
                level: level + 1,
                branchPosition: {x1: left, x2: rightNodeX, y1: top, y2: rightNodeY}
            })
        }
        if (node.left) {
            leftNodeX = left - Math.min(viewportWidth, 1100) / (height * (2 ** (level - 0.5)))
            leftNodeY = top + gapY
            stack.push({
                node: node.left,
                left: Math.round(leftNodeX),
                top: Math.round(leftNodeY),
                level: level + 1,
                branchPosition: {x1: left, x2: leftNodeX, y1: top, y2: leftNodeY}
            })
        }
        tree.push(nodeElement)
    }
    tree.sort((a, b) => {
        return a.props.id - b.props.id
    })
    return (
        <AnimatePresence>
            {tree}
        </AnimatePresence>
    )
}
export default BinaryTree