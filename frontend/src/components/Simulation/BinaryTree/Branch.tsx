import React, { FC } from 'react'
import './BinaryTree.css'
import { BranchObj } from "../../../ClassObjects/BranchObj";
import { motion } from "framer-motion";
interface BranchProps {
  branch:BranchObj
  isPassed:boolean
  speed:number
}

const Branch: FC<BranchProps> = ({branch,isPassed,speed}) => {
  return (<motion.span
      className='branch'
      exit={{opacity:0}}
      style={branch.getStyle(isPassed)}
      transition={branch.getAnimationStyle(speed,isPassed)[1]}
      animate={branch.getAnimationStyle(speed,isPassed)[0]}
  />)
}
export default Branch

//