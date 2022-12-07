import styles from "./Stack.module.css";
import { useState, useRef, Key } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { removeItem } from "./array";
import arrowSvg from "../../../assets/undraw_arrow.svg";

interface Props{
    items:string[];
    children?: JSX.Element | JSX.Element[];
}

export default function Stack(props:Props) {

  return (
    <div className={`basis-6/12 ${styles.example}`}>
      <img src={arrowSvg} className={styles.headArrow} alt="My Happy SVG" />
      <svg className={styles.headText} height="32">
        <text x="0" y="15" fill="black">
          Head
        </text>
      </svg>
    <>
      <ul className={styles.s_ul}>
        <AnimatePresence mode={"sync"}>
          {props.items.map((elem: string) => (
              <motion.li
              className={styles.s_li}
              layout
              // initial={{ scale: 0.8, opacity: 0 }}
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
                        duration: 2,
                    },
                }}
                key={elem}
                >
              {elem}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
    </div>
  );
}

// onClick={() => {
//   const newItems = [...items];
//   removeItem(newItems, id);
//   setItems(newItems);
// }}
{/* <div className={styles.controls}>
<label className="enable">
  <code>popLayout</code>
  <input
    type="checkbox"
    checked={popLayout}
    onChange={(e) => setPopLayout(e.currentTarget.checked)}
  />
</label>
<motion.button
  whileTap={{ scale: 0.95 }}
  onClick={() => {
    count.current++;
    setItems([count.current, ...items]);
  }}
>
  Push
</motion.button>
<br></br>
<motion.button
  whileTap={{ scale: 0.95 }}
  whileHover={{ scale: 1.05 }}
  onClick={() => {
    count.current--;
    const newItems = [...items];
    removeItem(newItems);
    setItems(newItems);
  }}
>
  Pop
</motion.button>
</div> */}