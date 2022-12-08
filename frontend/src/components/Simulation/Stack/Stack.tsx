import styles from "./Stack.module.css";
import { AnimatePresence, motion } from "framer-motion";
import arrowSvg from "../../../assets/undraw_arrow.svg";

//Animation of Stack

export interface StackItem {
  value: string;
  key: number;
}

interface Props {
  items: StackItem[]; //data of stack
  children?: JSX.Element | JSX.Element[];
}

export default function Stack(props: Props) {
  return (
    <div className={`flex basis-6/12 w-full px-20 ml-56 ${styles.example}`}>

      {/* Top & Aroow animation */}
        <AnimatePresence mode={"sync"}>
          <motion.div
            className="flex-row "
            initial={{ scale: 0.8, x: -50, opacity: 0 }}
            animate={
              //display only if there is a top elment 
              props.items.length > 0 
                ? {
                    scale: 1,
                    x: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 15,
                    },
                  }
                : {}
            }
            transition={{
              delay: 1.5,
              type: "spring",
              stiffness: 20,
            }}
          >
            <img
              src={arrowSvg}
              className={styles.topArrow}
              alt="My Happy SVG"
            />
            <svg className={styles.topText} height="32">
              <text x="0" y="15" fill="black">
                Top
              </text>
            </svg>
          </motion.div>
        </AnimatePresence>
      

      {/*Data of stack animation*/}
      <ul className={styles.s_ul}>
        <AnimatePresence mode={"sync"}>
          {/* map each elment from the stack data to motion.il /*/}
          {props.items.map((elem: StackItem) => (
            <motion.li
              className={styles.s_li}
              initial={{ scale: 0.8, y: -50, opacity: 0.5 }}
              layout
              animate={{ 
                scale: 1,
                y: 0,
                opacity: 1,
                transition: { type: "spring", 
                              stiffness: 20},
              }}

              exit={{ //when the elment pops
                scale: 0.8,
                x: 200, //move to the rigth
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
      </ul>

    </div>
  );
}
