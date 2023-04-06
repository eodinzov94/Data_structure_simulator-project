import { Colors, sortItem } from "./types";

export function getRandomNumsArr(size: number, limit = 100) {
  return [...Array(size)].map(() => Math.floor(Math.random() * limit));
}

export function getArrFromInput(maxSize: number, data: string, max_num=9999) {
  var list = data.split(",");
  if (list.includes("")) return `Input must be numbers that sperated by comma`;
  if (list.length > maxSize) return `Max array size is ${maxSize}`;
  const newData: number[] = [];
  for (var item of list) {
    var num = Number(item);
    if (Number.isNaN(num)) return `${item} is not a number`;
    if (num > max_num) return `Max element length is ${max_num}, ${item} is bigger`;
    newData.push(num);
  }
  return newData;
}

export function compare(o1: sortItem, o2: sortItem): number {
  if (o1.value < o2.value) {
    return -1;
  } else if (o1.value === o2.value) {
    return 0;
  }
  return 1;
}

export function numbersToSortItems(arr:number[]){
  return arr.map((e, index) => (
    {
      key: index,
      value: e,
      color: Colors.BASE,
      isSelected: false,
    }
  ));
}
