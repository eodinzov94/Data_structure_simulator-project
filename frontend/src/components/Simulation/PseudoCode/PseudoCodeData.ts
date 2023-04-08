import { PseudoItem } from "./PseudoCode";

export const QuickSortPseudoCode: PseudoItem[] = [
  { text: "Quicksort (𝐴, 𝑝, 𝑟 ):", tabAmount: 0 },
  { text: "if (𝑝 < 𝑟):", tabAmount: 1 },
  { text: "𝑞 = partition (𝐴, 𝑝, 𝑟 )", tabAmount: 2 },
  { text: "Quicksort (𝐴, 𝑝, 𝑞 − 1)", tabAmount: 2 },
  { text: "Quicksort (𝐴, 𝑞 + 1, 𝑟 )", tabAmount: 2 },
  { text: "", tabAmount: 1 },
  { text: "", tabAmount: 1 },
  { text: "Partition(𝐴, 𝑝, 𝑟 ):", tabAmount: 0 },
  { text: "𝑖 = 𝑝 − 1", tabAmount: 1 },
  { text: "for (𝑗 = 𝑝 to 𝑟 − 1)", tabAmount: 1 },
  { text: "if (𝐴[𝑗] ≤ 𝐴[𝑟]):", tabAmount: 2 },
  { text: "𝑖 = 𝑖 + 1", tabAmount: 3 },
  { text: "exchange 𝐴[𝑖] with 𝐴[ 𝑗]", tabAmount: 3 },
  { text: "exchange 𝐴[𝑖 + 1] with 𝐴[𝑟]", tabAmount: 1 },
  { text: "return 𝑖 + 1", tabAmount: 1 },
];

export const InsertionSortPseudoCode: PseudoItem[] = [
  { text: "InsertionSort (int[ ] arr):", tabAmount: 0 },
  { text: "for (i=1; i<arr.length; i++):", tabAmount: 1 },
  { text: "key = arr[i]", tabAmount: 2 },
  { text: "j = i-1", tabAmount: 2 },
  { text: "while (j>=0 and arr[j]>key):", tabAmount: 2 },
  { text: "arr[j+1] = arr[j]", tabAmount: 3 },
  { text: "j = j-1", tabAmount: 3 },
  { text: "arr[j+1] = key", tabAmount: 2 },
];

export const CountingSortPseudoCode: PseudoItem[] = [
  { text: "CountingSort (A, B, K):", tabAmount: 0 },
  { text: "C = Array of K zeros", tabAmount: 1 },
  { text: "for (i=0; i<A.length; i++):", tabAmount: 1 },
  { text: "index = A[i]", tabAmount: 2 },
  { text: "C[index] = C[index] + 1", tabAmount: 2 },
  { text: "", tabAmount: 1 },
  { text: "for (i=1; i<=K; i++):", tabAmount: 1 },
  { text: "C[i] = C[i] + C[i-1]", tabAmount: 2 },
  { text: "", tabAmount: 1 },
  { text: "for (i=A.length-1; i>=0; i--):", tabAmount: 1 },
  { text: "value = A[i]", tabAmount: 2 },
  { text: "C[value]--", tabAmount: 2 },
  { text: "index = C[value]", tabAmount: 2 },
  { text: "B[index] = value", tabAmount: 2 },
];
