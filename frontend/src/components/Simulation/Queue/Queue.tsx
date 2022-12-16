import styles from "./Queue.module.css";
import { AnimatePresence, motion, MotionValue } from "framer-motion";
import arrowSvg from "../../../assets/undraw_arrow.svg";
import { Position } from "../../../pages/QueuePage";
import { Item } from "../ControlsPanels/SqControlsPanel";




interface Props {
  items: Item[]; //data of stack
  children?: JSX.Element | JSX.Element[];
  headPosition: Position;
}

const Queue = (props: Props) => {
  return (
    <div className={`basis-9/12 ${styles.example}`}>
      {/* Top & Aroow animation */}
      <AnimatePresence mode={"sync"}>
        <motion.div
          layout
          key={props.headPosition.prev}
          className=" inline-block"
          initial={{x:props.headPosition.prev,}}
          animate={
            //display only if there is a top elment
            props.items.length > 0
              ? {
                    x:props.headPosition.curr,
                  transition:{duration:1.5}
                }
              : {}
          }
          transition={{duration:1.5}}

        >
          <img src={arrowSvg} className={styles.topArrow} alt="My Happy SVG" />
          <svg className={styles.topText} height="32">
            <text x="0" y="15" fill="black">
              Head
            </text>
          </svg>
        </motion.div>
      </AnimatePresence>

      {/*Data of stack animation*/}
      <ul className={styles.s_ul}>
        <AnimatePresence mode={"sync"}>
          {/* map each elment from the stack data to motion.il /*/}
          {props.items.map((elem: Item) => (
            <motion.li
              className={styles.s_li}
              initial={{ scale: 0.8, x: 50, opacity: 0.5 }}
              layout
              animate={{
                scale: 1,
                x: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 20 },
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
      </ul>
    </div>
  );
};

export default Queue;
