import { AnimatePresence, motion } from "framer-motion";
import styles from "./ValueArray.module.css";
import { sortItem } from "./types";

interface Props {
  data: sortItem[];
}

export const ValueArray = (props: Props) => {
  return (
    <div className={`basis-9/12 ${styles.example}`}>
      {/*Data of stack animation*/}
      <motion.ul className={styles.s_ul}>
        <AnimatePresence mode={"sync"}>
          {/* map each elment from the stack data to motion.il /*/}
          {props.data.map((elem: sortItem, index) => (
            <motion.li
              className={styles.s_li}
              layout
              transition={{
                layout: { duration: 2, ease: "easeIn" },
              }}
              initial={{
                y: 50,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 1, duration: 0.5 }, //todo fix animations on bgcolor
              }}
              exit={{
                y: 50,
                transition: {
                  duration: 1, //control the speed
                },
              }}
              key={elem.key}
            >
              {`{${elem.value}}`}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
};
