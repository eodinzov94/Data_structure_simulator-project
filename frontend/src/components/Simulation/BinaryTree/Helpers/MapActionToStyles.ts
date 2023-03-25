export enum ItemColor {
    BASE = "#f1dc70",
    HIGHLIGHT_FULL = "rgba(77,227,15,0.89)",
    HIGHLIGHT_LIGHT = "#a8ee8f",
}

// An enum with all the types of actions to use in our reducer
export enum ActionType {
    HIGHLIGHT_FULL = "MARK",
    HIGHLIGHT_LIGHT = "UNMARK",
    SWAP = "SWAP",
    DELETE = "DONE",
    ADD = "BASE",
}


// An interface for our actions
type events = [{ action: ActionType, item: number }];


// An interface for our state
interface State {
    data: events[];
}

//Our reducer function that uses a switch statement to handle our actions
export function addEvent(state: State, data: events) {
    state.data.push(data);
    return state;
}