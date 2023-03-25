import {TreeNode} from "../BinaryTreeTypes";

export default function arrayToBinaryTree(arr: number[]): TreeNode | null {
    if (!arr.length) {
        return null;
    }

    const root: TreeNode = {value: arr[0], id: 0};
    const queue: TreeNode[] = [root];
    let i = 1;
    while (i < arr.length) {
        const node = queue.shift()!;
        if (arr[i] !== null) {
            const left: TreeNode = {value: arr[i], id: i};
            node.left = left;
            queue.push(left);
        }
        i++;

        if (i < arr.length && arr[i] !== null) {
            const right: TreeNode = {value: arr[i], id: i};
            node.right = right;
            queue.push(right);
        }
        i++;
    }
    return root;
}