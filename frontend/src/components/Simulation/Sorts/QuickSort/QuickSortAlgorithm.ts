import { sortItem, SortOperation } from "../types";
import { ActionKind } from "../helpers";


function compare(o1: sortItem, o2: sortItem): number{
  if(o1.value < o2.value){
    return -1;
  }else if(o1.value === o2.value){
    return 0;
  }
  return 1;
}

export function quickSort(array: sortItem[]):SortOperation[]{
  if(array.length <= 1 || array == null){
    return [];
  }
  const opArr:SortOperation[] = [];
  sort(array, 0, array.length-1,opArr);
  return opArr
}

function sort(array: sortItem[], low: number, high: number,opArr:SortOperation[]) {
  if (low < high){
    const partIndex = partition(array, low, high,opArr);
    sort(array,  low, partIndex-1,opArr);
    sort(array, partIndex+1, high,opArr);   
  }
  else if(low === high)
  {
    opArr.push({action:ActionKind.DONE,index1:low,pivot:false}) // DONE 
  }
}

function partition(array: sortItem[], low: number, high: number, opArr:SortOperation[]): number{
  const pivot:sortItem = array[high];
  let pivotIndex:number = high
  opArr.push({action:ActionKind.MARK_PIVOT,index1:high})  //MARK PIVOT
  let i:number = low - 1;
  for(let j = low; j<=high-1; j++){
    opArr.push({action:ActionKind.MARK,index1:high,index2:j}) //CMP J Piv
    if(compare(array[j], pivot) === -1){
      i = i + 1;
      opArr.push({action:ActionKind.MARK,index1:i})// MARK I  -- CHANGE LATER 
      swap(array, i, j)
      opArr.push({action:ActionKind.SWAP,index1:i,index2:j})// SWAP I J
      opArr.push({action:ActionKind.UNMARK,index1:i,index2:j})// UNMARK 
    }
    else{
      opArr.push({action:ActionKind.UNMARK,index1:j})// UNMARK 
    }
  }
  opArr.push({action:ActionKind.MARK,index1:high,index2:i+1}) //CMP i+1 Piv
  if(compare(array[high], array[i+1]) === -1){
    opArr.push({action:ActionKind.SWAP,index1:high,index2:i+1})//SWAP I+1 Piv
    swap(array, i+1, high);
    pivotIndex = i+1
  }
  opArr.push({action:ActionKind.UNMARK,index1:high,index2:i+1}) //UNMARK i+1 Piv
  opArr.push({action:ActionKind.DONE,index1:pivotIndex}) // DONE PIV
  return i+1;  
}

function swap(array: sortItem[], i: number, j:number){
  const newJ: sortItem = array[i];
  array[i] = array[j];
  array[j] = newJ;
}
