import { TreeNode } from './BinaryTreeTypes'
import BinaryTreeNode from './BinaryTreeNode'
import Branch from './Branch'
import { FC, useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'

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
};
const gapY = 50
const BinaryTree: FC<BTProps> = (props) => {
  const { zoomPercentage, speed, level, root, height } = props
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  let top, left, leftNodeX, leftNodeY, rightNodeX, rightNodeY
  top = 120
  left = viewportWidth / 2
  const tree = []
  const stack: StackItem[] = [{ node: root, left: left, top: top, level: level }]


  while (stack.length) {
    const item = stack.pop()
    if (!item) {
      break
    }
    const { node, left, top, level } = item
    const nodeElement = <BinaryTreeNode style={{ transition: `transform ${1}s` }}
                                        position={{ top: top, left: left }} zoomPercentage={1}
                                        value={node.value} speed={1} />
    const branchElements = []
    if (node.right) {
      rightNodeX = left + Math.min(viewportWidth, 1100) / (height * (2 ** (level - 0.5)))
      rightNodeY = top + gapY
      branchElements.push(<Branch zoomPercentage={1} pos={{ x1: left, x2: rightNodeX, y1: top, y2: rightNodeY }} />)
      stack.push({ node: node.right, left: rightNodeX, top: rightNodeY, level: level + 1 })
    }
    if (node.left) {
      leftNodeX = left - Math.min(viewportWidth, 1100) / (height * (2 ** (level - 0.5)))
      leftNodeY = top + gapY
      branchElements.push(<Branch zoomPercentage={1} pos={{ x1: left, x2: leftNodeX, y1: top, y2: leftNodeY }} />)
      stack.push({ node: node.left, left: leftNodeX, top: leftNodeY, level: level + 1 })
    }

    tree.push([nodeElement, ...branchElements])
  }
  const nodes = tree.flat()
  return (
    <>
      <AnimatePresence mode={'sync'}>
          {nodes}
      </AnimatePresence>
    </>
  )
}
export default BinaryTree