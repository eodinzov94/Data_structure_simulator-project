import { AnimatePresence, motion } from 'framer-motion'
import ArrayItem from './ArrayItem'
import './HeapArray.css'
import { Events } from '../../BinaryTree/BinaryTreeTypes'
import React from 'react'
import { ArrayItemObj } from '../../../../ClassObjects/ArrayItemObj'

interface Props {
    items: number[]; //data of stack
    actions: Events;
    speed:  number;
}

const HeapArray = (props: Props) => {
        const {items, actions,speed} = props;
        const arr = ArrayItemObj.generateArrayObjects(items, speed);
        ArrayItemObj.setActions(arr, actions)
        return (

            <div className={`basis-9/12`}>
              <AnimatePresence>
              <motion.ul className='s_ul'>
                        {arr.map( item =>
                            <ArrayItem arrayItemObj = {item} key={`${item.id}-${item.value}`}/>
                        )}
                </motion.ul>
              </AnimatePresence>
            </div>
        );
    }
;

export default HeapArray;
