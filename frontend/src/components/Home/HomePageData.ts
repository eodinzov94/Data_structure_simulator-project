import { RoutePaths } from "../../Routes/RoutePaths";
import stackGif from "../../assets/Gallery/stackGif.gif";
import stackPhoto from "../../assets/Gallery/stackPhoto.png";
import queueGif from "../../assets/Gallery/queueGif.gif";
import queuePhoto from "../../assets/Gallery/queuePhoto.png";
import treeGif from "../../assets/Gallery/treeGif.gif";
import treePhoto from "../../assets/Gallery/treePhoto.png";
import heapGif from "../../assets/Gallery/heapGif.gif";
import heapPhoto from "../../assets/Gallery/heapPhoto.png";
import hashGif from "../../assets/Gallery/hashGif.gif";
import hashPhoto from "../../assets/Gallery/hashPhoto.png";
import sortsGif from "../../assets/Gallery/sortsGif.gif";
import sortsPhoto from "../../assets/Gallery/sortsPhoto.png";

const sortTypes = [
  {
    name: "Radix Sort",
    url: "/radixtsort",
  },
  {
    name: "Quick Sort",
    url: "/quicksort",
  },
  {
    name: "Merge Sort",
    url: "/mergesort",
  },
  {
    name: "Bucket Sort",
    url: "/bucketsort",
  },
  {
    name: "Insertion Sort",
    url: "/insertionsort",
  },
  {
    name: "Counting Sort",
    url: "/countingsort",
  },
];

const treeType = [
  {
    name: "Regular Tree",
    url: "tree",
  },
  {
    name: "Binary Search Tree",
    url: "bst",
  },
  {
    name: "Avl Tree",
    url: "avltree",
  },
];

const HomePageData = [
  {
    title: "Stack",
    gif: stackGif,
    image: stackPhoto,
    url: RoutePaths.STACK,
  },
  {
    title: "Queue",
    gif: queueGif,
    image: queuePhoto,
    url: "/queue",
  },
  {
    title: "Hash table",
    gif: hashGif,
    image: hashPhoto,
    url: "/login",
  },

  {
    title: "Trees",
    gif: treeGif,
    image: treePhoto,
    url: "",
    description: "Click to see all the trees options",
    expended: true,
    expendedList:treeType
  },
  {
    title: "Heap",
    gif: heapGif,
    image: heapPhoto,
    url: "/login",
  },
  {
    title: "Sorts",
    image: sortsPhoto,
    gif: sortsGif,
    url: "",
    description: "Click to see all the sort options",
    expended: true,
    expendedList: sortTypes,
  },
];

export default HomePageData;

//   {
//     title: "Stack",
//     image: "https://bit.ly/3BQdTqk",
//     url: "/login",
//     description:""
//   },
//   {
//     title: "Queue",
//     image: "https://bit.ly/3BQdTqk",
//     url: "/login",
//   },
//   {
//     title: "Sorts",
//     image: "https://bit.ly/3BQdTqk",
//     url: "/login",
//     description:"click to see all the sort options"

//   },
//   {
//     title: "Insertion sort",
//     image: "https://bit.ly/3BQdTqk",
//     url: "/login",
//   },
//   {
//     title: "Counting sort",
//     image: "https://bit.ly/3BQdTqk",
//     url: "/login",
//   },
// {
//   title: "Merge sort",
//   image: "https://bit.ly/3BQdTqk",
//   url: "/login",
// },
// {
//     title: "Radix sort",
//     image: "https://bit.ly/3BQdTqk",
//     url: "/login",
//   },
//   {
//     title: "Bucket sort",
//     image: "https://bit.ly/3BQdTqk",
//     url: "/login",
//   },
//   {
//     title: "Linked List",
//     image: "https://bit.ly/3CQKSwb",
//     url: "/login",

//   },
//   {
//     title: "Hash table",
//     image: "https://bit.ly/3BQdTqk",
//     url: "/login",
//   },
//   {
//     title: "Heap",
//     image: "https://bit.ly/3BQdTqk",
//     url: "/login",
//   },

//   {
//     title: "Binary tree",
//     image: "https://bit.ly/3BQdTqk",
//     url: "/login",
//   },
// {
//   title: "Binary search tree",
//   image: "https://bit.ly/3CQFPvv",
//   url: "/login",

// },
// {
//   title: "AVL Tree",
//   image: "https://bit.ly/3ERuyMd",
//   url: "/login",

// }
// ];
