import { TreeNode } from './BinaryTreeTypes'
import BinaryTreeNode from './BinaryTreeNode'
import Branch from './Branch'
import { FC, useEffect, useState } from 'react'
import { ActionType, Events } from './Helpers/MapActionToStyles'
import { binaryHeapToArray } from './Helpers/Functions'

interface BTProps {
  root: TreeNode
  position?: {
    top: number,
    left: number
  }
  level: number
  zoomPercentage: number
  speed: number
  height: number
  actions: Events | null
}

type StackItem = {
  node: TreeNode;
  left: number;
  top: number;
  level: number;
  branchPosition?: { x1: number, x2: number, y1: number, y2: number };
};
const gapY = 50
const BinaryTree: FC<BTProps> = (props) => {
  const { zoomPercentage, speed, level, root, height, actions, position } = props
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  let top, left, leftNodeX, leftNodeY, rightNodeX, rightNodeY
  top = 120
  left = viewportWidth / 2
  const tree = []
  const stack: StackItem[] = [{ node: root, left: left, top: top, level: level }]

//TODO: document this shit - Ron.
  while (stack.length) {
    const item = stack.pop()
    if (!item) {
      break
    }
    const { node, left, top, level, branchPosition } = item
    let nodeElement
    if (branchPosition) {
      nodeElement =
        <BinaryTreeNode
          position={{ top: Math.round(top), left: Math.round(left) }} zoomPercentage={1}
          id={node.id}
          value={node.value} speed={1}
          action={ActionType.NONE}
        >
          <Branch zoomPercentage={1} pos={branchPosition} key={`${node.value}-${node.id}-${branchPosition.x1}`}/>
        </BinaryTreeNode>
    } else {
      nodeElement = <BinaryTreeNode
        position={{ top: Math.round(top), left: Math.round(left) }} zoomPercentage={1}
        id={node.id}
        action={ActionType.NONE}
        value={node.value} speed={1} />
    }
    if (node.right) {
      rightNodeX = left + Math.min(viewportWidth, 1100) / (height * (2 ** (level - 0.5)))
      rightNodeY = top + gapY
      stack.push({
        node: node.right,
        left: Math.round(rightNodeX),
        top: Math.round(rightNodeY),
        level: level + 1,
        branchPosition: { x1: left, x2: rightNodeX, y1: top, y2: rightNodeY },
      })
    }
    if (node.left) {
      leftNodeX = left - Math.min(viewportWidth, 1100) / (height * (2 ** (level - 0.5)))
      leftNodeY = top + gapY
      stack.push({
        node: node.left,
        left: Math.round(leftNodeX),
        top: Math.round(leftNodeY),
        level: level + 1,
        branchPosition: { x1: left, x2: leftNodeX, y1: top, y2: leftNodeY },
      })
    }
    tree.push(nodeElement)
  }
  tree.sort((a, b) => {
    return a.props.id - b.props.id
  })
  if (actions) {
    try{
      for(let action of actions){
        if(action.action === ActionType.SWAP){
          const itemProps: any = {...tree[action.item].props};
          const item2Props: any = {...tree[action.item2!].props};
          itemProps.action = ActionType.SWAP;
          itemProps.nodeInteractionPosition = item2Props.position;
          item2Props.action = ActionType.SWAP;
          item2Props.nodeInteractionPosition = itemProps.position;
          tree[action.item] = {...tree[action.item], props: itemProps};
          tree[action.item2!] = {...tree[action.item2!], props: item2Props};
        } else {
          const itemProps: any = {...tree[action.item].props};
          itemProps.action = action.action;
          tree[action.item] = {...tree[action.item], props: itemProps};
        }
      }
    } catch (e) {
      console.log(e);
    }

  }
  return (

    <div>
      {tree}
    </div>

  )
}
export default BinaryTree