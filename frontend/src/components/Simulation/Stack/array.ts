export function removeItem<T>(arr: T[]) {
  const len = arr.length
  if (len>0) arr.splice(0, 1);
}
