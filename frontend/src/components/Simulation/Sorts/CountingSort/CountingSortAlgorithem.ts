import { Colors, countingSortOperation, sortItem } from "../helpers/types";
import {
  init,
  setIndex,
  setColor,
  setLine,
  setValue,
} from "../../../../store/reducers/sorts/countingSortReducer";
export function CountingSort(arr: sortItem[], k: number) {
  const opArr: countingSortOperation[] = [];

  const A = arr.map((e) => e.value);

  const B = Array(arr.length).fill(0);
  opArr.push({
    action: init,
    payload: { data: [...B], arr_name: "B", line: 0 },
  });

  const C = Array(k + 1).fill(0);
  opArr.push({
    action: init,
    payload: { data: [...C], arr_name: "C", line: 1 },
  });

  let index, i, value;
  for (i = 0; i < A.length; i++) {
    opArr.push({
      action: setIndex,
      payload: { index: i, arr_name: "A", line: 2 },
    });

    index = A[i];
    opArr.push({
      action: setColor,
      payload: {
        items: [{ index: i, arr_name: "A" }],
        val: Colors.MARKED,
        line: 3,
      },
    });

    C[index] = C[index] + 1;
    opArr.push({
      action: setColor,
      payload: {
        items: [{ index, arr_name: "C" }],
        val: Colors.MARKED,
        line: 4,
      },
    });

    opArr.push({
      action: setValue,
      payload: { index, arr_name: "C", value: C[index] },
    });
    opArr.push({
      action: setColor,
      payload: {
        items: [
          { index, arr_name: "C" },
          { index: i, arr_name: "A" },
        ],
        val: Colors.BASE,
        line: 4,
      },
    });
  }
  opArr.push({
    action: setIndex,
    payload: { index: i, arr_name: "A", line: 2 },
  });

  for (i = 1; i <= k; i++) {
    opArr.push({
      action: setIndex,
      payload: { index: i, arr_name: "C", line: 6 },
    });

    opArr.push({
      action: setColor,
      payload: {
        items: [
          { index: i, arr_name: "C" },
          { index: i - 1, arr_name: "C" },
        ],
        val: Colors.MARKED,
        line: 7,
      },
    });

    C[i] = C[i] + C[i - 1];
    opArr.push({
      action: setValue,
      payload: { index: i, arr_name: "C", value: C[i] },
    });

    opArr.push({
      action: setColor,
      payload: {
        items: [
          { index: i, arr_name: "C" },
          { index: i - 1, arr_name: "C" },
        ],
        val: Colors.BASE,
        line: 7,
      },
    });
  }
  opArr.push({
    action: setIndex,
    payload: { index: i, arr_name: "C", line: 6 },
  });

  for (i = A.length - 1; i >= 0; i--) {
    opArr.push({
      action: setIndex,
      payload: { index: i, arr_name: "A", line: 9 },
    });

    opArr.push({
      action: setColor,
      payload: {
        items: [{ index: i, arr_name: "A" }],
        val: Colors.MARKED,
        line: 10,
      },
    });

    value = A[i];

    opArr.push({
      action: setColor,
      payload: {
        items: [{ index: value, arr_name: "C" }],
        val: Colors.MARKED,
        line: 11,
      },
    });
    C[value]--;
    opArr.push({
      action: setValue,
      payload: { index: value, arr_name: "C", value: C[value] },
    });

    opArr.push({
      action: setLine,
      payload: 12,
    });
    index = C[value];

    opArr.push({
      action: setColor,
      payload: {
        items: [{ index, arr_name: "B" }],
        val: Colors.MARKED,
        line: 13,
      },
    });
    B[index] = value;
    opArr.push({ action: setValue, payload: { index, arr_name: "B", value } });

    opArr.push({
      action: setColor,
      payload: {
        items: [
          { index: i, arr_name: "A" },
          { index, arr_name: "B" },
          { index: value, arr_name: "C" },
        ],
        val: Colors.BASE,
        line: 13,
      },
    });
  }
  opArr.push({
    action: setIndex,
    payload: { index: i, arr_name: "A", line: 9 },
  });

  opArr.push({
    action: setLine,
    payload: -1,
  });
  return opArr;
}
