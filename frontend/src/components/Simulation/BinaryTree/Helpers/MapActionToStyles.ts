export enum ItemColor {
    BASE = "#f1dc70",
    HIGHLIGHT_FULL = "rgba(77,227,15,0.89)",
    HIGHLIGHT_LIGHT = "#a8ee8f",
}

// An enum with all the types of actions to use in our reducer
export enum ActionType {
    HIGHLIGHT_FULL = "HIGHLIGHT_FULL",
    HIGHLIGHT_LIGHT = "HIGHLIGHT_LIGHT",
    SWAP = "SWAP",
    DELETE = "DELETE",
    ADD = "BASE",
    NONE = "NONE"
}


// An interface for our actions
export type Events = { action: ActionType, item: number,item2?:number }[];


// An interface for our state
interface State {
    data: Events[];
}
export type HeapSnapshots = (number[])[];
//Our reducer function that uses a switch statement to handle our actions
export function addEvent(state: State, data: Events) {
    state.data.push(data);
    return state;
}