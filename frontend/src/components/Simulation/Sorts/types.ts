import { ActionKind } from "./helpers";

export interface sortItem {
    value: number;
    key: number;
    isSelected: boolean;
    color: string;
  }
  

export interface SortOperation{
  action: ActionKind;
  index1: number;
  index2?: number;
  pivot?:boolean;
  line:number;
}