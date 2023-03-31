import {TreeNode} from '../BinaryTreeTypes'
import {ActionType} from './MapActionToStyles'
import React from 'react'
import {AnimationProps} from 'framer-motion'


export function arrayToBinaryTree(arr: number[]): TreeNode {
    if (!arr.length) {
        throw new Error('Array is empty')
    }

    const root: TreeNode = {value: arr[0], id: 0}
    const queue: TreeNode[] = [root]
    let i = 1
    while (i < arr.length) {
        const node = queue.shift()!
        if (arr[i] !== null) {
            const left: TreeNode = {value: arr[i], id: i}
            node.left = left
            queue.push(left)
        }
        i++

        if (i < arr.length && arr[i] !== null) {
            const right: TreeNode = {value: arr[i], id: i}
            node.right = right
            queue.push(right)
        }
        i++
    }
    return root
}

export function getAnimationsAndStyles(action: ActionType,
                                       nodeInteractionPosition: { y: number, x: number }|null,
                                       myPosition?: { y: number, x: number }
): { initial: AnimationProps['initial'], animate: AnimationProps['animate'], exit: AnimationProps['exit'], style: React.CSSProperties } {
    let initial = {}, animate = {}, exit = {}, style = {}
    switch (action) {
        case ActionType.ADD: {
            break
        }
        case ActionType.DELETE: {
            break
        }
        case ActionType.HIGHLIGHT_FULL: {
            style = {backgroundColor: '#431f81'}
            break
        }
        case ActionType.SWAP: {
            if (!nodeInteractionPosition || !myPosition) {
                throw new Error(`nodeInteractionPosition and myPosition are required\n 
                  nodeInteractionPosition: ${nodeInteractionPosition}\n myPosition: ${myPosition}`)
            }
            animate = {
                y: nodeInteractionPosition.y - myPosition.y,
                x: nodeInteractionPosition.x - myPosition.x
               }
            style = {backgroundColor: '#1a7e3c'}
            break
        }
        case ActionType.HIGHLIGHT_LIGHT: {
            style = {backgroundColor: '#8f75c0'}
            break
        }
        case ActionType.NONE: {
            break
        }
        default: {
            break
        }
    }
    return {initial, animate, exit, style}

}

export function getHeapArrayAnimationsAndStyles( action: ActionType, myPosition: number, nodeInteractionPosition: number | null): { initial: AnimationProps['initial'], animate: AnimationProps['animate'], exit: AnimationProps['exit'], style: React.CSSProperties } {
    let initial = {}, animate = {}, exit = {}, style = {}
    switch (action) {
        case ActionType.ADD: {
            break
        }
        case ActionType.DELETE: {
            break
        }
        case ActionType.HIGHLIGHT_FULL: {
            style = {backgroundColor: '#431f81'}
            break
        }
        case ActionType.SWAP: {
            if (nodeInteractionPosition === null || myPosition === undefined) {
                throw new Error('nodeInteractionPosition and myPosition are required')
            }
            style = {backgroundColor: '#1a7e3c'}
            animate = {
                x: (nodeInteractionPosition - myPosition)*32,
            }
            break
        }
        case ActionType.HIGHLIGHT_LIGHT: {
            style = {backgroundColor: '#8f75c0'}
            break
        }
        case ActionType.NONE: {
            break
        }
        default: {
            break
        }
    }
    return {initial, animate, exit, style}

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