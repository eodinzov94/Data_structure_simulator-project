import React from 'react';
import styles from "../HeapArray/HeapArray.module.css";
import {motion} from "framer-motion";
import {getHeapArrayAnimationsAndStyles} from "../../BinaryTree/Helpers/Functions";
import {ActionType} from "../../BinaryTree/Helpers/MapActionToStyles";

interface Props {
    value: number;
    id: number
    action: ActionType;
    nodeInteractionIndex?: number;
    speed: number;
}

const ArrayItem = (props: Props) => {
    const {value, id, speed, action, nodeInteractionIndex} = props;
    const {exit, style, initial, animate} = getHeapArrayAnimationsAndStyles(action, id, nodeInteractionIndex);


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
            {value}
        </motion.li>
    );
};

export default ArrayItem;