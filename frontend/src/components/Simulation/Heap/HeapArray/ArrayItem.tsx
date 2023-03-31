import React from 'react'
import styles from '../HeapArray/HeapArray.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { getHeapArrayAnimationsAndStyles } from '../../BinaryTree/Helpers/Functions'
import { ArrayItemObj } from '../../BinaryTree/ClassObjects/ArrayItemObj'

interface Props {
  arrayItemObj: ArrayItemObj
}

const ArrayItem = (props: Props) => {
  const { value, id, speed, action, swapIndex } = props.arrayItemObj
  const { style, initial, animate } = getHeapArrayAnimationsAndStyles(action, id, swapIndex)

  return (
    <AnimatePresence>
      <motion.li
        className={styles.s_li}
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