import styles from "../../Sorts/QuickSort/QuickSort.module.css";
import {AnimatePresence, motion} from "framer-motion";
import ArrayItem from "./ArrayItem";
import {ActionType, Events} from "../../BinaryTree/Helpers/MapActionToStyles";
import React from "react";

interface Props {
    items: number[]; //data of stack
    actions: Events;
}


function itemsToArray(items: number[]) {
    return items.map((value, index) =>
        <ArrayItem value={value} id={index} action={ActionType.NONE}/>
    )
}

const HeapArray = (props: Props) => {
        const {items, actions} = props;
        const arr = itemsToArray(items);
        if (actions) {
            try {
                for (let action of actions) {
                    if (action.action === ActionType.SWAP) {

                        const itemProps = {...arr[action.item].props};
                        const item2Props = {...arr[action.item2!].props};
                        itemProps.action = ActionType.SWAP;
                        itemProps.nodeInteractionIndex = item2Props.id;
                        item2Props.action = ActionType.SWAP;
                        item2Props.nodeInteractionIndex = itemProps.id;
                        arr[action.item] = {...arr[action.item], props: itemProps};
                        arr[action.item2!] = {...arr[action.item2!], props: item2Props};
                    } else {
                        const itemProps = {...arr[action.item].props};
                        itemProps.action = action.action;
                        arr[action.item] = {...arr[action.item], props: itemProps};
                    }
                }
            } catch (e) {
                console.log(e);
            }

        }
        return (
            <div className={`basis-9/12 ${styles.example}`}>
                <motion.ul className={styles.s_ul}>
                    <AnimatePresence>
                        {arr}
                    </AnimatePresence>
                </motion.ul>
            </div>
        );
    }
;

export default HeapArray;
