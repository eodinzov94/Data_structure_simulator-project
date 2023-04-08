import React, { FC } from 'react'
import './BinaryTree.css'
import { BranchObj } from '../../../ClassObjects/BranchObj'
interface BranchProps {
  branch:BranchObj
}

const Branch: FC<BranchProps> = ({branch}) => {
  return (<span className='branch' style={branch.getStyle()} />)
}
export default Branch

