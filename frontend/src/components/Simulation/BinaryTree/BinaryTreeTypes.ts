
export enum ActionType {
    HIGHLIGHT_FULL = "HIGHLIGHT_FULL",
    HIGHLIGHT_LIGHT = "HIGHLIGHT_LIGHT",
    SWAP = "SWAP",
    ADD = "ADD",
    NONE = "NONE",
    CHANGE = "CHANGE"
}

export type Events = { action: ActionType, item: number,item2?:number }[];


export type HeapSnapshots = (number[])[];
export interface TreeNode {
    value: number;
    id: number;
    left?: TreeNode;
    right?: TreeNode;
}