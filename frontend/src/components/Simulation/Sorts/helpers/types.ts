import { countingSortPayload } from "../../../../store/reducers/countingSortReducer";
import {
  AnimationPayload,
  insertionSortActionKind,
} from "../InsertionSort/InsertionSortReducer";
import { quickSortPayload } from "../../../../store/reducers/quickSortReducer";

export interface sortItem {
  value: number;
  key: number;
  isSelected: boolean;
  color: string;
}

export interface quickSortOperation {
  action: any;
  payload: quickSortPayload;
}

export interface insertionSortOperation {
  action: insertionSortActionKind;
  payload: AnimationPayload;
}

export interface countingSortOperation {
  action: any;
  payload: countingSortPayload;
}

export enum Colors {
  BASE = "#84cc16",
  MARKED = "#ecfccb",
}
