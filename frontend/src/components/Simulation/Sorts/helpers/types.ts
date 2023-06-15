import { countingSortPayload } from "../../../../store/reducers/sorts/countingSortReducer";
import { quickSortPayload } from "../../../../store/reducers/sorts/quickSortReducer";
import { insertionSortPayload } from "../../../../store/reducers/sorts/insertionSortReducer";
import { mergeSortPayload } from "../../../../store/reducers/sorts/mergeSortReducer";
import { BucketSortPayload } from "../../../../store/reducers/sorts/bucketSortReducer";

export interface sortItem {
  value: number;
  key: number;
  isSelected: boolean;
  color: string;
  hide: boolean;
  digit?: number;
}

export type SortOperations =
  | quickSortOperation[]
  | countingSortOperation[]
  | insertionSortOperation[]
  | mergeSortOperation[]
  | BucketSortOperation[]
  | RadixSortOperation[]
  ;

export interface quickSortOperation {
  action: any;
  payload: quickSortPayload;
}

export interface insertionSortOperation {
  action: any;
  payload: insertionSortPayload;
}

export interface countingSortOperation {
  action: any;
  payload: countingSortPayload;
}

export interface mergeSortOperation {
  action: any;
  payload: mergeSortPayload;
}

export interface BucketSortOperation {
  action: any;
  payload: BucketSortPayload;
}

export interface RadixSortOperation {
  action: any;
  payload: any;
}

export enum Colors {
  BASE = "#84cc16",
  MARKED = "#ecfccb",
}
