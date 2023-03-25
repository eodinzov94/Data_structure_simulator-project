import { TreeNode } from './BinaryTreeTypes'
import BinaryTreeNode from './BinaryTreeNode'
import Branch from './Branch'
import { FC, useEffect, useState } from 'react'

interface BTProps {
  root: TreeNode
  position?: {
    top: number,
    left: number
  }
  level: number
  zoomPercentage?: number
  speed?: number
  height: number
}

const gapY = 50
const BinaryTree: FC<BTProps> = ({ root, position ,level,height}) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let top, left, leftNodeX, leftNodeY, rightNodeX, rightNodeY
  if (!position) {
     top =120;
     left = viewportWidth / 2;
  } else {
    top = position.top
    left = position.left
  }
  const gapX  =  1200 / (height*(2**(level-0.5)))
  leftNodeY = top + gapY
  rightNodeY = top + gapY
  leftNodeX =  left  - gapX
  rightNodeX = left  + gapX
  return (
    <>
      <BinaryTreeNode style={{}} position={{ top, left }} zoomPercentage={1} speed={1} value={root.value} />
      {root.left &&
        <>
          <Branch zoomPercentage={1} pos={{ x1: left, x2: leftNodeX, y1: top, y2: leftNodeY }} />
          <BinaryTree root={root.left} position={{ top: leftNodeY, left: leftNodeX}} level={level + 1} height={height}/>
        </>
      }
      {root.right &&
        <>
          <Branch zoomPercentage={1} pos={{ x1: left, x2: rightNodeX, y1: top, y2: rightNodeY, }} />
          <BinaryTree root={root.right} position={{ top: rightNodeY, left: rightNodeX }} level={level + 1} height={height} />
        </>
      }

    </>
  )
}
export default BinaryTree