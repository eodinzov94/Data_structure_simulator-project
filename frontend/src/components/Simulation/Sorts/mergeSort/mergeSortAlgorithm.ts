import { mergeSortOperation, sortItem } from "../helpers/types";

export function mergeSort(array: sortItem[]): mergeSortOperation[] {
    if (array.length <= 1 || array == null) {
      return [];
    }
    const opArr: mergeSortOperation[] = [];

    recursiveMergeSort(array, 0, array.length - 1, opArr);
    return opArr;
  }


  function recursiveMergeSort(array: sortItem[], left:number, right:number, opArr: mergeSortOperation[]){
    if (left < right){
        const mid = Math.floor((left + right) / 2)
        // add left and right nodes to the tree
        const L = array.slice(left,mid + 1)
        const R = array.slice(mid + 1,right + 1)
        recursiveMergeSort(L, left, mid, opArr)
        recursiveMergeSort(R, mid+1, right, opArr)
        merge(array, L, R, opArr)

    }

  }

  function merge(array: sortItem[], L:sortItem[], R:sortItem[], opArr: mergeSortOperation[]){



  }

