import React, { FC } from 'react'
import './BinaryTree.css'
import { BranchObj } from "../../../ClassObjects/BranchObj";
import { motion } from "framer-motion";
interface BranchProps {
  branch:BranchObj
}

const Branch: FC<BranchProps> = ({branch}) => {
  return (<motion.span className='branch' exit={{opacity:0}} style={branch.getStyle()} />)
}
export default Branch


/* test
const Branch: FC<BranchProps> = ({branch}) => {
  return (<motion.span
      className='branch'
      exit={{opacity:0}}
      style={{...branch.getStyle(),background: "linear-gradient(to right, black, red)",
        backgroundSize: "200% 100%",
        backgroundPosition: "100% 0%",}}
      animate={{ backgroundPosition: "-100% 0%" }}
      transition={{
        duration: 1,
        ease: "linear",
      }}
     />)
}
* */