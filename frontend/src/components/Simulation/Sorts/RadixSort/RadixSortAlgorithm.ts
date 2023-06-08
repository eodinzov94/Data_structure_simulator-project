import { RadixSortOperation, sortItem } from "../helpers/types";
import { radixSortActions as actions } from "../../../../store/reducers/sorts/radixSortReducer";

export function radixSort(array: sortItem[]) {
  if (array.length <= 1 || array == null) {
    return [];
  }

  const opArr: RadixSortOperation[] = [];

  return opArr;
}
