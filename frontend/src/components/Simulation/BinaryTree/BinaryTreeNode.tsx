import React, { FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './BinaryTree.css'
import { getAnimationsAndStyles } from './Helpers/Functions'
import { NodeObj } from '../../../ClassObjects/NodeObj'
import Branch from './Branch'

interface BinaryTreeNodeProps {
  nodeObj: NodeObj
}

const BinaryTreeNode: FC<BinaryTreeNodeProps> = ({ nodeObj }) => {
  const {initial,animate,style} = getAnimationsAndStyles(nodeObj.action, nodeObj.swapPosition,nodeObj.position)
  return (
    <>
      <AnimatePresence>
        <motion.span
          data-id={`${nodeObj.id},${nodeObj.position.x},${nodeObj.position.y}`}
          transition={{
            layout: { duration: 0.250*nodeObj.speed, ease: 'easeIn' },
            duration: 0.250*nodeObj.speed,
          }}
          layout={'position'}
          initial={initial}
          animate={animate}
          exit={{ opacity: 0 }}
          key={`${nodeObj.value}-${nodeObj.id}`}
          style={{
            ...style,
            top: nodeObj.position.y,
            left: nodeObj.position.x,
          }}
          className='node'
        >
          {nodeObj.value === -Infinity ? '−∞' : nodeObj.value}
        </motion.span>
      </AnimatePresence>
      {nodeObj.branch && <Branch branch={nodeObj.branch }
       key={`${nodeObj.branch.x1}-${nodeObj.branch.x2}-${nodeObj.branch.y1}-${nodeObj.branch.y1}`} />}
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