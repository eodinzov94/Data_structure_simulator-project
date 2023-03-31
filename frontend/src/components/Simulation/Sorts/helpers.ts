import { sortItem } from "./types";



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


export function compare(o1: sortItem, o2: sortItem): number {
  if (o1.value < o2.value) {
    return -1;
  } else if (o1.value === o2.value) {
    return 0;
  }
  return 1;
}