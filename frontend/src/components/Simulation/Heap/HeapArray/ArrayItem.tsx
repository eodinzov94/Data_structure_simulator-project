import React from 'react';
import styles from "../HeapArray/HeapArray.module.css";
import {motion} from "framer-motion";
import {getHeapArrayAnimationsAndStyles} from "../../BinaryTree/Helpers/Functions";
import {ArrayItemObj} from "../../BinaryTree/ClassObjects/ArrayItemObj";

interface Props {
    arrayItemObj: ArrayItemObj
}

const ArrayItem = (props: Props) => {
    const {value, id, speed, action, swapIndex} = props.arrayItemObj;
    const {exit, style, initial, animate} = getHeapArrayAnimationsAndStyles(action, id, swapIndex);


    return (
        <motion.li
            className={styles.s_li}
            layout
            transition={{
                layout: {duration: 0.250*speed, ease: 'easeIn'},
                duration: 0.250*speed,
            }}
            initial={initial}
            animate={animate}
            style={style}
            exit={exit}
            key={`${value}-${id}`}
        >
            {value === -Infinity ? '−∞' : value}
        </motion.li>
    );
};

export default ArrayItem;