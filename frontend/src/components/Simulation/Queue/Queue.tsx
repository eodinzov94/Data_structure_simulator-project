import styles from "./Queue.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Position } from "../../../pages/Animations/DataStructure/QueuePage";
import { Item } from "../ControlsPanels/SqControlsPanel";
import QueuePointer from "./QueuePointer";

interface Props {
  items: Item[]; //data of stack
  children?: JSX.Element | JSX.Element[];
  headPosition: Position;
  tailPosition: number;
}

const Queue = (props: Props) => {
  return (
    <div className={`basis-9/12 ${styles.example}`}>
      {/* Head & Aroow animation */}
      {props.items.length > 0 && (
        <QueuePointer
          className="pb-2"
          arrowStyle={styles.topArrow}
          textStyle={styles.topText}
          name={"Head"}
          xPosition={props.headPosition.curr}
          upsideDown={true}
        />
      )}

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

      {props.items.length > 0 && (
        <QueuePointer
          className="pt-4 ml-20"
          arrowStyle={styles.bottomArrow}
          textStyle={styles.bottomText}
          name={"Tail"}
          xPosition={props.tailPosition}
          upsideDown={false}
        />
      )}
    </div>
  );
};

export default Queue;
