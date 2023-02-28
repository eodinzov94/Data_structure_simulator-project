import { sortItem } from "../types";

export enum ItemColor {
  BASE = "#84cc16",
  MARKED = "#ffffff",
  PIVOT = "#FF6666",
  DONE = "#E0E0E0",
}

// An enum with all the types of actions to use in our reducer
export enum ActionKind {
  MARK = "MARK",
  UNMARK = "UNMARK",
  SWAP = "SWAP",
  DONE = "DONE",
  MARK_PIVOT = "MARK_PIVOT"
}

// An interface for our actions
interface Action {
  type: ActionKind;
  payload: number[];
}

// An interface for our state
interface State {
  data: sortItem[];
}

// Our reducer function that uses a switch statement to handle our actions
export function quickSortReducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.MARK: {
      const newData = [...state.data];
      var index1 = payload[0],
        index2 = payload[1];
      newData[index1] = markElem(newData[index1]);
      newData[index2] = markElem(newData[index2]);
      return {
        data: newData,
      };
    }
    case ActionKind.UNMARK: {
      const newData = [...state.data];
      var index1 = payload[0],
        index2 = payload[1];
      newData[index1] = unMarkElem(newData[index1]);
      newData[index2] = unMarkElem(newData[index2]);
      return {
        data: newData,
      };
    }
    case ActionKind.SWAP: {
      const newData = [...state.data];
      const i = payload[0],
        j = payload[1];
      let x = newData[i];
      newData[i] = newData[j];
      newData[j] = x;
      return {
        data: newData,
      };
    }
    case ActionKind.DONE: {
      const newData = [...state.data];
      newData[payload[0]].color = ItemColor.DONE;
      return {
        data: newData,
      };
    }
    case ActionKind.MARK_PIVOT: {
      const newData = [...state.data];
      newData[payload[0]].color = ItemColor.PIVOT;
      return {
        data: newData,
      };
    }

    default:
      return state;
  }
}

function markElem(elem: sortItem) {
  let newElem: sortItem = {
    ...elem,
    isSelected: true,
    color: elem.color == ItemColor.BASE ? ItemColor.MARKED : elem.color,
  };
  return newElem;
}

function unMarkElem(elem: sortItem) {
  let newElem: sortItem = {
    ...elem,
    isSelected: false,
    color: elem.color == ItemColor.MARKED ? ItemColor.BASE : elem.color,
  };
  return newElem;
}
