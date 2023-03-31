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