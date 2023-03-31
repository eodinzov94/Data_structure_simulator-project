import styles from "../../Sorts/QuickSort/QuickSort.module.css";
import {AnimatePresence, motion} from "framer-motion";
import ArrayItem from "./ArrayItem";
import {ActionType, Events} from "../../BinaryTree/Helpers/MapActionToStyles";
import React from "react";
import {ArrayItemObj} from "../../BinaryTree/ClassObjects/ArrayItemObj";

interface Props {
    items: number[]; //data of stack
    actions: Events;
    speed:  React.MutableRefObject<number>;
}

const HeapArray = (props: Props) => {
        const {items, actions,speed} = props;
        const arr = ArrayItemObj.generateArrayObjects(items, speed);
        ArrayItemObj.setActions(arr, actions)
        return (
            <div className={`basis-9/12 ${styles.example}`}>
                <motion.ul className={styles.s_ul}>
                    <AnimatePresence>
                        {arr.map( item =>
                            <ArrayItem arrayItemObj = {item} key={item.id}/>
                        )}
                    </AnimatePresence>
                </motion.ul>
            </div>
        );
    }
;

export default HeapArray;
