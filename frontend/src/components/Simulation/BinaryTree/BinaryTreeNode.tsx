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

const BinaryTreeNode: FC<BinaryTreeNodeProps> = ( props) => {
  const { position, zoomPercentage, speed, value, style } = props
  const { top, left } = position
  return (
      <motion.span
        layout
        className='node'
        style={{
          ...style,
          top: top,
          left: left,
          scale: zoomPercentage,
        }}
        initial={{ backgroundColor: 'black' ,opacity: 1 }}
        animate={{ backgroundColor: 'white' ,opacity: 1 , transition: { duration: 0.5 }}}
        // exit={{ backgroundColor: 'black',x:-20,y:-50, transition: {
        //     duration: 1.5,
        //   },opacity: 0.2}}
        //key={`${top},${left},${value}`}
        key={`${value}`}
      >
        {value}
      </motion.span>
      )
}

export default BinaryTreeNode