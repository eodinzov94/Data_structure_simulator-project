import {Memento} from '../../../ClassObjects/Memento';
import {ActionType} from '../BinaryTree/BinaryTreeTypes'

export function buildMaxHeap(A: number[], memento: Memento): void {
    const heapSize = A.length;
    memento.addBlankByCopy({line: 1, name: "BuildMaxHeap"}, A)
    for (let i = Math.floor(heapSize / 2); i >= 0; i--) {
        memento.addBlankByRef({line: 2, name: "BuildMaxHeap"})
        memento.addBlankByRef({line: 3, name: "BuildMaxHeap"})
        maxHeapify(A, i, heapSize, memento);
    }
}


export function maxHeapify(A: number[], i: number, heapSize: number, memento: Memento): void {
    memento.addBlankByRef({line: 1, name: "MaxHeapify"})
    const left = (2 * i) + 1;
    memento.addBlankByRef({line: 2, name: "MaxHeapify"})
    const right = (2 * i) + 2;
    let largest = i;

    memento.addBlankByRef({line: 3, name: "MaxHeapify"})
    if (left < heapSize && A[left] > A[largest]) {
        memento.addSnapshotByRef({line: 4, name: "MaxHeapify"}, left, ActionType.HIGHLIGHT_LIGHT)
        largest = left;
    } else {
        memento.addBlankByRef({line: 5, name: "MaxHeapify"})
    }
    memento.addBlankByRef({line: 6, name: "MaxHeapify"})
    if (right < heapSize && A[right] > A[largest]) {
        memento.addSnapshotByRef({line: 7, name: "MaxHeapify"}, right, ActionType.HIGHLIGHT_LIGHT)
        largest = right;
    }
    memento.addBlankByRef({line: 8, name: "MaxHeapify"})
    if (largest !== i) {
        memento.addSnapshotByRef({line: 9, name: "MaxHeapify"}, largest, ActionType.HIGHLIGHT_FULL);
        memento.addSwap({line: 9, name: "MaxHeapify"}, A, i, largest);
        [A[i], A[largest]] = [A[largest], A[i]];
        memento.addBlankByCopy({line: 10, name: "MaxHeapify"}, A)
        maxHeapify(A, largest, heapSize, memento);
    }
}


export function heapExtractMax(A: number[], memento: Memento): number | undefined {
    memento.addBlankByCopy({line: 1, name: "HeapExtractMax"}, A)
    if (A.length < 1) {
        memento.addBlankByRef({line: 2, name: "HeapExtractMax"})
        throw new Error("Heap underflow");
    }
    memento.addSnapshotByRef({line: 3, name: "HeapExtractMax"}, 0, ActionType.HIGHLIGHT_FULL);
    const max = A[0];
    memento.addSnapshotByRef({line: 4, name: "HeapExtractMax"}, 0, ActionType.CHANGE);
    A[0] = A[A.length - 1];
    memento.addBlankByCopy({line: 4, name: "HeapExtractMax"}, A);
    A.pop();
    memento.addBlankByCopy({line: 5, name: "HeapExtractMax"}, A)
    memento.addBlankByRef({line: 6, name: "HeapExtractMax"})
    maxHeapify(A, 0, A.length, memento);
    memento.addBlankByRef({line: 7, name: "HeapExtractMax"})
    return max;
}

export function heapMax(A: number[], memento: Memento) {
    memento.addBlankByCopy({line: 1, name: "HeapMax"}, A)
    if (A.length < 1) {
        memento.addBlankByRef({line: 2, name: "HeapMax"})
        return;
    }
    memento.addSnapshotByRef({line: 3, name: "HeapMax"}, 0, ActionType.HIGHLIGHT_FULL);
    memento.addBlankByRef({line: 3, name: "HeapMax"});
}


export function maxHeapInsert(A: number[], key: number, memento: Memento): void {
    memento.addBlankByCopy({line: 1, name: "MaxHeapInsert"}, A)
    A.push(-Infinity);
    memento.addSnapshotByCopy({line: 2, name: "MaxHeapInsert"}, A, A.length - 1, ActionType.ADD);
    memento.addBlankByRef({line: 3, name: "MaxHeapInsert"})
    heapIncreaseKey(A, A.length - 1, key, memento);
}


export function heapIncreaseKey(A: number[], i: number, key: number, memento: Memento): void {
    memento.addBlankByCopy({line: 1, name: "HeapIncreaseKey"}, A)
    if (key < A[i]) {
        memento.addBlankByRef({line: 2, name: "HeapIncreaseKey"})
        return;
    }
    memento.addSnapshotByRef({line: 3, name: "HeapIncreaseKey"}, i, ActionType.CHANGE);
    A[i] = key;
    memento.addBlankByCopy({line: 3, name: "HeapIncreaseKey"}, A)
    memento.addBlankByRef({line: 4, name: "HeapIncreaseKey"})
    while (i > 0 && A[Math.floor((i - 1) / 2)] < A[i]) {
        const j = Math.floor((i - 1) / 2);
        memento.addSwap({line: 5, name: "HeapIncreaseKey"}, A, i, j);
        [A[i], A[j]] = [A[j], A[i]];
        memento.addBlankByCopy({line: 5, name: "HeapIncreaseKey"}, A)
        i = Math.floor((i - 1) / 2);
        memento.addSnapshotByRef({line: 6, name: "HeapIncreaseKey"}, i, ActionType.HIGHLIGHT_LIGHT);
    }
    memento.addBlankByRef({line: 6, name: "HeapIncreaseKey"});
}

export function maxHeapSort(A: number[], memento: Memento): number[] {
    memento.addBlankByCopy({line: 1, name: "MaxHeapSort"}, A)
    buildMaxHeap(A,memento);
    let heapSize = A.length;
    memento.addBlankByRef({line: 2, name: "MaxHeapSort"})
    for (let i = A.length - 1; i > 0; i--) {
        memento.addSwap({line: 3, name: "MaxHeapSort"}, A, 0,i);
        [A[0], A[i]] = [A[i], A[0]];
        memento.addBlankByCopy({line: 3, name: "MaxHeapSort"}, A);
        heapSize--;
        // memento.addInvisibleByRef({line: 4, name: "MaxHeapSort"});
        memento.addBlankByRef({line: 5, name: "MaxHeapSort"});
        maxHeapify(A, 0, heapSize, memento);
    }
    return A;
}
