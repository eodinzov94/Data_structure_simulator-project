import { AnimationPayload, insertionSortActionKind } from "./InsertionSort/InsertionSortReducer";
import { QuickSortActionKind } from "./QuickSort/QuickSortReducer";

export interface sortItem {
    value: number;
    key: number;
    isSelected: boolean;
    color: string;
  }
  

export interface QuickSortOperation{
  action: QuickSortActionKind;
  index1: number;
  index2?: number;
  pivot?:boolean;
  line:number;
}

export interface insertionSortOperation{
  action: insertionSortActionKind;
  payload: AnimationPayload;
}