import { ActionType, NodeRole, TreeNode } from "../BinaryTreeTypes";
import React from "react";
import { AnimationProps } from "framer-motion";
import {
  HeapPseudoCode,
  HeapPseudoCodeKeys,
  HeapPseudoCodeList,
} from "../../PseudoCode/HeapPseudoCodeData";

export function arrayToBinaryTree(arr: number[]): TreeNode | null {
  if (!arr.length) {
    return null;
  }

  const root: TreeNode = { value: arr[0], id: 0 };
  const queue: TreeNode[] = [root];
  let i = 1;
  while (i < arr.length) {
    const node = queue.shift()!;
    if (arr[i] !== null) {
      const left: TreeNode = { value: arr[i], id: i };
      node.left = left;
      queue.push(left);
    }
    i++;

    if (i < arr.length && arr[i] !== null) {
      const right: TreeNode = { value: arr[i], id: i };
      node.right = right;
      queue.push(right);
    }
    i++;
  }
  return root;
}

export function getAnimationsAndStyles(
  action: ActionType,
  nodeInteractionPosition: { y: number; x: number } | null,
  myPosition?: { y: number; x: number }
): {
  initial: AnimationProps["initial"];
  animate: AnimationProps["animate"];
  style: React.CSSProperties;
} {
  let initial = {},
    animate = {},
    style = {};
  switch (action) {
    case ActionType.CHANGE: {
      initial = {
        opacity: 0,
        scale: 0.5,
      };
      animate = {
        opacity: 1,
        scale: 1,
      };
      break;
    }
    case ActionType.ADD: {
      initial = {
        opacity: 0,
      };
      animate = {
        opacity: 1,
      };
      break;
    }
    case ActionType.HIGHLIGHT_FULL: {
      style = { backgroundColor: "#431f81" };
      break;
    }
    case ActionType.SWAP: {
      if (!nodeInteractionPosition || !myPosition) {
        throw new Error(`nodeInteractionPosition and myPosition are required\n 
                  nodeInteractionPosition: ${nodeInteractionPosition}\n myPosition: ${myPosition}`);
      }
      initial = {
        y: nodeInteractionPosition.y - myPosition.y,
        x: nodeInteractionPosition.x - myPosition.x,
      };
      animate = {
        x: 0,
        y: 0,
      };
      style = { backgroundColor: "#1a7e3c" };
      break;
    }
    case ActionType.HIGHLIGHT_LIGHT: {
      style = { backgroundColor: "#8f75c0" };
      break;
    }
    case ActionType.NONE: {
      break;
    }
    default: {
      break;
    }
  }
  return { initial, animate, style };
}

export function getHeapArrayAnimationsAndStyles(
  action: ActionType,
  myPosition: number,
  nodeInteractionPosition: number | null
): {
  initial: AnimationProps["initial"];
  animate: AnimationProps["animate"];
  style: React.CSSProperties;
} {
  let initial = {},
    animate = {},
    style = {};
  switch (action) {
    case ActionType.CHANGE: {
      initial = {
        opacity: 0,
        scale: 0.5,
      };
      animate = {
        opacity: 1,
        scale: 1,
      };
      break;
    }
    case ActionType.ADD: {
      initial = {
        opacity: 0,
      };
      animate = {
        opacity: 1,
      };
      break;
    }
    case ActionType.HIGHLIGHT_FULL: {
      style = { backgroundColor: "#431f81" };
      break;
    }
    case ActionType.SWAP: {
      if (nodeInteractionPosition === null || myPosition === undefined) {
        throw new Error("nodeInteractionPosition and myPosition are required");
      }
      style = { backgroundColor: "#1a7e3c" };
      initial = {
        x: (nodeInteractionPosition - myPosition) * 32,
      };
      animate = {
        x: 0
      };
      break;
    }
    case ActionType.HIGHLIGHT_LIGHT: {
      style = { backgroundColor: "#8f75c0" };
      break;
    }
    case ActionType.NONE: {
      break;
    }
    default: {
      break;
    }
  }
  return { initial, animate, style };
}

export function binaryHeapToArray(root: TreeNode): number[] {
  const queue: TreeNode[] = [root];
  const result: number[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node.value);

    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }

  return result;
}

export function getArrFromInputForHeap(maxSize: number, data: string, maxNum=999,minNum = 0) {
  let list = data.split(",");
  if (list.includes("")) return `Input must be numbers that seperated by comma`;
  if (list.length > maxSize) return `Max array size is ${maxSize}`;
  const newData: number[] = [];
  for (let item of list) {
    let num = Number(item);
    if (Number.isNaN(num)) return `${item} is not a number`;
    if (num > maxNum) return `Max element length is ${maxNum}, ${item} is bigger`;
    if (num > maxNum) return `Min element length is ${minNum}, ${item} is smaller`;
    newData.push(num);
  }
  return newData;
}


export const getNodeRolesForIter = (left:number|null,right:number|null,i:number,heapSize:number) => {
  const roles = [] as NodeRole[]
  if (left && left < heapSize){
    roles.push({role:"L",id:left})
  }
  if (right && right < heapSize){
    roles.push({role:"R",id:right})
  }
  roles.push({role:"𝑖",id:i})
  return roles
}
export const generateRandomArrForHeap = () =>{
  const randomArray = [];
  const length = Math.floor(Math.random() * 9) + 7; // Generate a random length between 10 and 15
  for (let i = 0; i < length; i++) {
    randomArray.push(Math.floor(Math.random() * 100)); // Generate a random number between 0 and 99 and add it to the array
  }
  return randomArray;
}

export const combinePseudoCodes = (currentAlg:HeapPseudoCodeKeys) => {
       if(HeapPseudoCodeList[currentAlg].length===2){
         const alg1 = HeapPseudoCodeList[currentAlg][0]
         const alg2 = HeapPseudoCodeList[currentAlg][1]
         const code1 = HeapPseudoCode[alg1]
         const code2 = HeapPseudoCode[alg2]
         return [...code1,{ text: "", tabAmount: 1 },...code2]
       }
       return HeapPseudoCode[currentAlg]

}
