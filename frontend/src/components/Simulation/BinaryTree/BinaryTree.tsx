import { TreeNode } from './BinaryTreeTypes'
import BinaryTreeNode from './BinaryTreeNode'
import React, { FC, useEffect, useState } from 'react'
import { Events } from './Helpers/MapActionToStyles'
import { NodeObj } from './ClassObjects/NodeObj'

interface BTProps {
  root: TreeNode
  level: number
  speed:  React.MutableRefObject<number>
  height: number
  actions: Events | null
}

const BinaryTree: FC<BTProps> = (props) => {
  const {speed, level, root, height, actions } = props
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
  const treeObjects = NodeObj.generateTreeObjects(viewportWidth,height,speed,root,level)
  NodeObj.setActions(treeObjects,actions)
  return (
    <div>
      {treeObjects.map(nodeObj=><BinaryTreeNode nodeObj={nodeObj} key={nodeObj.id}/>)}
    </div>

  )
}
export default BinaryTree