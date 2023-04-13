import {HeapMemento} from '../../../ClassObjects/HeapMemento';
import {ActionType} from '../BinaryTree/BinaryTreeTypes'

export function buildMaxHeap(A: number[], memento: HeapMemento): void {
    const heapSize = A.length;
    memento.addBlank({line: 1, name: "BuildMaxHeap"}, A)
    for (let i = Math.floor(heapSize / 2); i >= 0; i--) {
        memento.addBlank({line: 2, name: "BuildMaxHeap"},A)
        memento.addBlank({line: 3, name: "BuildMaxHeap"},A)
        maxHeapify(A, i, heapSize, memento);
    }
}


export function maxHeapify(A: number[], i: number, heapSize: number, memento: HeapMemento): void {
    memento.addBlank({line: 1, name: "MaxHeapify"}, A)
    const left = (2 * i) + 1;
    memento.addBlank({line: 2, name: "MaxHeapify"}, A)
    const right = (2 * i) + 2;
    let largest = i;

    memento.addBlank({line: 3, name: "MaxHeapify"}, A)
    if (left < heapSize && A[left] > A[largest]) {
        memento.addSnapshot({line: 4, name: "MaxHeapify"},A, left, ActionType.HIGHLIGHT_LIGHT)
        largest = left;
    } else {
        memento.addBlank({line: 5, name: "MaxHeapify"}, A)
    }
    memento.addBlank({line: 6, name: "MaxHeapify"}, A)
    if (right < heapSize && A[right] > A[largest]) {
        memento.addSnapshot({line: 7, name: "MaxHeapify"},A, right, ActionType.HIGHLIGHT_LIGHT)
        largest = right;
    }
    memento.addBlank({line: 8, name: "MaxHeapify"}, A)
    if (largest !== i) {
        memento.addSnapshot({line: 9, name: "MaxHeapify"},A, largest, ActionType.HIGHLIGHT_FULL);
        memento.addSwap({line: 9, name: "MaxHeapify"}, A, i, largest);
        [A[i], A[largest]] = [A[largest], A[i]];
        memento.addBlank({line: 10, name: "MaxHeapify"}, A)
        maxHeapify(A, largest, heapSize, memento);
    }
}


export function heapExtractMax(A: number[], memento: HeapMemento): number | undefined {
    memento.addBlank({line: 1, name: "HeapExtractMax"}, A)
    if (A.length < 1) {
        memento.addBlank({line: 2, name: "HeapExtractMax"},A)
        throw new Error("Heap underflow");
    }
    memento.addSnapshot({line: 3, name: "HeapExtractMax"}, A,0, ActionType.HIGHLIGHT_FULL);
    const max = A[0];
    memento.addSnapshot({line: 4, name: "HeapExtractMax"},A, 0, ActionType.CHANGE);
    A[0] = A[A.length - 1];
    memento.addBlank({line: 4, name: "HeapExtractMax"}, A);
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
    memento.addSnapshot({line: 3, name: "HeapIncreaseKey"}, A,i, ActionType.CHANGE);
    A[i] = key;
    memento.addBlank({line: 3, name: "HeapIncreaseKey"}, A)
    memento.addBlank({line: 4, name: "HeapIncreaseKey"},A)
    while (i > 0 && A[Math.floor((i - 1) / 2)] < A[i]) {
        const j = Math.floor((i - 1) / 2);
        memento.addSwap({line: 5, name: "HeapIncreaseKey"}, A, i, j);
        [A[i], A[j]] = [A[j], A[i]];
        memento.addBlank({line: 5, name: "HeapIncreaseKey"}, A)
        i = Math.floor((i - 1) / 2);
        memento.addSnapshot({line: 6, name: "HeapIncreaseKey"}, A,i, ActionType.HIGHLIGHT_LIGHT);
    }
    memento.addBlank({line: 6, name: "HeapIncreaseKey"},A);
}

export function maxHeapSort(A: number[], memento: HeapMemento): number[] {
    memento.addBlank({line: 1, name: "MaxHeapSort"}, A)
    buildMaxHeap(A,memento);
    let heapSize = A.length;
    memento.addBlank({line: 2, name: "MaxHeapSort"},A)
    for (let i = A.length - 1; i > 0; i--) {
        memento.addSwap({line: 3, name: "MaxHeapSort"}, A, 0,i);
        [A[0], A[i]] = [A[i], A[0]];
        memento.addBlank({line: 3, name: "MaxHeapSort"}, A);
        heapSize--;
        // memento.addInvisibleByRef({line: 4, name: "MaxHeapSort"});
        memento.addBlank({line: 5, name: "MaxHeapSort"},A);
        maxHeapify(A, 0, heapSize, memento);
    }
    return A;
}
