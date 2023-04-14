import {HeapMemento} from '../../../ClassObjects/HeapMemento';
import {ActionType} from '../BinaryTree/BinaryTreeTypes'
import { getNodeRolesForIter } from '../BinaryTree/Helpers/Functions'

export function buildMaxHeap(A: number[], memento: HeapMemento): void {
    const heapSize = A.length;
    memento.addBlank({line: 1, name: "BuildMaxHeap"}, A)
    for (let i = Math.floor(heapSize / 2); i >= 0; i--) {
        memento.addBlank({line: 2, name: "BuildMaxHeap"},A,heapSize,[{id:i,role:'𝑖'}])
        //memento.addBlank({line: 3, name: "BuildMaxHeap"},A)
        memento.addSnapshot({line: 3, name: "BuildMaxHeap"}, A,i,ActionType.NONE,heapSize,[{id:i,role:'𝑖'}])
        maxHeapify(A, i, heapSize, memento);
    }
}


export function maxHeapify(A: number[], i: number, heapSize: number, memento: HeapMemento): void {
    const left = (2 * i) + 1;
    const right = (2 * i) + 2;
    let roles = getNodeRolesForIter(left,right,i,heapSize)
    memento.addBlank({line: 1, name: "MaxHeapify"}, A,heapSize,roles)
    memento.addBlank({line: 2, name: "MaxHeapify"}, A,heapSize,roles)
    let largest = i;
    memento.addBlank({line: 3, name: "MaxHeapify"}, A,heapSize,roles)
    if (left < heapSize && A[left] > A[largest]) {
        memento.addSnapshot({line: 4, name: "MaxHeapify"},A, left, ActionType.HIGHLIGHT_LIGHT,heapSize,roles)
        largest = left;
    } else {
        memento.addBlank({line: 5, name: "MaxHeapify"}, A,heapSize,roles)
    }
    memento.addBlank({line: 6, name: "MaxHeapify"}, A,heapSize,roles)
    if (right < heapSize && A[right] > A[largest]) {
        memento.addSnapshot({line: 7, name: "MaxHeapify"},A, right, ActionType.HIGHLIGHT_LIGHT,heapSize,roles)
        largest = right;
    }
    memento.addBlank({line: 8, name: "MaxHeapify"}, A,heapSize,roles)
    if (largest !== i) {
        memento.addSnapshot({line: 9, name: "MaxHeapify"},A, largest, ActionType.HIGHLIGHT_FULL,heapSize,roles);
        roles = [];
        [A[i], A[largest]] = [A[largest], A[i]];
        memento.addSwap({line: 9, name: "MaxHeapify"}, A, i, largest,heapSize,roles);
        memento.addBlank({line: 10, name: "MaxHeapify"}, A,heapSize,roles)
        maxHeapify(A, largest, heapSize, memento);
    }
}


export function heapExtractMax(A: number[], memento: HeapMemento): number | undefined {
    memento.addBlank({line: 1, name: "HeapExtractMax"}, A)
    if (A.length < 1) {
        memento.addBlank({line: 2, name: "HeapExtractMax"},A)
        return ;
    }
    memento.addSnapshot({line: 3, name: "HeapExtractMax"}, A,0, ActionType.HIGHLIGHT_FULL);
    const max = A[0];
    A[0] = A[A.length - 1];
    memento.addSnapshot({line: 4, name: "HeapExtractMax"},A, 0, ActionType.CHANGE);
    A.pop();
    memento.addBlank({line: 5, name: "HeapExtractMax"}, A)
    memento.addBlank({line: 6, name: "HeapExtractMax"},A)
    maxHeapify(A, 0, A.length, memento);
    memento.addBlank({line: 7, name: "HeapExtractMax"},A)
    return max;
}

export function heapMax(A: number[], memento: HeapMemento) {
    memento.addBlank({line: 1, name: "HeapMax"}, A)
    if (A.length < 1) {
        memento.addBlank({line: 2, name: "HeapMax"},A)
        return;
    }
    memento.addSnapshot({line: 3, name: "HeapMax"},A, 0, ActionType.HIGHLIGHT_FULL);
    memento.addBlank({line: 3, name: "HeapMax"},A);
}


export function maxHeapInsert(A: number[], key: number, memento: HeapMemento): void {
    memento.addBlank({line: 1, name: "MaxHeapInsert"}, A)
    A.push(-Infinity);
    memento.addSnapshot({line: 2, name: "MaxHeapInsert"}, A, A.length - 1, ActionType.ADD);
    memento.addBlank({line: 3, name: "MaxHeapInsert"},A)
    heapIncreaseKey(A, A.length - 1, key, memento);
}


export function heapIncreaseKey(A: number[], i: number, key: number, memento: HeapMemento): void {
    memento.addBlank({line: 1, name: "HeapIncreaseKey"}, A)
    if (key < A[i]) {
        memento.addBlank({line: 2, name: "HeapIncreaseKey"},A)
        return;
    }
    A[i] = key;
    memento.addSnapshot({line: 3, name: "HeapIncreaseKey"}, A,i, ActionType.CHANGE);
    memento.addBlank({line: 4, name: "HeapIncreaseKey"},A)
    while (i > 0 && A[Math.floor((i - 1) / 2)] < A[i]) {
        const j = Math.floor((i - 1) / 2);
        [A[i], A[j]] = [A[j], A[i]];
        memento.addSwap({line: 5, name: "HeapIncreaseKey"}, A, i, j);
        i = Math.floor((i - 1) / 2);
        memento.addSnapshot({line: 6, name: "HeapIncreaseKey"}, A,i, ActionType.HIGHLIGHT_LIGHT);
    }
    memento.addBlank({line: 6, name: "HeapIncreaseKey"},A);
}

export function maxHeapSort(A: number[], memento: HeapMemento): number[] {
    //memento.addBlank({line: 1, name: "MaxHeapSort"}, A)
    //buildMaxHeap(A,memento);
    let heapSize = A.length;
    memento.addBlank({line: 2, name: "MaxHeapSort"},A,heapSize);
    for (let i = A.length - 1; i > 0; i--) {
        [A[0], A[i]] = [A[i], A[0]];
        memento.addSwap({line: 3, name: "MaxHeapSort"}, A, 0,i,heapSize);
        heapSize--;
        memento.addBlank({line: 5, name: "MaxHeapSort"},A,heapSize);
        maxHeapify(A, 0, heapSize, memento);
    }
    return A;
}
