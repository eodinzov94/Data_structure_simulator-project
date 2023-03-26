import { motion } from "framer-motion";
import React from "react";

interface Props {
    line: number;
    children?: JSX.Element | JSX.Element[];
}
interface PseudoItem {
    text: string;
    tabAmount: number;
}

export const PseudoCode = (props: Props) => {
    //TODO: Complete

    // const {line, children, operations} = props;


    return (
        <motion.div className="basis-3/12" style={{ textAlign: "left" }}>
            Pseudo code:
            <motion.ul>
                {/*{arr.map((l, index) => (*/}
                {/*    <motion.li*/}
                {/*        initial={{ backgroundColor: "rgba(0,0,0,0)" }}*/}
                {/*        animate={{*/}
                {/*            backgroundColor:*/}
                {/*                index === props.line ? "#bef264" : "rgba(0,0,0,0)",*/}
                {/*        }}*/}
                {/*        transition={{*/}
                {/*            duration: 0.5,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {*/}
                {/*            //this section responsable for the tabs before each line*/}
                {/*            [...Array(l.tabAmount)].map((x, i) => (*/}
                {/*                <span key={i}>&emsp;</span>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*        <span>{l.text}</span>*/}
                {/*    </motion.li>*/}
                {/*))}*/}
            </motion.ul>
        </motion.div>
    );
};
