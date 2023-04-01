import { BranchObj } from './BranchObj'
import { ActionType, Events } from '../Helpers/MapActionToStyles'
import { TreeNode } from '../BinaryTreeTypes'

export class NodeObj {
  static availableSpace = 600
  static gapY = 50
  position: { x: number, y: number }
  speed: number
  id: number
  value: number
  branch: BranchObj | null
  action: ActionType
  parent: NodeObj | null
  swapPosition: { x: number, y: number } | null
  level: number
  height: number
  viewportWidth: number
  type: 'root' | 'left' | 'right'

  constructor(position: { x: number, y: number },
              speed: number,
              id: number,
              value: number,
              viewportWidth: number,
              parent: NodeObj | null,
              level: number,
              height: number,
              type: 'root' | 'left' | 'right',
  ) {
    this.position = position
    this.speed = speed
    this.id = id
    this.value = value
    this.action = ActionType.NONE
    this.swapPosition = null
    this.branch = null
    this.parent = parent
    this.level = level
    this.height = Math.max(5,height)
    this.viewportWidth = viewportWidth
    this.type = type
    this.calculatePosition()
    this.createBranch()
  }

  calculatePosition() {
    if (this.type === 'root') {
      return
    } else if (this.parent === null || this.parent.position === null) {
      throw new Error('parent is null or parent position is null')
    }
    if (this.type === 'left') {
      this.position = {
        x: this.parent.position.x - Math.min(this.viewportWidth, NodeObj.availableSpace) / (this.parent.height * (2 ** (this.parent.level - 0.5))),
        y: this.parent.position.y + NodeObj.gapY,
      }
    } else {
      this.position = {
        x: this.parent.position.x + Math.min(this.viewportWidth, NodeObj.availableSpace) / (this.parent.height * (2 ** (this.parent.level - 0.5))),
        y: this.parent.position.y + NodeObj.gapY,
      }
    }
  }

  createBranch() {
    if (this.type === 'root') {
      return
    } else if (this.parent === null || this.parent.position === null) {
      throw new Error('parent is null or parent position is null')
    }
    else {
      this.branch = new BranchObj({
        x1: this.parent.position.x,
        x2: this.position.x,
        y1: this.parent.position.y,
        y2: this.position.y,
      })
    }
  }

  setAction(action: ActionType, swapPosition: { x: number, y: number } | null) {
    this.action = action
    this.swapPosition = swapPosition
  }


  static generateTreeObjects(viewportWidth: number, height: number, speed: number, root: TreeNode, level: number): NodeObj[] {
    const treeObjects = []
    const stack = [{
      node: root,
      nodeObj: new NodeObj(
        { x: viewportWidth / 2 -17, y: 120 },
        speed,
        root.id,
        root.value,
        viewportWidth,
        null,
        level,
        height,
        'root',
      ),
    }]

    while (stack.length) {
      const item = stack.pop()
      if (!item) {
        break
      }
      const { node, nodeObj } = item

      if (node.right) {
        stack.push({
          node: node.right,
          nodeObj: new NodeObj(
            { x: 0, y: 0 }, //Will be calculated according to the parent,
            speed,
            node.right.id,
            node.right.value,
            viewportWidth,
            nodeObj,
            nodeObj.level + 1,
            height,
            'right',
          ),
        })
      }
      if (node.left) {
        stack.push({
          node: node.left,
          nodeObj: new NodeObj(
            { x: 0, y: 0 },//Will be calculated according to the parent
            speed,
            node.left.id,
            node.left.value,
            viewportWidth,
            nodeObj,
            nodeObj.level + 1,
            height,
            'left',
          ),
        })
      }
      treeObjects.push(nodeObj)
    }
    treeObjects.sort((a, b) => {
      return a.id - b.id
    })

    return treeObjects
  }

  static setActions(treeObjects: NodeObj[], actions: Events | null) {
    if (actions) {
      try {
        for (let action of actions) {
          if (action.action === ActionType.SWAP) {
            if (!action.item2) {
              throw new Error('item2 is required for swap action')
            }
            treeObjects[action.item].setAction(ActionType.SWAP, treeObjects[action.item2].position)
            treeObjects[action.item2].setAction(ActionType.SWAP, treeObjects[action.item].position)
          } else {
            treeObjects[action.item].setAction(action.action, null)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

}
