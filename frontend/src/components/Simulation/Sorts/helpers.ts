import { sortItem } from "./types";

export enum ItemColor {
  BASE = "#84cc16",
  MARKED = "#ecfccb",
  PIVOT = "#FF6666",
  DONE = "#E0E0E0",
}

// An enum with all the types of actions to use in our reducer
export enum ActionKind {
  SET_DATA = "SET_DATA",
  MARK = "MARK",
  UNMARK = "UNMARK",
  SWAP = "SWAP",
  DONE = "DONE",
  MARK_PIVOT = "MARK_PIVOT",
  BASE = "BASE",
  BLANK = "BLANK",
  UPDATE_I = "UPDATE_I",
  UPDATE_J = "UPDATE_J",
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
    case ActionKind.SET_DATA: {
      const newData = payload.map((e, index) => {
        return {
          key: index,
          value: e,
          color: ItemColor.BASE,
          isSelected: false,
        };
      });
      return {
        data: newData,
      };
    }
    case ActionKind.MARK: {
      const newData = [...state.data];
      for (var index of payload) {
        newData[index] = markElem(newData[index]);
      }
      return {
        data: newData,
      };
    }
    case ActionKind.UNMARK: {
      const newData = [...state.data];
      for (var index1 of payload) newData[index1] = unMarkElem(newData[index1]);
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
    case ActionKind.BASE: {
      const newData = [...state.data];
      newData[payload[0]].color = ItemColor.BASE;
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
    color: elem.color === ItemColor.BASE ? ItemColor.MARKED : elem.color,
  };
  return newElem;
}

function unMarkElem(elem: sortItem) {
  let newElem: sortItem = {
    ...elem,
    isSelected: false,
    color: elem.color === ItemColor.MARKED ? ItemColor.BASE : elem.color,
  };
  return newElem;
}

export function getRandomNumsArr(size: number) {
  return [...Array(size)].map(() => Math.floor(Math.random() * 100));
}

export function getArrFromInput(maxSize: number, data: string) {
  var list = data.split(",");
  if (list.includes("")) return `Input must be numbers that sperated by comma`;
  if (list.length > maxSize) return `Max array size is ${maxSize}`;
  const newData: number[] = [];
  for (var item of list) {
    var num = Number(item);
    if (Number.isNaN(num)) return `${item} is not a number`;
    if (num > 9999) return `Max element length is 4 digits, ${item} is bigger`;
    newData.push(num);
  }
  return newData;
}
