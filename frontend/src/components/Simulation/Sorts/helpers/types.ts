import { countingSortPayload } from "../../../../store/reducers/sorts/countingSortReducer";
import { quickSortPayload } from "../../../../store/reducers/sorts/quickSortReducer";
import { insertionSortPayload } from "../../../../store/reducers/sorts/insertionSortReducer";
import { mergeSortPayload } from "../../../../store/reducers/sorts/mergeSortReducer";

export interface sortItem {
  value: number;
  key: number;
  isSelected: boolean;
  color: string;
  hide: boolean;
}

export type SortOperations =
  | quickSortOperation[]
  | countingSortOperation[]
  | insertionSortOperation[]
  | mergeSortOperation[];

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

export enum Colors {
  BASE = "#84cc16",
  MARKED = "#ecfccb",
}
