import styles from "./Stack.module.css";
import { AnimatePresence, motion } from "framer-motion";
import arrowSvg from "../../../assets/undraw_arrow.svg";

export interface StackItem {
  value: string;
  key: number;
}
interface Props {
  items: StackItem[];
  children?: JSX.Element | JSX.Element[];
}

export default function Stack(props: Props) {
  return (
    <div className={`flex basis-6/12 w-full px-20 ml-56 ${styles.example}`}>
      {
        <AnimatePresence mode={"sync"}>
          <motion.div
            className="flex-row "
            initial={{ scale: 0.8, x: -50, opacity: 0 }}
            animate={
              props.items.length > 0
                ? {
                    scale: 1,
                    x:0,
                    opacity: 1,
                  }
                : {}
            }
            transition={{
              type: "spring",
              stiffness: 20,
            }}
          >
            <img
              src={arrowSvg}
              className={styles.headArrow}
              alt="My Happy SVG"
            />
            <svg className={styles.headText} height="32">
              <text x="0" y="15" fill="black">
                Head
              </text>
            </svg>
          </motion.div>
        </AnimatePresence>
      }
      <ul className={styles.s_ul}>
        <AnimatePresence mode={"sync"}>
          {props.items.map((elem: StackItem) => (
            <motion.li
              className={styles.s_li}
              layout
              initial={{ scale: 0.8, y: -50, opacity: 0.5 }}
              animate={{
                scale: 1,
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 20 },
              }}
              exit={{
                scale: 0.8,
                x: 200,
                opacity: 0.2,
                transition: {
                  duration: 1.5,
                },
              }}
              key={elem.key}
            >
              {elem.value}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
