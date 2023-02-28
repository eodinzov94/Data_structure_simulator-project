import { useReducer, useState } from "react";
import { motion } from "framer-motion";
import ControlsPanel, {
  Item,
} from "../components/Simulation/ControlsPanels/SqControlsPanel";
import QuickSort from "../components/Simulation/Sorts/QuickSort/QuickSort";
import { sortItem } from "../components/Simulation/Sorts/types";
import { sleep } from "../utils/animation-helpers";
import {
  quickSortReducer,
  ActionKind,
  ItemColor,
} from "../components/Simulation/Sorts/QuickSort/helpers";

const MAX_ELEMENTS = 10;

//The Queue page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code
export interface Position {
  curr: number;
  prev: number;
}

const QuickSortPage = () => {
  const DUMMY: sortItem[] = [
    { value: "1", key: 0, color: ItemColor.BASE, isSelected: false },
    { value: "10", key: 1, color: ItemColor.BASE,  isSelected: false },
    { value: "5", key: 2, color: ItemColor.BASE,  isSelected: false },
    { value: "7", key: 3, color: ItemColor.BASE,  isSelected: false },
    { value: "2", key: 4, color: ItemColor.BASE,  isSelected: false },
    { value: "3", key: 5, color: ItemColor.BASE,  isSelected: false },
  ];
  const [state, dispatch] = useReducer(quickSortReducer, { data: DUMMY });
  const [isPop, setIsPop] = useState<boolean>(false);
  const [keyValue, setKeyValue] = useState<number>(0);

  const Dequeue = async () => {
    dispatch({ type: ActionKind.MARK, payload: [0, 2] });
    await sleep(500);
    dispatch({ type: ActionKind.SWAP, payload: [0, 2] });
    await sleep(2000);
    dispatch({ type: ActionKind.UNMARK, payload: [0, 2] });
  };

  const Enqueue = async (value: string) => {
    dispatch({ type: ActionKind.MARK_PIVOT, payload: [0] });
    // dispatch({ type: ActionKind.MARK, payload: [0, 2] });
    // await sleep(1000);
    // dispatch({ type: ActionKind.UNMARK, payload: [0, 2] });
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
      <ControlsPanel
        removeHandler={Dequeue}
        addHandler={Enqueue}
        isRemovedEnabled={isPop}
        addBtnText={"Enqueue"}
        removeBtnText={"Dequeue"}
        maxLengthOfValue={4}
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

{
  /*rigth section */
}
{
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
}

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
