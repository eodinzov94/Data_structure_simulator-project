
export enum ActionType {
    HIGHLIGHT_FULL = "HIGHLIGHT_FULL",
    HIGHLIGHT_LIGHT = "HIGHLIGHT_LIGHT",
    SWAP = "SWAP",
    DELETE = "DELETE",
    ADD = "BASE",
    NONE = "NONE"
}

export type Events = { action: ActionType, item: number,item2?:number }[];


export type HeapSnapshots = (number[])[];
export interface TreeNode {
    value: number;
    id: number;
    left?: TreeNode;
    right?: TreeNode;
}