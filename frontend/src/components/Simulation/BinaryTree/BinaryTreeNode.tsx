import { motion, AnimatePresence } from 'framer-motion'
import React, { FC } from 'react'
import './BinaryTree.css'


interface BinaryTreeNodeProps {
  position: {
    top: number,
    left: number
  }
  zoomPercentage: number
  speed: number
  value: number
  style: React.CSSProperties
}

const BinaryTreeNode: FC<BinaryTreeNodeProps> = ({ position, speed, zoomPercentage, value, style }) => {
  const { top, left } = position
  return (
      <motion.li
        className='node'
        style={{
          ...style,
          top: top,
          left: left,
          scale: zoomPercentage,
        }}
        transition={{
          layout: { duration: 0.5},
        }}
        initial={{ backgroundColor: 'white' ,opacity: 0}}
        animate={{ backgroundColor: 'white' ,opacity: 1 ,}}
        exit={{ backgroundColor: 'black',x:-20,y:-50, transition: {
            duration: 1.5,
          },opacity: 0.2}}
        key={`${top},${left},${value}`}
      >
        {value}
      </motion.li>
      )
}

export default BinaryTreeNode