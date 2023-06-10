import { AnimatePresence, motion, useCycle } from "framer-motion";
import styles from "./PseudoCodeWrapper.module.css";
import { PseudoProps } from "./pc-helpers";
import { SubjectImg } from "../../UI/SubjectImg";
import headlinePhoto from "../../../assets/Algorithms/PseudoCode.png";
import { Spin as Hamburger } from "hamburger-react";
import { useState } from "react";

export const PseudoCode = (props: PseudoProps) => {
  const [open, setOpen] = useState(true);
  // const [open, cycleOpen] = useCycle(true, false);
  return (
    <div className={"h-screen z-50 " + styles["div-side"]}>
      <div className={styles["button-div"]}>
        <Hamburger
          toggled={open}
          toggle={setOpen}
          direction="left"
          size={30}
          rounded
          duration={0.8}
        />
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <motion.aside
            className={styles["aside-side"]}
            initial={{ width: 0 }}
            animate={{
              width: props.width ? props.width : 280,
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
              <SubjectImg
                name={"Pseudo code"}
                src={headlinePhoto}
                width="180px"
              />
              <br />

              {props.code.map((l, index) => (
                <motion.li
                  key={index}
                  initial={{ backgroundColor: "#ecfccb" }}
                  animate={{
                    backgroundColor:
                      index === props.line ? "#a3e635" : "#ecfccb",
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  exit={{ transition: { duration: 0.1 } }}
                >
                  <span>{index}.&emsp;</span>
                  {
                    //this section responsible for the tabs before each line
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
