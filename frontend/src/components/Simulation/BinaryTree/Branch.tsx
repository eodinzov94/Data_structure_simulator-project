import { motion } from "framer-motion";
import { FC } from 'react';
import { BranchObj } from "../../../ClassObjects/BranchObj";
import './BinaryTree.css';
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