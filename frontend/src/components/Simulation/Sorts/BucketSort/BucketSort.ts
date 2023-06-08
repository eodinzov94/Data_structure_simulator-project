import { Bucket } from "../../../../store/reducers/sorts/bucketSortReducer";
import { BucketSortOperation, sortItem } from "../helpers/types";
import { bucketSortActions as actions } from "../../../../store/reducers/sorts/bucketSortReducer";

const K = 4;
const BucketMaxValue = 20;
const gap = BucketMaxValue/4;

export const BucketSort = (array: sortItem[]) => {
  if (array.length <= 0 || array == null) {
    return [];
  }
  const buckets: Bucket[] = [] as Bucket[];
  const opArr: BucketSortOperation[] = [];
  const M = 1 + BucketMaxValue;
  let bucketNum = 0,
    index = 0;

  opArr.push({ action: actions.setLine, payload: 2 });
  let start = 0,end = gap;
  for (let i = 0; i < K; i++) {
    let bucket: Bucket = { title: `Bucket\n(${start}-${end})`, data: [], index: i };
    start == 0 ? start+=1 : start=start;
    start+=gap;
    end+=gap
    buckets.push(bucket);
  }
  opArr.push({
    action: actions.setBuckets,
    payload: { line: 3, payload: buckets },
  });

  opArr.push({ action: actions.setLine, payload: 4 });
  opArr.push({ action: actions.setLine, payload: 5 });
  for (let item of array) {
    bucketNum = Math.floor((K * item.value) / M);
    //Mark the current bucket
    opArr.push({
      action: actions.setBucketIndex,
      payload: { line: 6, payload: bucketNum },
    });
    //Pop the first elem from arr to the current bucket
    opArr.push({
      action: actions.pushToBucket,
      payload: { line: 7, payload: bucketNum },
    });
    //remove the elem from the arr
    opArr.push({
      action: actions.removeFromStart,
      payload: 8,
    });
    opArr.push({ action: actions.setLine, payload: 5 });
  }
  array = [] as sortItem[];
  opArr.push({
    action: actions.setBucketIndex,
    payload: { line: 10, payload: 0 },
  });

  for (let index = 0; index < buckets.length; index++) {
    opArr.push({
      action: actions.sortBucket,
      payload: { line: 11, payload: index },
    });
    opArr.push({
      action: actions.setBucketIndex,
      payload: { line: 10, payload: index + 1 },
    });
  }
  opArr.push({
    action: actions.setBucketIndex,
    payload: { line: 13, payload: 0 },
  });

  for (let index = 0; index < buckets.length; index++) {
    opArr.push({
      action: actions.markBucket,
      payload: { line: 14, payload: index },
    });
    opArr.push({
      action: actions.pushData,
      payload: { line: 14, payload: index },
    });
    opArr.push({
      action: actions.setBucketIndex,
      payload: { line: 13, payload: index + 1 },
    });
  }
  opArr.push({
    action: actions.setBucketIndex,
    payload: { line: -1, payload: -1 },
  });

  return opArr;
};
