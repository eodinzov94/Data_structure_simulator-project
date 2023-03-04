import { useReducer, useState } from "react";
import { motion } from "framer-motion";
import QuickSort from "../../components/Simulation/Sorts/QuickSort/QuickSort";
import {
  sortItem,
  SortOperation,
} from "../../components/Simulation/Sorts/types";
import { sleep } from "../../utils/animation-helpers";
import {
  quickSortReducer,
  ActionKind,
  ItemColor,
} from "../../components/Simulation/Sorts/helpers";
import { quickSort } from "../../components/Simulation/Sorts/QuickSort/QuickSortAlgorithm";
import { SortControlsPanel } from "../../components/Simulation/ControlsPanels/SortControlsPanel";

const MAX_ELEMENTS = 10;

//The Queue page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code
export interface Position {
  curr: number;
  prev: number;
}

const QuickSortPage = () => {
  const DUMMY: sortItem[] = [
    { value: 6, key: 8, color: ItemColor.BASE, isSelected: false },
    { value: 1, key: 0, color: ItemColor.BASE, isSelected: false },
    { value: 13, key: 5, color: ItemColor.BASE, isSelected: false },
    { value: 10, key: 1, color: ItemColor.BASE, isSelected: false },
    { value: 5, key: 2, color: ItemColor.BASE, isSelected: false },
    // { value: 22, key: 6, color: ItemColor.BASE,  isSelected: false },
    // { value: 7, key: 3, color: ItemColor.BASE,  isSelected: false },
    // { value: 2, key: 4, color: ItemColor.BASE,  isSelected: false },
    // { value: 3, key: 7, color: ItemColor.BASE,  isSelected: false },
  ];

  const [state, dispatch] = useReducer(quickSortReducer, { data: DUMMY });
  const [isPop, setIsPop] = useState<boolean>(false);
  const [keyValue, setKeyValue] = useState<number>(0);

  const Sort = async () => {
    const arr: SortOperation[] = quickSort([...DUMMY]);
        //console.log(arr);
    //change to iterate with i, and i will be save as state - will help with memento
    for (var val of arr) {
      const payload: number[] =
        val.index2 !== undefined ? [val.index1, val.index2] : [val.index1];
      dispatch({ type: val.action, payload: payload });
      await sleep(2000);
    }
    //memento checking
    for (var i = arr.length - 1; i >= 0; i--) {
      const { action, index1, index2 } = arr[i];
      const payload: number[] =
        index2 !== undefined ? [index1, index2] : [index1];
      switch (action) {
        case ActionKind.DONE: {
          arr[i].pivot == false
            ? dispatch({ type: ActionKind.BASE, payload: payload })
            : dispatch({ type: ActionKind.MARK_PIVOT, payload: payload });
          break;
        }
        case ActionKind.MARK_PIVOT: {
          dispatch({ type: ActionKind.BASE, payload: payload });
          break;
        }
        case ActionKind.MARK: {
          dispatch({ type: ActionKind.UNMARK, payload: payload });
          break;
        }
        case ActionKind.UNMARK: {
          dispatch({ type: ActionKind.MARK, payload: payload });
          break;
        }
        case ActionKind.SWAP: {
          dispatch({ type: ActionKind.SWAP, payload: payload });
          break;
        }
        default: {
          console.log("error");
          break;
        }
      }
      await sleep(2000);
    }
  };

  //   if (data.length === MAX_ELEMENTS) {
  //     window.alert(`A maximum of ${MAX_ELEMENTS} values can be entered`);
  //   } else {
  //     //add new elment at the start
  //     const new_data = [...data, { value, key: keyValue, isSelected: false }];
  //     setKeyValue((prevState) => {
  //       return prevState + 1;
  //     });
  //     setData(new_data);
  //   }
  // };

  // const setRandomInput = (newData: sortItem[]) => {
  //   setData(newData);
  //   setKeyValue(newData.length);
  // };

  return (
    <>
      {/*top section */}
      <SortControlsPanel
        rightBtnHandler={Sort}
        inputHandler={Sort}
        isRemovedEnabled={isPop}
        inputBtnText={"Set"}
        rightBtnText={"Sort"}
        leftBtnText={"Random"}
        maxLengthOfValue={100}
      />

      <div className="container mx-auto max-w-7xl px-0 md: py-0">
        <div className="flex flex-nowrap">
          {/*middle section */}
          <QuickSort items={state.data} />
        </div>
      </div>
    </>
  );
};

export default QuickSortPage;

/*rigth section */

/* <div className="basis-3/12">
            Pseudo code:
            <ul>
              <motion.li
                initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                animate={
                  isPop
                    ? {
                        backgroundColor: ["#bef264", "rgba(0,0,0,0)"],
                      }
                    : {}
                }
                transition={{
                  // duration: 2.5,
                  duration: 2,
                }}
              >
                {"if (!stack.isEmpty()):"}
              </motion.li>
              <motion.li
                initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                animate={
                  isPop
                    ? {
                        backgroundColor: ["rgba(0,0,0,0)", "#bef264"],
                      }
                    : {}
                }
                transition={{
                  // duration: 2.5,
                  delay: 0.5,
                  duration: 0.5,
                }}
              >
                {"    return arr[size-1];"}
              </motion.li>
            </ul>
          </div> */

// const replace = (index1: number, index2: number) => {
//   setData((prevState) => {
//     const newData1 = [...prevState];
//     newData1[index1].isSelected = true;
//     newData1[index2].isSelected = true;
//     return newData1;
//   });
//   let timer = setTimeout(() => {
//     setTimeout(() => {
//       setData((prevState) => {
//         const newData1 = [...prevState];
//         newData1[index1].isSelected = false;
//         newData1[index2].isSelected = false;
//         return newData1;
//       });
//     }, 2000);
//     // setData((prevState) => {
//     //   {
//     //     const newData = [...prevState];
//     //     let x = newData[index1];
//     //     newData[index1] = newData[index2];
//     //     newData[index2] = x;
//     //     return newData;
//     //   }
//     // });
//   }, 500);


// const Dequeue = async () => {
//   dispatch({ type: ActionKind.MARK, payload: [0, 2] });
//   await sleep(500);
//   dispatch({ type: ActionKind.SWAP, payload: [0, 2] });
//   await sleep(2000);
//   dispatch({ type: ActionKind.UNMARK, payload: [0, 2] });
// };