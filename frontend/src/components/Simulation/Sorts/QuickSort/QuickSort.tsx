import styles from "./QuickSort.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { sortItem } from "../types";

interface Props {
  items: sortItem[]; //data of stack
  children?: JSX.Element | JSX.Element[];
}

const QuickSort = (props: Props) => {
  return (
    <div className={`basis-9/12 ${styles.example}`}>
      {/*Data of stack animation*/}
      <motion.ul className={styles.s_ul} >
        <AnimatePresence mode={"sync"}>
          {/* map each elment from the stack data to motion.il /*/}
          {props.items.map((elem: sortItem) => (
            <motion.li
              className={styles.s_li}
              layout
              transition={{
                layout: { duration: 2, ease: "easeIn"},
              }}
              initial={{ scale: 0.8, x: 50, opacity: 0.5 }}
              animate={{
                backgroundColor: elem.isSelected ? "#ffffff" : "#84cc16",
                y: elem.isSelected ? 40 : 0,
                scale: 1,
                x: 0,
                opacity: 1,
                transition: { duration: 0.5 }, //todo fix animations on bgcolor
              }}
              exit={{
                //when the elment pops
                scale: 0.8,
                x: -100, //move to the rigth
                opacity: 0.2,
                transition: {
                  delay: 1,
                  duration: 1.5, //control the speed
                },
              }}
              key={elem.key}
            >
              {elem.value} {/* text inside the box */}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
};

export default QuickSort;
