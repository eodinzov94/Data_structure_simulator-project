import { compare } from "../helpers/functions";
import { insertionSortOperation, sortItem } from "../helpers/types";
import { insertionSortActionKind as ActionKind } from "./InsertionSortReducer";

export function insertionSort(array: sortItem[]) {
  if (array.length <= 1 || array == null) {
    return [];
  }

  const opArr: insertionSortOperation[] = [];

  let key: sortItem, j;
  opArr.push({ action: ActionKind.UPDATE_I, payload: { index1: 1, line: 1 } });
  for (let i = 1; i < array.length; i++) {
    key = array[i];
    opArr.push({
      action: ActionKind.SET_KEY,
      payload: { index1: key.value, line: 2 },
    });

    j = i - 1;
    opArr.push({
      action: ActionKind.UPDATE_J,
      payload: { index1: j, line: 3 },
    });

    opArr.push({
      action: ActionKind.UPDATE_LINE,
      payload: { index1: -1, line: 4 },
    });
    while (j >= 0 && compare(array[j], key) === 1) {
      array[j + 1] = array[j];
      opArr.push({
        action: ActionKind.CHANGE_ELEMENT,
        payload: { index1: j + 1, index2: array[j].value, line: 5 },
      });
      opArr.push({
        action: ActionKind.UNMARK,
        payload: { index1: j + 1, line: 5 },
      });

      j--;
      opArr.push({
        action: ActionKind.UPDATE_J,
        payload: { index1: j, line: 6 },
      });
      opArr.push({
        action: ActionKind.UPDATE_LINE,
        payload: { index1: -1, line: 4 },
      });
    }
    opArr.push({
      action: ActionKind.UPDATE_LINE,
      payload: { index1: -1, line: 4 },
    });

    array[j + 1] = key;
    opArr.push({
      action: ActionKind.CHANGE_ELEMENT,
      payload: { index1: j + 1, index2: key.value, line: 7 },
    });
    opArr.push({
      action: ActionKind.UNMARK,
      payload: { index1: j + 1, line: 7 },
    });

    // i++ of for loop
    opArr.push({
      action: ActionKind.UPDATE_I,
      payload: { index1: i + 1, line: 1 },
    });
  }
  opArr.push({
    action: ActionKind.DONE,
    payload: { index1: -2, index2: -2, line: -1 },
  });
  return opArr;
}
