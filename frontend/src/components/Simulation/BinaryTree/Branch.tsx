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

