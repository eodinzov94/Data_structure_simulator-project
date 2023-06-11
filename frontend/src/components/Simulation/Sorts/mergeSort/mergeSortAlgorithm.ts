import { mergeSortOperation, sortItem } from "../helpers/types";
import { mergeSortActions as actions } from "../../../../store/reducers/sorts/mergeSortReducer";
import { SortItemsToNumbers } from "../helpers/functions";

export function mergeSort(array: sortItem[]): mergeSortOperation[] {
  if (array.length <= 1 || array == null) {
    return [];
  }
  const opArr: mergeSortOperation[] = [];
  const numbers= SortItemsToNumbers(array);
  recursiveMergeSort(numbers, 0, array.length - 1, opArr, 1);
  return opArr;
}

function recursiveMergeSort(
  array: number[],
  left: number,
  right: number,
  opArr: mergeSortOperation[],
  index: number
) {

  opArr.push({
    action: actions.setLine,
    payload: 1
  });
  if (left < right) {
    opArr.push({
      action: actions.setLine,
      payload: 2
    });
    const mid = Math.floor((left + right) / 2);
    // add left and right nodes to the tree
    const L = array.slice(left, mid + 1);
    const R = array.slice(mid + 1, right + 1);
    const rightIndex = index * 2 + 1;
    const leftIndex = index * 2;


    opArr.push({
      action: actions.addNode,
      payload: {
        data: L,
        nodeIndex: leftIndex,
        line: 3,
      },
    });
    recursiveMergeSort(array, left, mid, opArr, leftIndex);

    opArr.push({
      action: actions.addNode,
      payload: {
        data: 
        R,
        nodeIndex: rightIndex,
        line: 4,
      },
    });
    recursiveMergeSort(array, mid + 1, right, opArr, rightIndex);
    opArr.push({
      action: actions.setLine,
      payload: 5
    });
    merge(array, left, right, mid, opArr, leftIndex, rightIndex, index);
  }
}

function merge(
  array: number[],
  left: number,
  right: number,
  mid: number,
  opArr: mergeSortOperation[],
  leftNodeIndex: number,
  rightNodeIndex: number,
  parent: number
) {


  const L = array.slice(left, mid + 1);
  opArr.push({
    action: actions.markNode,
    payload: {
      line:9,
      nodeIndex:leftNodeIndex
    }
  });
  const R = array.slice(mid + 1, right + 1);
  opArr.push({
    action: actions.markNode,
    payload: {
      line:10,
      nodeIndex:rightNodeIndex
    }
  });

  opArr.push({
    action: actions.initNodeData,
    payload: parent
  });

  var i = 0,
    j = 0,
    k = 0;
  while (i < L.length && j < R.length) {
    if (L[i] <= R[j]) {
      array[left+k] = L[i];
      opArr.push({
        action: actions.changeValue,
        payload: {
          index: k,
          nodeIndex: parent,
          line: 14,
          value: L[i],
        },
      });
      i++;
    } else {
      array[left+k] = R[j];
      opArr.push({
        action: actions.changeValue,
        payload: {
          index: k,
          nodeIndex: parent,
          line: 17,
          value: R[j],
        },
      });
      j++;
    }
    k++;
  }

  while (i < L.length) {
    array[left+k] = L[i];
    opArr.push({
      action: actions.changeValue,
      payload: {
        index: k,
        nodeIndex: parent,
        line: 21,
        value: L[i],
      },
    });
    i++;
    k++;
  }
  while (j < R.length) {
    array[left+k] = R[j];
    opArr.push({
      action: actions.changeValue,
      payload: {
        index: k,
        nodeIndex: parent,
        line: 25,
        value: R[j],
      },
    });
    j++;
    k++;
  }
  opArr.push({
    action: actions.deleteNodes,
    payload: [rightNodeIndex,leftNodeIndex]
  });
}
