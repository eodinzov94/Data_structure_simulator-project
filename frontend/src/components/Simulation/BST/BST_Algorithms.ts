import {TreeNode} from "../BinaryTree/BinaryTreeTypes";

export interface BST_Node extends TreeNode {
    parent?: BST_Node;
    left?: BST_Node;
    right?: BST_Node;
}

export function search(root: BST_Node | undefined, k: number): BST_Node | undefined {
    if (!root || root.value === k) {
        return root;
    }
    if (k < root.value) {
        return search(root.left, k);
    } else {
        return search(root.right, k);
    }
}
export function insert(
    root: BST_Node | undefined,
    new_node: BST_Node
): BST_Node {
    if (!root) {
        return new_node;
    }
    let y = undefined as BST_Node | undefined;
    let x = root as BST_Node | undefined;
    while (x) {
        y = x;
        if (new_node.value < x.value) {
            x = x.left;
        } else {
            x = x.right;
        }
    }
    new_node.parent = y;
    if (!y) {
        return new_node;
    }
    if (new_node.value < y.value) {
        y.left = new_node;
    } else {
        y.right = new_node;
    }
    return root;
}

export function deleteNode(root: BST_Node, x: TreeNode): BST_Node | undefined {
    if (!x.left && !x.right) {
        if (x.value < root.value) {
            root.left = undefined;
        } else {
            root.right = undefined;
        }
        return root;
    }
    if (x.left && x.right) {
        let y = min(x.right);
        x.value = y.value;
        x.right = deleteNode(x.right, y);
        return root;
    }
    if (x.left) {
        return x.left;
    }
    if (x.right) {
        return x.right;
    }
    return undefined;
}

export function min(root: TreeNode): TreeNode {
    while (root.left) {
        root = root.left;
    }
    return root;
}

export function max(root: TreeNode): TreeNode {
    while (root.right) {
        root = root.right;
    }
    return root;
}

export function successor(root: BST_Node, x: TreeNode): BST_Node | undefined {
    if (root.right) {
        return min(root.right);
    }
    let y = root.parent;
    while (y && x.value === y.right?.value) {
        root = y;
        y = y.parent;
    }
    return y;
}

export function predecessor(root: BST_Node, x: BST_Node): BST_Node | undefined {
    if (root.left) {
        return max(root.left);
    }
    let y = root.parent;
    while (y && x.value === y.left?.value) {
        root = y;
        y = y.parent;
    }
    return y;
}

export function build(input: number[]): BST_Node | undefined {
    let root: BST_Node | undefined = undefined;
    for (let i = 0; i < input.length; i++) {
        let node: BST_Node = {
            value: input[i],
            id: i,
        };
        root = insert(root, node);
    }
    return root;
}

function countNodes(root: BST_Node | undefined): number {
    if (!root) {
        return 0;
    }
    return 1 + countNodes(root.left) + countNodes(root.right);
}
// create function that can get max id from tree
function getMaxId(root: BST_Node | undefined): number {
    if (!root) {
        return 0;
    }
    return Math.max(getMaxId(root.left), getMaxId(root.right));
}



export function createNewNode(currentRoot: BST_Node | undefined, value: number): BST_Node {
    return {
        value: value,
        id: Math.max(countNodes(currentRoot), getMaxId(currentRoot))+ 1,
    };
}
