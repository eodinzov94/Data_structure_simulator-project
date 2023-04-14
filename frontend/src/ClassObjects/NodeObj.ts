import { BranchObj } from "./BranchObj";
import {
  ActionType,
  Events,
  NodeRole,
} from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import { TreeNode } from "../components/Simulation/BinaryTree/BinaryTreeTypes";

export class NodeObj {
  static availableSpace = 600;
  static gapY = 65;
  position: { x: number; y: number };
  speed: number;
  id: number;
  value: number;
  branch: BranchObj | null;
  action: ActionType;
  parent: NodeObj | null;
  swapPosition: { x: number; y: number } | null;
  level: number;
  height: number;
  viewportWidth: number;
  type: "root" | "left" | "right";
  nodeRole?: string ;

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    viewportWidth: number,
    parent: NodeObj | null,
    level: number,
    height: number,
    type: "root" | "left" | "right"
  ) {
    this.position = position;
    this.speed = speed;
    this.id = id;
    this.value = value;
    this.action = ActionType.NONE;
    this.swapPosition = null;
    this.branch = null;
    this.parent = parent;
    this.level = level;
    this.height = Math.max(5, height);
    this.viewportWidth = viewportWidth;
    this.type = type;
    this.calculatePosition();
    this.createBranch();
  }

  calculatePosition() {
    if (this.type === "root") {
      return;
    } else if (this.parent === null || this.parent.position === null) {
      throw new Error("parent is null or parent position is null");
    }
    if (this.type === "left") {
      this.position = {
        x:
          this.parent.position.x -
          Math.min(this.viewportWidth, NodeObj.availableSpace) /
            (this.parent.height * 2 ** (this.parent.level - 0.5)),
        y: this.parent.position.y + NodeObj.gapY,
      };
    } else {
      this.position = {
        x:
          this.parent.position.x +
          Math.min(this.viewportWidth, NodeObj.availableSpace) /
            (this.parent.height * 2 ** (this.parent.level - 0.5)),
        y: this.parent.position.y + NodeObj.gapY,
      };
    }
  }

  createBranch() {
    if (this.type === "root") {
      return;
    } else if (this.parent === null || this.parent.position === null) {
      throw new Error("parent is null or parent position is null");
    } else {
      this.branch = new BranchObj({
        x1: this.parent.position.x,
        x2: this.position.x,
        y1: this.parent.position.y,
        y2: this.position.y,
      });
    }
  }

  setAction(action: ActionType, swapPosition: { x: number; y: number } | null) {
    this.action = action;
    this.swapPosition = swapPosition;
  }

  setRole(role?: string) {
    this.nodeRole = role;
  }

  static generateTreeObjects(
    viewportWidth: number,
    height: number,
    speed: number,
    root: TreeNode | null,
    level: number,
    currentHeapSize?: number
  ): NodeObj[] {
    if (!root) {
      return [];
    }
    const treeObjects = [];
    const stack = [
      {
        node: root,
        nodeObj: new NodeObj(
          { x: viewportWidth / 2 - 17, y: 120 },
          speed,
          root.id,
          root.value,
          viewportWidth,
          null,
          level,
          height,
          "root"
        ),
      },
    ];

    while (stack.length) {
      const item = stack.pop();
      if (!item) {
        break;
      }
      const { node, nodeObj } = item;

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
            "right"
          ),
        });
      }
      if (node.left) {
        stack.push({
          node: node.left,
          nodeObj: new NodeObj(
            { x: 0, y: 0 }, //Will be calculated according to the parent
            speed,
            node.left.id,
            node.left.value,
            viewportWidth,
            nodeObj,
            nodeObj.level + 1,
            height,
            "left"
          ),
        });
      }
      treeObjects.push(nodeObj);
    }
    treeObjects.sort((a, b) => {
      return a.id - b.id;
    });
    if (currentHeapSize === undefined) {
      return treeObjects;
    }
    return treeObjects.slice(0, currentHeapSize);
  }

  static setActions(treeObjects: NodeObj[], actions: Events | null) {
    if (actions) {
      try {
        for (let action of actions) {
          if (action.action === ActionType.SWAP) {
            if (typeof action.item2 !== "number") {
              throw new Error("item2 is required for swap action");
            }
            treeObjects[action.item].setAction(
              ActionType.SWAP,
              treeObjects[action.item2].position
            );
            treeObjects[action.item2].setAction(
              ActionType.SWAP,
              treeObjects[action.item].position
            );
          } else {
            treeObjects[action.item].setAction(action.action, null);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  static setRoles(treeObjects: NodeObj[], roles: NodeRole[]) {
    if(!treeObjects.length) {
      return;
    }
    for (let role of roles) {
      treeObjects[role.id].setRole(role.role);
    }
  }
}
