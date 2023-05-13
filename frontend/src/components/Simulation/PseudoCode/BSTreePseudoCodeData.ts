import { PseudoItem } from "./pc-helpers"

export type BSTAlgNames = keyof typeof BSTPseudoCode
export const BSTPseudoCode = {
    Search: [
        {text: "𝑺𝒆𝒂𝒓𝒄𝒉 (𝒙,𝒌)", tabAmount: 0},
        {text: "if 𝑥 = 𝑁𝑈𝐿𝐿 or 𝑘 = 𝑥.key", tabAmount: 1},
        {text: "return 𝑥", tabAmount: 2},
        {text: "if 𝑘 < 𝑥.key", tabAmount: 1},
        {text: "return 𝑺𝒆𝒂𝒓𝒄𝒉(𝑥.𝑙𝑒𝑓𝑡,𝑘)", tabAmount: 2},
        {text: "else return 𝑺𝒆𝒂𝒓𝒄𝒉(𝑥.𝑟𝑖𝑔ℎ𝑡,𝑘)", tabAmount: 1},
    ] as PseudoItem[],
    Insert: [
        {text: "𝑰𝒏𝒔𝒆𝒓𝒕(𝑻,𝒛)", tabAmount: 0},
        {text: "𝑦 ← 𝑵𝑼𝑳𝑳", tabAmount: 1},
        {text: "𝑥 ← 𝑇.root", tabAmount: 1},
        {text: "while (𝑥 ≠ 𝑵𝑼𝑳𝑳)", tabAmount: 1},
        {text: "𝑦 ← 𝑥", tabAmount: 2},
        {text: "if(z.key < 𝑥.key)", tabAmount: 2},
        {text: "𝑥 ← 𝑥.left", tabAmount: 3},
        {text: "else 𝑥 ← 𝑥.right", tabAmount: 2},
        {text: "z.p ← y", tabAmount: 1},
        {text: "if(y = 𝑵𝑼𝑳𝑳) //T was empty", tabAmount: 1},
        {text: "T.root ← z", tabAmount: 2},
        {text: "elseif(z.key < y.key)", tabAmount: 1},
        {text: "y.left ← z", tabAmount: 2},
        {text: "else y.right ← z", tabAmount: 1},
    ] as PseudoItem[],
    Delete: [

    ] as PseudoItem[],
    Min: [
        {text: "𝑴𝒊𝒏(𝒙)", tabAmount: 0},
        {text: "while 𝑥.𝑙𝑒𝑓𝑡 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1},
        {text: "𝑥 ← 𝑥.𝑙𝑒𝑓𝑡", tabAmount: 2},
        {text: "return 𝑥", tabAmount: 1},
    ] as PseudoItem[],
    Max: [
        {text: "𝑴𝒂𝒙(𝒙)", tabAmount: 0},
        {text: "while 𝑥.𝑟𝑖𝑔ℎ ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1},
        {text: "𝑥 ← 𝑥.𝑟𝑖𝑔ℎ", tabAmount: 2},
        {text: "return 𝑥", tabAmount: 1},
    ] as PseudoItem[],
    Successor: [
        {text: "𝑺𝒖𝒄𝒄𝒆𝒔𝒔𝒐𝒓(𝒙)", tabAmount: 0},
        {text: "if 𝑥.𝑟𝑖𝑔ℎ𝑡 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1},
        {text: "return 𝑀𝑖𝑛(𝑥.𝑟𝑖𝑔ℎ𝑡)", tabAmount: 2},
        {text: "𝑦 ← 𝑥.𝑝𝑎𝑟𝑒𝑛𝑡", tabAmount: 1},
        {text: "while y ≠ 𝑁𝑈𝐿𝐿 𝒂𝒏𝒅 𝑥 = 𝑦.𝑟𝑖𝑔ℎ𝑡", tabAmount: 1},
        {text: "𝑥 ← 𝑦", tabAmount: 2},
        {text: "𝑦 ← 𝑦.𝑝𝑎𝑟𝑒𝑛𝑡", tabAmount: 2},
        {text: "return 𝑦", tabAmount: 1},
    ] as PseudoItem[],
    Predecessor: [
        {text: "𝑺𝒖𝒄𝒄𝒆𝒔𝒔𝒐𝒓(𝒙)", tabAmount: 0},
        {text: "if 𝑥.𝑟𝑖𝑔ℎ𝑡 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1},
        {text: "return Max(𝑥.𝑙𝑒𝑓𝑡)", tabAmount: 2},
        {text: "𝑦 ← 𝑥.𝑝𝑎𝑟𝑒𝑛𝑡", tabAmount: 1},
        {text: "while y ≠ 𝑁𝑈𝐿𝐿 𝒂𝒏𝒅 𝑥 = 𝑦.𝑙𝑒𝑓𝑡", tabAmount: 1},
        {text: "𝑥 ← 𝑦", tabAmount: 2},
        {text: "𝑦 ← 𝑦.𝑝𝑎𝑟𝑒𝑛𝑡", tabAmount: 2},
        {text: "return 𝑦", tabAmount: 1},
    ] as PseudoItem[]
}
export const BSTPseudoCodeList = {
    Search: [
        'Search'
    ]  as BSTAlgNames[],
    Insert: [
        'Insert'
    ] as BSTAlgNames[],
    Delete: [
        'Delete'
    ] as BSTAlgNames[],
    Min: [
        'Min'
    ] as BSTAlgNames[],
    Max: [
        'Max'
    ]as BSTAlgNames[],
    Successor: [
        'Successor','Min'
    ] as BSTAlgNames[],
    Predecessor: [
        'Predecessor','Max'
    ] as BSTAlgNames[]
}
export type BSTPseudoCodeKeys  =  keyof typeof BSTPseudoCodeList

