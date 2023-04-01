import React from 'react'
import './HeapArray.css'
import { AnimatePresence, motion } from 'framer-motion'
import { getHeapArrayAnimationsAndStyles } from '../../BinaryTree/Helpers/Functions'
import { ArrayItemObj } from '../../../../ClassObjects/ArrayItemObj'

interface Props {
  arrayItemObj: ArrayItemObj
}

const ArrayItem = (props: Props) => {
  const { value, id, speed, action, swapIndex } = props.arrayItemObj
  const { style, initial, animate } = getHeapArrayAnimationsAndStyles(action, id, swapIndex)

  return (
    <AnimatePresence>
      <motion.li
        className='s_li'
        layout
        transition={{
          layout: { duration: 0.250 * speed, ease: 'easeIn' },
          duration: 0.250 * speed,
        }}
        initial={initial}
        animate={animate}
        style={style}
        exit={{ opacity: 0 }}
        key={`${value}-${id}`}
      >
        {value === -Infinity ? '−∞' : value}
      </motion.li>
    </AnimatePresence>
  )
}

export default ArrayItem