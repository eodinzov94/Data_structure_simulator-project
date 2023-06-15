import { BSTreeNode } from "../../../ClassObjects/BSTreeNode";
import { calculateHeight } from "../BinaryTree/Helpers/Functions";


// A utility function to get height of the tree
function height(N: BSTreeNode | undefined): number {
    if (N === undefined)
        return 0;
    return N.height;
}

// A utility function to get maximum of two integers
function max(a: number, b: number) {
    return (a > b) ? a : b;
}

// A utility function to right rotate subtree rooted with y
// See the diagram given above.
function rightRotate(y: BSTreeNode) {
    let x = y.left;
    if (!x) {
        throw new Error(`x is null ${x}`)
    }
    let T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;
    // Update heights
    y.height = max(height(y.left), height(y.right)) + 1;
    x.height = max(height(x.left), height(x.right)) + 1;

    // Return new root
    return x;
}

// A utility function to left rotate subtree rooted with x
// See the diagram given above.
function leftRotate(x: BSTreeNode) {
    let y = x.right;
    if (!y) {
        throw new Error(`y is null ${y}`)
    }
    let T2 = y.left;
    // Perform rotation
    y.left = x;
    x.right = T2;
    // Update heights
    x.height = max(height(x.left), height(x.right)) + 1;
    y.height = max(height(y.left), height(y.right)) + 1;

    // Return new root
    return y;
}

// Get Balance factor of node N
function getBalance(N: BSTreeNode | undefined): number {
    if (N === undefined)
        return 0;
    return height(N.left) - height(N.right);
}

export function insert(node: BSTreeNode | undefined, key: number, root: BSTreeNode | undefined): BSTreeNode {
    /* 1. Perform the normal BST rotation */
    if (node === undefined)
        return BSTreeNode.createNewNode(root, key,1);

    if (key < node.value) {
        node.left = insert(node.left, key, root);
    }
    else if (key > node.value) {
        node.right = insert(node.right, key, root);
    } else // Equal keys not allowed
        return node;
    /* 2. Update height of this ancestor node */
    node.height = 1 + max(height(node.left), height(node.right));
    /* 3. Get the balance factor of this ancestor
    node to check whether this node became
    Wunbalanced */
    let balance = getBalance(node);

    // If this node becomes unbalanced, then
    // there are 4 cases Left Left Case
    if (node.left && balance > 1 && key < node.left.value)
        return rightRotate(node);

    // Right Right Case
    if (node.right && balance < -1 && key >= node.right.value)
        return leftRotate(node);

    // Left Right Case
    if (node.left && balance > 1 && key >= node.left.value) {
        node.left = leftRotate(node.left);
        return rightRotate(node);
    }

    // Right Left Case
    if (node.right && balance < -1 && key < node.right.value) {
        node.right = rightRotate(node.right);
        return leftRotate(node);
    }

    /* return the (unchanged) node pointer */
    return node;
}

/* Given a non-empty binary search tree, return the
node with minimum key value found in that tree.
Note that the entire tree does not need to be
searched. */
function minValueNode(node: BSTreeNode): BSTreeNode {
    let current = node;
    /* loop down to find the leftmost leaf */
    while (current.left !== undefined)
        current = current.left;

    return current;
}

export function deleteNode(root: BSTreeNode | undefined, key: number): BSTreeNode | undefined {
    // STEP 1: PERFORM STANDARD BST DELETE
    if (root === undefined)
        return root;

    // If the key to be deleted is smaller than
    // the root's key, then it lies in left subtree
    if (key < root.value)
        root.left = deleteNode(root.left, key);

    // If the key to be deleted is greater than the
    // root's key, then it lies in right subtree
    else if (key > root.value)
        root.right = deleteNode(root.right, key);

    // if key is same as root's key, then this is the node
    // to be deleted
    else {

        // node with only one child or no child
        if ((root.left === undefined) || (root.right === undefined)) {
            let temp = undefined;
            if (temp === root.left)
                temp = root.right;
            else
                temp = root.left;

            // No child case
            if (temp === undefined) {
                temp = root;
                root = undefined;
            }
            else // One child case
                root = temp; // Copy the contents of
            // the non-empty child
        }
        else {

            // node with two children: Get the inorder
            // successor (smallest in the right subtree)
            let temp = minValueNode(root.right);

            // Copy the inorder successor's data to this node
            root.value = temp.value;

            // Delete the inorder successor
            root.right = deleteNode(root.right, temp.value);
        }
    }

    // If the tree had only one node then return
    if (root == null)
        return root;

    // STEP 2: UPDATE HEIGHT OF THE CURRENT NODE
    root.height = max(height(root.left), height(root.right)) + 1;

    // STEP 3: GET THE BALANCE FACTOR OF THIS NODE (to check whether
    // this node became unbalanced)
    let balance = getBalance(root);

    // If this node becomes unbalanced, then there are 4 cases
    // Left Left Case
    if (balance > 1 && getBalance(root.left) >= 0)
        return rightRotate(root);

    // Left Right Case
    if (root.left && balance > 1 && getBalance(root.left) < 0) {
        root.left = leftRotate(root.left);
        return rightRotate(root);
    }

    // Right Right Case
    if (balance < -1 && getBalance(root.right) <= 0)
        return leftRotate(root);

    // Right Left Case
    if (root.right && balance < -1 && getBalance(root.right) > 0) {
        root.right = rightRotate(root.right);
        return leftRotate(root);
    }

    return root;
}
export function build(input: number[]): BSTreeNode | undefined {
    let root: BSTreeNode | undefined = undefined;
    for (let i = 0; i < input.length; i++) {
        root = insert(root, input[i], root);
    }
    const height = calculateHeight(root)
    if (height > 6) {
        throw new Error("Tree is too big, max height is 6");
    }
    return root;
}

export function randomBuildTree(input: number[]): BSTreeNode | undefined {
    let root: BSTreeNode | undefined = undefined;
    let temp: BSTreeNode | undefined = undefined;
    for (let i = 0; i < input.length; i++) {
        temp = insert(temp, input[i], temp);
        if (calculateHeight(temp) > 6) {
            temp = BSTreeNode.deepCopy(root)
        } else {
            root = BSTreeNode.deepCopy(temp)
        }
    }
    return root;
}
