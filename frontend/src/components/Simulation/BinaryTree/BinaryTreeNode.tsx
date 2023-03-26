import React, { FC, ReactElement, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './BinaryTree.css'
import { ActionType } from './Helpers/MapActionToStyles'
import { getAnimationsAndStyles } from './Helpers/Functions'

interface BinaryTreeNodeProps {
  position: {
    top: number,
    left: number
  }
  zoomPercentage: number
  speed: number
  id: number
  value: number
  children?: ReactElement | ReactElement[];
  action: ActionType
  nodeInteractionPosition?: {
    top: number,
    left: number
  }
}

const BinaryTreeNode: FC<BinaryTreeNodeProps> = (props) => {
  const { position, speed, zoomPercentage, id, value, children, nodeInteractionPosition, action } = props
  const { top, left } = position
  const {initial,exit,animate,style} = getAnimationsAndStyles(action, nodeInteractionPosition,position)
  return (
    <>
      <AnimatePresence key={`${value}-${id}`}>
        <motion.span
          data-id={`${id},${top},${left}`}
          layout={'position'}
          transition={{
            layout: { duration: speed, ease: 'easeIn' },
            duration: speed,
          }}
          // initial={{ x: 0, y: 0, opacity: 0.5 }}
          // animate={{ opacity: 1, x: 0, y: 0 }}
          // exit={{ opacity: 0.5, x: 2750 }}
          initial={initial}
          animate={animate}
          exit={exit}
          key={`${value}-${id}`}
          style={{
            ...style,
            top: top,
            left: left,
            scale: zoomPercentage,
          }}
          className='node'
        >
          {value}
        </motion.span>
      </AnimatePresence>
      {children}
    </>
  )
}

export default BinaryTreeNode


// TODO:FOR DEBUGGING
//const prevPropsRef = useRef(props);
// useEffect(() => {
//     const changedProps = Object.entries(props).reduce((acc, [key, value]) => {
//         // @ts-ignore
//         if (prevPropsRef.current[key] !== value) {
//             // @ts-ignore
//             acc[key] = { from: prevPropsRef.current[key], to: value };
//         }
//         return acc;
//     }, {});
//
//     if (Object.keys(changedProps).length > 0) {
//         console.log('MyComponent re-rendered due to props change:', changedProps);
//     }
//
//     prevPropsRef.current = props;
// }, [props]);