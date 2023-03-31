import { ActionType, Events, HeapSnapshots } from '../BinaryTree/Helpers/MapActionToStyles'

export function buildMaxHeap(A: number[],actionsArr:Events[],heapSnapshots:HeapSnapshots): void {
    const heapSize = A.length;
    for (let i = Math.floor(heapSize / 2); i >= 0; i--) {
        maxHeapify(A, i, heapSize,actionsArr,heapSnapshots);
    }
    if(!heapSnapshots.length)
        console.log("Already a max heap!") //TODO:Toastify or smth
}


export function maxHeapify(A: number[], i: number, heapSize: number,actionsArr:Events[],heapSnapshots:HeapSnapshots): void {
    const left = (2 * i) + 1;
    const right = (2 * i) + 2;
    let largest = i;
    let itemArr = []
    if (left < heapSize && A[left] > A[largest]) {
      itemArr.push({ action: ActionType.HIGHLIGHT_LIGHT, item: left })
    }
    if (right < heapSize && A[right] > A[largest]) {
      itemArr.push({ action: ActionType.HIGHLIGHT_LIGHT, item: right })
    }
    if(itemArr.length){
        actionsArr.push(itemArr);
        heapSnapshots.push([...A])
    }
    if (left < heapSize && A[left] > A[largest]) {
        largest = left;
    }
    if (right < heapSize && A[right] > A[largest]) {
        largest = right;
    }
    if (largest !== i) {
        actionsArr.push([
            { action: ActionType.HIGHLIGHT_LIGHT, item: largest },
            { action: ActionType.HIGHLIGHT_FULL, item: i }
        ]);
        heapSnapshots.push([...A]);
        actionsArr.push([
            { action: ActionType.SWAP, item: i,item2:largest},
        ]);
        heapSnapshots.push([...A]);
        [A[i], A[largest]] = [A[largest], A[i]];
        heapSnapshots.push([...A]);
        actionsArr.push([]);
        maxHeapify(A, largest, heapSize,actionsArr,heapSnapshots );
    }
}


export function heapExtractMax(A: number[],actionsArr:Events[],heapSnapshots:HeapSnapshots ): number | undefined {
    if (A.length < 1) {
        throw new Error("Heap underflow");
    }
    const max = A[0];
    /* SELECT FIRST + LAST */
    actionsArr.push([
        { action: ActionType.HIGHLIGHT_FULL, item: 0 },
        { action: ActionType.HIGHLIGHT_LIGHT, item: 0 },
    ]);
    heapSnapshots.push([...A]);
    /* END SELECT FIRST + LAST */

    /* SWAP ANIMATION */
    actionsArr.push([
        { action: ActionType.SWAP, item: 0,item2:A.length - 1},
    ]);
    heapSnapshots.push([...A]);
    /* END SWAP ANIMATION */
    A[0] = A[A.length - 1];
    A.pop();
    /* ACTUAL REMOVE */
    actionsArr.push([]);
    heapSnapshots.push([...A]);
    /* END ACTUAL REMOVE */
    maxHeapify(A, 0, A.length,actionsArr,heapSnapshots);
    return max;
}


export function heapMax(A: number[],actionsArr:Events[],heapSnapshots:HeapSnapshots ) {
    if (A.length < 1) {
        return ;
    }
    actionsArr.push([
        { action: ActionType.HIGHLIGHT_FULL, item: 0 },
    ]);
    heapSnapshots.push([...A]);
    actionsArr.push([
        { action: ActionType.NONE, item: 0 },
    ]);
    heapSnapshots.push([...A]);

}


export function maxHeapInsert(A: number[], key: number,actionsArr:Events[]): void {
    A.push(-Infinity);
    actionsArr.push([
        { action: ActionType.HIGHLIGHT_LIGHT, item: A.length - 1 },
    ]);
    heapIncreaseKey(A, A.length - 1, key,actionsArr);
}


export function heapIncreaseKey(A: number[], i: number, key: number,actionsArr:Events[]): void {
    if (key < A[i]) {
        throw new Error("New key is smaller than current key");
    }
    A[i] = key;
    actionsArr.push([
        { action: ActionType.HIGHLIGHT_FULL, item: i },
    ]);
    while (i > 0 && A[Math.floor((i - 1) / 2)] < A[i]) {
        const j = Math.floor((i - 1) / 2);
        actionsArr.push([
            { action: ActionType.HIGHLIGHT_LIGHT, item: j }
        ]);
        [A[i], A[j]] = [A[j], A[i]];
        actionsArr.push([
            { action: ActionType.SWAP, item: i,item2:j },
        ]);
        actionsArr.push([
            { action: ActionType.NONE, item: i },
            { action: ActionType.NONE, item: j }
        ]);
        i = Math.floor((i - 1) / 2);
        actionsArr.push([
            { action: ActionType.HIGHLIGHT_LIGHT, item: i },
        ]);
    }
}

// export function maxHeapSort(A: number[]): number[] {
//     buildMaxHeap(A);
//     let heapSize = A.length;
//     for (let i = A.length - 1; i > 0; i--) {
//         [A[0], A[i]] = [A[i], A[0]];
//         heapSize--;
//         maxHeapify(A, 0, heapSize);
//     }
//     return A;
// }
