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
        {text: "𝑰𝒏𝒔𝒆𝒓𝒕(𝑻,𝒛)", tabAmount: 0}, //0
        {text: "𝑦 ← 𝑵𝑼𝑳𝑳", tabAmount: 1},//1
        {text: "𝑥 ← 𝑇.root", tabAmount: 1},//2
        {text: "while (𝑥 ≠ 𝑵𝑼𝑳𝑳)", tabAmount: 1},//3
        {text: "𝑦 ← 𝑥", tabAmount: 2},//4
        {text: "if(z.key < 𝑥.key)", tabAmount: 2},//5
        {text: "𝑥 ← 𝑥.left", tabAmount: 3},//6
        {text: "else 𝑥 ← 𝑥.right", tabAmount: 2},//7
        {text: "z.p ← y", tabAmount: 1},//8
        {text: "if(y = 𝑵𝑼𝑳𝑳) //T was empty", tabAmount: 1},//9
        {text: "T.root ← z", tabAmount: 2},        //10
        {text: "elseif(z.key < y.key)", tabAmount: 1}, //11
        {text: "y.left ← z", tabAmount: 2},            //12
        {text: "else y.right ← z", tabAmount: 1},   //13
    ] as PseudoItem[],
    // Delete: [
    //     {text: "Delete(𝑻,𝒛)", tabAmount: 0},
    //     {text: "if(z.left = null or z.right = null)", tabAmount: 1},
    //     {text: "𝑦 ← z", tabAmount: 2},
    //     {text: "else y ← successor(z)", tabAmount: 1},
    //     {text: "if(y.left ≠ 𝑵𝑼𝑳𝑳)", tabAmount: 1},
    //     {text: "x ← y.left", tabAmount: 2},
    //     {text: "else x ← y.right", tabAmount: 1},
    //     {text: "if(x ≠ 𝑵𝑼𝑳𝑳)", tabAmount: 1},
    //     {text: "x.parent ← y.parent", tabAmount: 2},
    //     {text: "if(y.parent = 𝑵𝑼𝑳𝑳)", tabAmount: 1},
    //     {text: "T.root ← x", tabAmount: 2},
    //     {text: "elseif(y = y.parent.left)", tabAmount: 1},
    //     {text: "y.parent.left ← x", tabAmount: 2},
    //     {text: "else y.parent.right ← x", tabAmount: 1},
    //     {text: "if(y ≠ z)", tabAmount: 1},
    //     {text: "z.key ← y.key and copy y’s satellite data into z", tabAmount: 2},
    // ] as PseudoItem[],
    Delete: [
        {text: "Delete(𝑻,key)", tabAmount: 0},
        {text: "if(T.root == null)", tabAmount: 1},
        {text: "return T.root", tabAmount: 2},
        {text: "if(key < T.root.value)", tabAmount: 1},
        {text: "T.root.left ← Delete(𝑻.root.left,key)", tabAmount: 2},
        {text: "elseif(key > T.root.value)", tabAmount: 1},
        {text: "T.root.right ← Delete(𝑻.root.right,key)", tabAmount: 2},
        {text: "else", tabAmount: 1},
        {text: "if(T.root.left == null)", tabAmount: 2},
        {text: "return T.root.right", tabAmount: 3},
        {text: "elseif(T.root.right == null)", tabAmount: 2},
        {text: "return T.root.left", tabAmount: 3},
        {text: "minNode ← getMin(T.root.right)", tabAmount: 2},
        {text: "T.root.value ← minNode.value", tabAmount: 2},
        {text: "T.root.right ← Delete(𝑻.root.right,minNode.value)", tabAmount: 2},
        {text: "return T.root", tabAmount: 1},
    ] as PseudoItem[],
    Min: [
        {text: "𝑴𝒊𝒏(𝒙)", tabAmount: 0},
        {text: "while 𝑥.𝑙𝑒𝑓𝑡 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1},
        {text: "𝑥 ← 𝑥.𝑙𝑒𝑓𝑡", tabAmount: 2},
        {text: "return 𝑥", tabAmount: 1},
    ] as PseudoItem[],
    Max: [
        {text: "𝑴𝒂𝒙(𝒙)", tabAmount: 0},
        {text: "while 𝑥.𝑟𝑖𝑔ℎ𝑡 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1},
        {text: "𝑥 ← 𝑥.𝑟𝑖𝑔ℎ𝑡", tabAmount: 2},
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
        {text: "Predecessor(𝒙)", tabAmount: 0},
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

