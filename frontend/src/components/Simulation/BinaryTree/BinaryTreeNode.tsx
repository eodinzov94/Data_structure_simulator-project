import { motion } from 'framer-motion'
import React, { FC } from 'react'
import './BinaryTree.css'





interface BinaryTreeNodeProps{
  position: {
    top: number,
    left: number
  }
  zoomPercentage: number
  speed: number
  value: number
  style: React.CSSProperties
}

const BinaryTreeNode:FC<BinaryTreeNodeProps> = ({position,speed,zoomPercentage,value,style}) => {
  const { top, left } = position
  return (
    <motion.div
      className="node"
      style={{
        ...style,
        top: top,
        left: left,
        scale: zoomPercentage
      }}

    >
      {value}
    </motion.div>
  )
}

export default BinaryTreeNode