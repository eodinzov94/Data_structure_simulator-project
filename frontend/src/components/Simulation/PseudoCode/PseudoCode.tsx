import { AnimatePresence, motion, useCycle } from "framer-motion";
import styles from "./PseudoCodeWrapper.module.css";
import bars from "../../../assets/bars-staggered.png";
import cross from "../../../assets/cross.png";
import { PseudoProps } from "./pc-helpers";


export const PseudoCode = (props: PseudoProps) => {
  const [open, cycleOpen] = useCycle(true, false);
  return (
    <div
      className={
        open
          ? "basis-3/12 h-screen z-50 " + styles["div-side"]
          : "h-screen z-50 " + styles["div-side"]
      }
    >
      <div>
        <button className={styles["button-side"]} onClick={() => cycleOpen()}>
          {open ? <img src={cross} /> : <img src={bars} />}
        </button>
      </div>

      <AnimatePresence mode="sync">
        {open && (
          <motion.aside
            className={styles["aside-side"]}
            initial={{ width: 0 }}
            animate={{
              width: 300,
              borderWidth: "2px",
              borderRadius: "10px",
              borderColor: "#ecfccb",
            }}
            exit={{
              width: 0,
              transition: { delay: 0.3, duration: 0.3 },
            }}
          >
            <motion.ul
              className="px-2"
              style={{ textAlign: "left" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <span className={styles.headLineSide}>
                <u>Pseudo Code</u>
              </span>

              {props.code.map((l, index) => (
                <motion.li
                  key={index}
                  initial={{ backgroundColor: "#ecfccb" }}
                  animate={{
                    backgroundColor:
                      index === props.line ?  "#a3e635" : "#ecfccb",
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  exit={{ transition: { duration: 0.1 } }}
                >
                  <span>{index}.&emsp;</span>
                  {
                    //this section responsable for the tabs before each line
                    [...Array(l.tabAmount)].map((x, i) => (
                      <span key={i}>&emsp;</span>
                    ))
                  }
                  <span>{l.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
