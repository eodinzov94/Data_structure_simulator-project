import {ActionType} from "../BinaryTree/BinaryTreeTypes";
import {BSTreeNode} from "../../../ClassObjects/BSTreeNode";
import {BSTreeMemento} from "../../../ClassObjects/BSTreeMemento";

export function search(
    root: BSTreeNode | undefined,
    k: number,
    memento: BSTreeMemento,
    mainRoot: BSTreeNode|undefined
): BSTreeNode | undefined {
    //pseudo for if (!root || root.value === k)
    if (!root || root.value === k) {
        //pseudo for return root;
        memento.addBlank({line: 1, name: "Search"}, mainRoot)
        if(root && root.value === k){
            memento.addSnapshot({line: 1, name: "Search"}, mainRoot, root.id, ActionType.HIGHLIGHT_FULL)
        }else{
            memento.addBlank({line: 1, name: "Search"}, mainRoot)
        }
        return root;
    }
    memento.addSnapshot({line: 1, name: "Search"}, mainRoot, root.id, ActionType.HIGHLIGHT_LIGHT)
    if (k < root.value) {
        if(root.left){
            memento.addSnapshot({line: 1, name: "Search"}, mainRoot, root.left.id, ActionType.HIGHLIGHT_LIGHT)
        }else{
            memento.addBlank({line: 1, name: "Search"}, mainRoot)
        }
        return search(root.left, k, memento,mainRoot);
    } else {
        if(root.right){
            memento.addSnapshot({line: 1, name: "Search"}, mainRoot, root.right.id, ActionType.HIGHLIGHT_LIGHT)
        }else{
            memento.addBlank({line: 1, name: "Search"}, mainRoot)
        }
        return search(root.right, k, memento,mainRoot);
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

export function insertWithAnimations(
    root: BSTreeNode | undefined,
    new_node: BSTreeNode,
    memento: BSTreeMemento
): BSTreeNode {
    //pseudo for y
    memento.addBlank({line: 1, name: "Insert"}, root)
    let y = undefined as BSTreeNode | undefined;

    if (root) {//pseudo for x = root
        memento.addSnapshot({line: 1, name: "Insert"}, root, root.id, ActionType.HIGHLIGHT_LIGHT)
    } else {
        memento.addBlank({line: 1, name: "Insert"}, root)
    }
    let x = root;
    while (x) {
        //pseudo for while
        memento.addSnapshot({line: 1, name: "Insert"}, root, x.id, ActionType.HIGHLIGHT_LIGHT)

        //pseudo for y = x
        memento.addSnapshot({line: 1, name: "Insert"}, root, x.id, ActionType.HIGHLIGHT_LIGHT)
        y = x;
        if (new_node.value < x.value) {
            //pseudo for if
            memento.addSnapshot({line: 1, name: "Insert"}, root, x.id, ActionType.HIGHLIGHT_LIGHT)
            x = x.left;
            //pseudo for left
            if (x?.left) {
                memento.addSnapshot({line: 1, name: "Insert"}, root, x.left.id, ActionType.HIGHLIGHT_LIGHT)
            } else {
                memento.addBlank({line: 1, name: "Insert"}, root)
            }

        } else {
            //pseudo for right
            memento.addSnapshot({line: 1, name: "Insert"}, root, x.id, ActionType.HIGHLIGHT_LIGHT)
            x = x.right;
            if (x?.right) {
                memento.addSnapshot({line: 1, name: "Insert"}, root, x.right.id, ActionType.HIGHLIGHT_LIGHT)
            } else {
                memento.addBlank({line: 1, name: "Insert"}, root)
            }
        }
    }
    new_node.parent = y;

    if (y) {//pseudo for new_node.parent = y
        memento.addSnapshot({line: 1, name: "Insert"}, root, y!.id, ActionType.HIGHLIGHT_LIGHT)
    } else {
        memento.addBlank({line: 1, name: "Insert"}, root)
    }
    //pseudo for if(!y)
    memento.addBlank({line: 1, name: "Insert"}, root)
    if (!y) {
        //pseudo for return
        memento.addSnapshot({line: 1, name: "Insert"}, new_node, new_node.id, ActionType.HIGHLIGHT_LIGHT)
        return new_node;
    }
    //pseudo for if
    memento.addBlank({line: 1, name: "Insert"}, root)
    if (new_node.value < y.value) {
        y.left = new_node;
        //pseudo for y.left = new_node;
        memento.addSnapshot({line: 1, name: "Insert"}, root, new_node.id, ActionType.ADD)
    } else {
        //pseudo for else
        memento.addBlank({line: 1, name: "Insert"}, root)
        y.right = new_node;
        //pseudo for  y.right = new_node
        memento.addSnapshot({line: 1, name: "Insert"}, root, new_node.id, ActionType.ADD)
    }
    //pseudo for return
    memento.addBlank({line: 1, name: "Insert"}, root)
    return root!;
}


// export function deleteNode(
//     root: BSTreeNode | undefined,
//     x: BSTreeNode,
//     memento: BSTreeMemento
// ): BSTreeNode | undefined {
//     if (!root) {
//         return root;
//     }
//     if (!x.left && !x.right) {
//         if (x.value < root.value) {
//             root.left = undefined;
//         } else {
//             root.right = undefined;
//         }
//         return root;
//     }
//     if (x.left && x.right) {
//         let y = getMin(x.right,memento);
//         x.value = y!.value;
//         x.right = deleteNode(x.right, y!,memento);
//         return root;
//     }
//     if (x.left) {
//         return x.left;
//     }
//     if (x.right) {
//         return x.right;
//     }
//     return undefined;
// }

export function getMin(root: BSTreeNode|undefined, memento: BSTreeMemento,mainRoot?:BSTreeNode,currentAlg = 'Min'): BSTreeNode|undefined {
    if (!root) {
        return root;
    }
    if(!mainRoot){
        mainRoot = root;
    }
    memento.addSnapshot({line: 1, name: currentAlg}, mainRoot, root.id, ActionType.HIGHLIGHT_LIGHT)
    let temp = root;
    while (temp.left) {
        memento.addSnapshot({line: 1, name: currentAlg}, mainRoot, temp.left.id, ActionType.HIGHLIGHT_LIGHT)
        temp = temp.left;
        memento.addSnapshot({line: 1, name: currentAlg}, mainRoot, temp.id, ActionType.HIGHLIGHT_LIGHT)
    }
    memento.addSnapshot({line: 1, name: currentAlg}, mainRoot, temp.id, ActionType.HIGHLIGHT_FULL)
    return temp;
}

export function getMax(root: BSTreeNode|undefined, memento: BSTreeMemento,mainRoot?:BSTreeNode, currentAlg = 'Max'): BSTreeNode|undefined {
    if (!root) {
        return root;
    }
    if(!mainRoot){
        mainRoot = root;
    }
    memento.addSnapshot({line: 1, name: currentAlg}, mainRoot, root.id, ActionType.HIGHLIGHT_LIGHT)
    let temp = root;
    while (temp.right) {
        memento.addSnapshot({line: 1, name: currentAlg}, mainRoot, temp.right.id, ActionType.HIGHLIGHT_LIGHT)
        temp = temp.right;
        memento.addSnapshot({line: 1, name: currentAlg}, mainRoot, temp.id, ActionType.HIGHLIGHT_LIGHT)
    }
    memento.addSnapshot({line: 1, name: currentAlg}, mainRoot, temp.id, ActionType.HIGHLIGHT_FULL)
    return temp;
}

export function successor(
    root: BSTreeNode | undefined,
    memento: BSTreeMemento
): BSTreeNode | undefined {
    if (!root){
        return root;
    }
    if(root.right){
        memento.addSnapshot({line: 1, name: "Successor"}, root, root.right.id, ActionType.HIGHLIGHT_LIGHT)
        return getMin(root.right,memento,root,"Successor")
    }
    let y = root.parent;
    if(y){
        memento.addSnapshot({line: 1, name: "Successor"}, root, y.id, ActionType.HIGHLIGHT_LIGHT)
    }else{
        memento.addBlank({line: 1, name: "Successor"}, root)
    }
    let x = root
    while (y && x === y?.right){
        memento.addDoubleSnapShot({line: 1, name: "Successor"},root, y.id,x.id, ActionType.HIGHLIGHT_LIGHT,[])
        x = y
        memento.addBlank({line: 1, name: "Successor"}, root)
        y = y.parent
        memento.addBlank({line: 1, name: "Successor"}, root)
    }
    if(y){
        memento.addSnapshot({line: 1, name: "Successor"}, root, y.id, ActionType.HIGHLIGHT_LIGHT)
    }else{
        memento.addBlank({line: 1, name: "Successor"}, root)
    }
    return y
}

export function predecessor(root: BSTreeNode|undefined, memento: BSTreeMemento): BSTreeNode | undefined {
   if (!root){
       return root;
   }
   if(root.left){
       memento.addSnapshot({line: 1, name: "Predecessor"}, root, root.left.id, ActionType.HIGHLIGHT_LIGHT)
       return getMax(root.left,memento,root,"Predecessor");
   }
   let y = root.parent;
   if(y){
       memento.addSnapshot({line: 1, name: "Predecessor"}, root, y.id, ActionType.HIGHLIGHT_LIGHT)
   }else{
       memento.addBlank({line: 1, name: "Predecessor"}, root)
   }
   let x = root
   while (y && x === y?.left){
       memento.addDoubleSnapShot({line: 1, name: "Predecessor"},root, y.id,x.id, ActionType.HIGHLIGHT_LIGHT,[])
       x = y
       memento.addBlank({line: 1, name: "Predecessor"}, root)
       y = y.parent
       memento.addBlank({line: 1, name: "Predecessor"}, root)
   }
    if(y){
        memento.addSnapshot({line: 1, name: "Predecessor"}, root, y.id, ActionType.HIGHLIGHT_LIGHT)
    }else{
        memento.addBlank({line: 1, name: "Predecessor"}, root)
    }
   return y
}

export function build(input: number[]): BSTreeNode | undefined {
    let root: BSTreeNode | undefined = undefined;
    for (let i = 0; i < input.length; i++) {
        let node: BSTreeNode = new BSTreeNode(input[i], i);
        root = insert(root, node);
    }
    return root;
}

