import React, { FC } from 'react'
import './BinaryTree.css'
interface BranchProps {
  pos: {
    x1: number
    y1: number
    x2: number
    y2: number
  }
  zoomPercentage: number
}

const baseSize = 15
const Branch: FC<BranchProps> = ({ pos,zoomPercentage}) => {
  let { x1, x2, y1, y2, } = pos
  x1 = x1 + baseSize * zoomPercentage
  x2 = x2 + baseSize * zoomPercentage
  y1 = y1 + baseSize * zoomPercentage
  y2 = y2 + baseSize * zoomPercentage
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;
  const length = Math.sqrt(xDistance ** 2 + yDistance ** 2);
  const angle = (Math.atan2(yDistance, xDistance) * 180 / Math.PI );
  const style = {
    top: y1 + 'px',
    left: x1 + 'px',
    width: length + 'px',
    transform: `rotate(${angle}deg)`,
    scale: zoomPercentage,
  }
  return (<div className='branch' style={style} />)
}

export default Branch

