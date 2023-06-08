import { RadixSortOperation, sortItem } from "../helpers/types";
import { radixSortActions as actions } from "../../../../store/reducers/sorts/radixSortReducer";

export function radixSort(array: sortItem[]) {
  if (array.length <= 1 || array == null) {
    return [];
  }
  const numOfDigits = 3;
  const opArr: RadixSortOperation[] = [];

  for (let i = 0; i < numOfDigits; i++) {
    opArr.push({
      action: actions.setSortData,
      payload: i,
    });
    opArr.push({
      action: actions.sort,
      payload: undefined,
    });
    opArr.push({
      action: actions.setSortData,
      payload: -1,
    });
  }

  return opArr;
}
