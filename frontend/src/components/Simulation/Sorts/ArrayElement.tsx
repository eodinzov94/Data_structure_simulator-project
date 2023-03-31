import styles from "./QuickSort/QuickSort.module.css";
import styles2 from "./IndexArray.module.css";
import { motion } from "framer-motion";

interface Props {
    name:string;
    value: number;
    color?:string;
    children?: JSX.Element | JSX.Element[];
}   

const ArrayElement = (props: Props) => {
  return (
          <motion.li
            className={styles.s_li}
            layout
            transition={{
              layout: { duration: 2, ease: "easeIn" },
            }}
            initial={{ scale: 0.8, x: 50, opacity: 0.5 }}
            animate={{
              backgroundColor: props.color? props.color: "#84cc16",
              scale: 1,
              x: 0,
              opacity: 1,
              transition: { duration: 0.5 }, //todo fix animations on bgcolor
            }}
            exit={{
              scale: 0.8,
              x: -100, //move to the rigth
              opacity: 0.2,
              transition: {
                delay: 1,
                duration: 1.5, //control the speed
              },
            }}
          >
            {props.value} {/* text inside the box */}
            
      <li className={styles2.s_li} style={{fontSize:14, color:"gray"}}>
      {props.name} {/* text inside the box */}
      </li>
          </motion.li>
        );
};

export default ArrayElement;