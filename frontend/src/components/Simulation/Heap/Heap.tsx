import BinaryTree from '../BinaryTree/BinaryTree'
import {TreeNode} from '../BinaryTree/BinaryTreeTypes'
import {useEffect, useState} from 'react'
import arrayToBinaryTree from "../BinaryTree/Helpers/Functions";

function calculateHeight(root: TreeNode | undefined): number {
    if (!root) {
        return 0
    }
    return Math.max(calculateHeight(root.left), calculateHeight(root.right)) + 1
}

const Heap = () => {
    const treeNode2 = arrayToBinaryTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    const treeNode3 = arrayToBinaryTree([1, 16, 17, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    const [root, setRoot] = useState<TreeNode>(treeNode2!)

    useEffect(() => {
        // setRoot(treeNode2!)
        // setTimeout(() => {
        //     setRoot(treeNode3!)
        // }, 4000)
    }, [])
    return (
        <>
            <BinaryTree root={root} level={0} height={calculateHeight(root)} speed={1} zoomPercentage={1}/>
            <button onClick={() => setRoot(treeNode2!)}>
                Click me 2!
            </button>
            <button onClick={() => setRoot(treeNode3!)}>
                Click me 3!
            </button>
        </>
    )
}

export default Heap
