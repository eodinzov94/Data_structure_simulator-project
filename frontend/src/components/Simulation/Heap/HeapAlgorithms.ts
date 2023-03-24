export function buildMaxHeap(A: number[]): void {
    const heapSize = A.length;
    for (let i = Math.floor(heapSize / 2); i >= 0; i--) {
        maxHeapify(A, i, heapSize);
    }
}


export function maxHeapify(A: number[], i: number, heapSize: number): void {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;
    if (left < heapSize && A[left] > A[largest]) {
        largest = left;
    }
    if (right < heapSize && A[right] > A[largest]) {
        largest = right;
    }
    if (largest !== i) {
        [A[i], A[largest]] = [A[largest], A[i]];
        maxHeapify(A, largest, heapSize);
    }
}


export function heapExtractMax(A: number[], heapSize: number): number | undefined {
    if (heapSize < 1) {
        throw new Error("Heap underflow");
    }
    const max = A[0];
    A[0] = A[heapSize - 1];
    maxHeapify(A, 0, heapSize - 1);
    return max;
}


export function heapMax(A: number[]): number | undefined {
    if (A.length < 1) {
        return undefined;
    }
    return A[0];
}


export function maxHeapInsert(A: number[], key: number): void {
    A.push(-Infinity);
    heapIncreaseKey(A, A.length - 1, key);
}


export function heapIncreaseKey(A: number[], i: number, key: number): void {
    if (key < A[i]) {
        throw new Error("New key is smaller than current key");
    }
    A[i] = key;
    while (i > 0 && A[Math.floor((i - 1) / 2)] < A[i]) {
        [A[i], A[Math.floor((i - 1) / 2)]] = [A[Math.floor((i - 1) / 2)], A[i]];
        i = Math.floor((i - 1) / 2);
    }
}

export function maxHeapSort(A: number[]): number[] {
    buildMaxHeap(A);
    let heapSize = A.length;
    for (let i = A.length - 1; i > 0; i--) {
        [A[0], A[i]] = [A[i], A[0]];
        heapSize--;
        maxHeapify(A, 0, heapSize);
    }
    return A;
}
