import React from "react";
import "./HeapArray.css";
import { motion } from "framer-motion";
import { getHeapArrayAnimationsAndStyles } from "../../BinaryTree/Helpers/Functions";
import { ArrayItemObj } from "../../../../ClassObjects/ArrayItemObj";

interface Props {
  arrayItemObj: ArrayItemObj;
}

const ArrayItem = (props: Props) => {
  const { value, id, speed, action, swapIndex, ghosted } = props.arrayItemObj;
  const { style, initial, animate } = getHeapArrayAnimationsAndStyles(
    action,
    id,
    swapIndex
  );
  return (
      <motion.span
        className="s_li"
        layout
        transition={{
          layout: { duration: 0.4 * speed, ease: "easeIn" },
          duration: 0.4 * speed,
        }}
        initial={initial}
        animate={animate}
        style={ghosted ? { ...style, background: "gray" } : style}
        exit={{ opacity: 0 }}
        key={`${id}-${value}`}
      >
        {value === -Infinity ? "−∞" : value}
      </motion.span>
  );
};

export default ArrayItem