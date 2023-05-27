import {BranchObj} from "./BranchObj";
import {
    ActionType,
    Events,
    NodeRole,
} from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import {TreeNode} from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import {BSTreeNode} from "./BSTreeNode";

export class NodeObj {
    static availableSpace = 600;
    static gapY = 65;
    position: { x: number; y: number };
    speed: number;
    id: number;
    value: number;
    branch: BranchObj | null;
    action: ActionType;
    parent: NodeObj | undefined;
    swapPosition: { x: number; y: number } | null;
    level: number;
    height: number;
    viewportWidth: number;
    type: "root" | "left" | "right";
    nodeRole?: string;
    isBST: boolean;
    isVisited: boolean;
    isPassed: boolean;

    constructor(
        position: { x: number; y: number },
        speed: number,
        id: number,
        value: number,
        viewportWidth: number,
        parent: NodeObj | undefined,
        level: number,
        height: number,
        type: "root" | "left" | "right",
        isBST?: boolean
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
        this.isBST = !!isBST;
        this.calculatePosition();
        this.createBranch();
        this.isVisited = false;
        this.isPassed = false;
    }

    getXGap() {
        if (this.isBST && this.parent) {
            return NodeObj.availableSpace / (this.parent.height * 2 ** (this.parent.level - 0.5)) * 2
        } else if (this.parent) {
            return (Math.min(this.viewportWidth, NodeObj.availableSpace) /
                (this.parent.height * 2 ** (this.parent.level - 0.5)))
        }
        return 0
    }

    calculatePosition() {
        if (this.type === "root") {
            return;
        } else if (this.parent === undefined || this.parent.position === undefined) {
            throw new Error("parent is null or parent position is null");
        }
        if (this.type === "left") {
            this.position = {
                x:
                    this.parent.position.x - this.getXGap(),
                y: this.parent.position.y + NodeObj.gapY,
            };
        } else {
            this.position = {
                x:
                    this.parent.position.x + this.getXGap(),
                y: this.parent.position.y + NodeObj.gapY,
            };
        }
    }

    createBranch() {
        if (this.type === "root") {
            return;
        } else if (this.parent === undefined || this.parent.position === undefined) {
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
        root: TreeNode | undefined | BSTreeNode,
        level: number,
        currentHeapSize?: number,
        isBST?: boolean
    ): NodeObj[] {
        if (!root) {
            return [];
        }
        const treeObjects = [];
        const stack = [
            {
                node: root,
                nodeObj: new NodeObj(
                    {x: viewportWidth / 2 - 120, y: 300},
                    speed,
                    root.id,
                    root.value,
                    viewportWidth,
                    undefined,
                    level,
                    height,
                    "root",
                    isBST
                ),
            },
        ];

        while (stack.length) {
            const item = stack.pop();
            if (!item) {
                break;
            }
            const {node, nodeObj} = item;

            if (node.right) {
                stack.push({
                    node: node.right,
                    nodeObj: new NodeObj(
                        {x: 0, y: 0}, //Will be calculated according to the parent,
                        speed,
                        node.right.id,
                        node.right.value,
                        viewportWidth,
                        nodeObj,
                        nodeObj.level + 1,
                        height,
                        "right",
                        isBST
                    ),
                });
            }
            if (node.left) {
                stack.push({
                    node: node.left,
                    nodeObj: new NodeObj(
                        {x: 0, y: 0}, //Will be calculated according to the parent
                        speed,
                        node.left.id,
                        node.left.value,
                        viewportWidth,
                        nodeObj,
                        nodeObj.level + 1,
                        height,
                        "left",
                        isBST
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

    static setActions(treeObjects: NodeObj[], actions: Events | null, isBSTree = false) {
        if (actions) {
            try {
                if (!isBSTree) {
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
                } else {
                    for (let action of actions) {
                        if (action.action === ActionType.SWAP) {
                            if (typeof action.item2 !== "number") {
                                throw new Error("item2 is required for swap action");
                            }
                            let node1 = undefined, node2 = undefined
                            for (let tree of treeObjects) {
                                if (tree.id === action.item2) {
                                    node2 = tree
                                }
                                if (tree.id === action.item) {
                                    node1 = tree
                                }
                            }
                            if (node1 === undefined || node2 === undefined) {
                                throw new Error("node not found")
                            }
                            node1.setAction(
                                ActionType.SWAP,
                                node2.position
                            );
                            node2.setAction(
                                ActionType.SWAP,
                                node1.position
                            );
                        } else {
                            for (let tree of treeObjects) {
                                if (tree.id === action.item) {
                                    tree.setAction(action.action, null)
                                }
                            }
                        }
                    }
                }

            } catch (e) {
                console.log(treeObjects);
                console.log(e);
            }
        }
    }

    static setRoles(treeObjects: NodeObj[], roles: NodeRole[], isBSTree = false) {
        if (!treeObjects.length) {
            return;
        }
        if (!isBSTree) {
            for (let role of roles) {
                if (treeObjects[role.id] === undefined) {
                    return;
                }
                treeObjects[role.id].setRole(role.role);
            }
        } else {
            for (let role of roles) {
                for (let node of treeObjects) {
                    if (node.id === role.id) {
                        node.setRole(role.role);
                    }
                }
            }
        }
    }

    static setVisited(treeObjects: NodeObj[], visitedNodes: number[]) {
        for (let node of treeObjects) {
            node.isVisited = visitedNodes.includes(node.id);
        }
    }

    static setPassed(treeObjects: NodeObj[], passedNodes: number[]) {
        for (let node of treeObjects) {
            node.isPassed = passedNodes.includes(node.id);
        }
    }
}
