import styles from "./QuickSort/QuickSort.module.css";
import styles2 from "./IndexArray.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { sortItem } from "./types";
import ArrayElement from "./ArrayElement";

interface Props {
  items: sortItem[]; //data
  children?: JSX.Element | JSX.Element[];
}

const SortArray = (props: Props) => {
  return (
    <div className={`basis-9/12 ${styles.example}`}>
      {/*Data of animation*/}
      <motion.ul className={styles.s_ul}>
        <AnimatePresence mode={"sync"}>
          {/* map each elment from the data to motion.il /*/}
          {props.items.map((elem: sortItem,index) => (
            <ArrayElement name={index.toString()} value={elem.value} color={elem.color}/>
            ))}
        </AnimatePresence>
      </motion.ul>
      
    </div>
  );
};

export default SortArray;