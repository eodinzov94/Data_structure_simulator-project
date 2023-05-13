export class BSTreeNode{
    parent?: BSTreeNode;
    left?: BSTreeNode;
    right?: BSTreeNode;
    value: number;
    id: number;
    constructor(value: number, id: number, parent?: BSTreeNode, left?: BSTreeNode, right?: BSTreeNode){
        this.value = value;
        this.id = id;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}