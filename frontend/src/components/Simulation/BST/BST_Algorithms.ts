import { TreeNode } from "../BinaryTree/BinaryTreeTypes";
import { BSTreeNode } from "../../../ClassObjects/BSTreeNode";

export function search(
  root: BSTreeNode | undefined,
  k: number
): BSTreeNode | undefined {
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
  root: BSTreeNode | undefined,
  new_node: BSTreeNode
): BSTreeNode {
  if (!root) {
    return new_node;
  }
  let y = undefined as BSTreeNode | undefined;
  let x = root as BSTreeNode | undefined;
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

export function deleteNode(
  root: BSTreeNode,
  x: TreeNode
): BSTreeNode | undefined {
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

export function successor(
  root: BSTreeNode,
  x: TreeNode
): BSTreeNode | undefined {
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

export function predecessor(
  root: BSTreeNode,
  x: BSTreeNode
): BSTreeNode | undefined {
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

export function build(input: number[]): BSTreeNode | undefined {
  let root: BSTreeNode | undefined = undefined;
  for (let i = 0; i < input.length; i++) {
    let node: BSTreeNode = new BSTreeNode(input[i], i);
    root = insert(root, node);
  }
  return root;
}

function countNodes(root: BSTreeNode | undefined): number {
  if (!root) {
    return 0;
  }
  return 1 + countNodes(root.left) + countNodes(root.right);
}

// create function that can get max id from tree
function getMaxId(root: BSTreeNode | undefined): number {
  if (!root) {
    return 0;
  }
  return Math.max(getMaxId(root.left), getMaxId(root.right));
}

export function createNewNode(
  currentRoot: BSTreeNode | undefined,
  value: number
): BSTreeNode {
  return {
    value: value,
    id: Math.max(countNodes(currentRoot), getMaxId(currentRoot)) + 1,
  };
}
