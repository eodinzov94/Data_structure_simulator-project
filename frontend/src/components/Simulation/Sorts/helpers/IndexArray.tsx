import { AnimatePresence, motion } from 'framer-motion';
import styles from "./IndexArray.module.css";

interface Props{
    size:number;
    i:number;
    j?:number;
}

export const IndexArray = (props:Props) => {
    return (
        <div className={`basis-9/12 ${styles.example}`}>
          {/*Data of stack animation*/}
          <motion.ul className={styles.s_ul} >
            <AnimatePresence mode={"sync"}>
              {/* map each elment from the stack data to motion.il /*/}
              {[...Array(props.size)].map((elem:number,index) => (
                <motion.li
                  className={styles.s_li}
                  layout
                  transition={{
                    layout: { duration: 1},
                  }}

                  key={index}
                >
                  {
                    props.j?
                    index===props.i+1 && props.i === props.j ? "i,j": (index === props.i+1 ? 'i' :  (index ===props.j+1 ? 'j':''))
                    : index===props.i+1? 'i':''
                  } {/* text inside the box */}
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      );
}
