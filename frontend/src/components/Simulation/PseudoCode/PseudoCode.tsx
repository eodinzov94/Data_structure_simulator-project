import { motion } from "framer-motion";
import React from "react";

interface Props {
  line: number;
  code: PseudoItem[];
  children?: JSX.Element | JSX.Element[];
}

export interface PseudoItem {
  text: string;
  tabAmount: number;
}

export const PseudoCode = (props: Props) => {
  const arr: PseudoItem[] = [
    { text: "Quicksort (𝐴, 𝑝, 𝑟 ):", tabAmount: 0 },
    { text: "if (𝑝 < 𝑟):", tabAmount: 1 },
    { text: "𝑞 = partition (𝐴, 𝑝, 𝑟 )", tabAmount: 2 },
    { text: "Quicksort (𝐴, 𝑝, 𝑞 − 1)", tabAmount: 2 },
    { text: "Quicksort (𝐴, 𝑞 + 1, 𝑟 )", tabAmount: 2 },
    { text: "", tabAmount: 1 },
    { text: "", tabAmount: 1 },
    { text: "Partition(𝐴, 𝑝, 𝑟 ):", tabAmount: 0 },
    { text: "𝑖 = 𝑝 − 1", tabAmount: 1 },
    { text: "for (𝑗 = 𝑝 to 𝑟 − 1)", tabAmount: 1 },
    { text: "if (𝐴[𝑗] ≤ 𝐴[𝑟]):", tabAmount: 2 },
    { text: "𝑖 = 𝑖 + 1", tabAmount: 3 },
    { text: "exchange 𝐴[𝑖] with 𝐴[ 𝑗]", tabAmount: 3 },
    { text: "exchange 𝐴[𝑖 + 1] with 𝐴[𝑟]", tabAmount: 1 },
    { text: "return 𝑖 + 1", tabAmount: 1 },
  ];

  return (
    <motion.div className="basis-3/12" style={{ textAlign: "left" }}>
      <motion.ul>
        {props.code.map((l, index) => (
          <motion.li
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{
              backgroundColor:
                index === props.line ? "#bef264" : "rgba(0,0,0,0)",
            }}
            transition={{
              duration: 0.5,
            }}
          >
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
    </motion.div>
  );
};
