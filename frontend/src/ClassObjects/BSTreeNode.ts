export class BSTreeNode{
    parent?: BSTreeNode;
    left?: BSTreeNode;
    right?: BSTreeNode;
    value: number;
    id: number;
    constructor(value: number, id: number, left?: BSTreeNode, right?: BSTreeNode,parent?: BSTreeNode){
        this.value = value;
        this.id = id;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
    static deepCopy(node: BSTreeNode|undefined): BSTreeNode|undefined {
        if(!node){
            return undefined
        }
        const left = node.left ? BSTreeNode.deepCopy(node.left) : undefined;
        const right = node.right ? BSTreeNode.deepCopy(node.right) : undefined;
        const value = node.value;
        const id = node.id;
        const newNode = new BSTreeNode(value, id, left, right);
        if (left !== undefined){
            left.parent = newNode;
        }
        if(right !== undefined){
            right.parent = newNode
        }
        return newNode
    }

    static countNodes(root: BSTreeNode | undefined): number {
        if (!root) {
            return 0;
        }
        return 1 + BSTreeNode.countNodes(root.left) + BSTreeNode.countNodes(root.right);
    }

// create function that can get max id from tree
    static getMaxId(root: BSTreeNode | undefined): number {
        if (!root) {
            return 0;
        }
        return Math.max(BSTreeNode.getMaxId(root.left), BSTreeNode.getMaxId(root.right));
    }

    static createNewNode(
        currentRoot: BSTreeNode | undefined,
        value: number
    ): BSTreeNode {
        return {
            value: value,
            id: Math.max(BSTreeNode.countNodes(currentRoot), BSTreeNode.getMaxId(currentRoot)) + 1,
        };
    }

}