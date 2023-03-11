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
  getRandomNumsArr,
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
  const [state, dispatch] = useReducer(quickSortReducer, { data: [] });

  const Sort = async () => {
    const arr: SortOperation[] = quickSort([...state.data]);
    //change to iterate with i, and i will be save as state - will help with memento
    for (var val of arr) {
      const payload: number[] =
        val.index2 !== undefined ? [val.index1, val.index2] : [val.index1];
      dispatch({ type: val.action, payload: payload });
      await sleep(2000);
    }
    // //memento checking
    // for (var i = arr.length - 1; i >= 0; i--) {
    //   const { action, index1, index2 } = arr[i];
    //   const payload: number[] =
    //     index2 !== undefined ? [index1, index2] : [index1];
    //   switch (action) {
    //     case ActionKind.DONE: {
    //       arr[i].pivot == false
    //         ? dispatch({ type: ActionKind.BASE, payload: payload })
    //         : dispatch({ type: ActionKind.MARK_PIVOT, payload: payload });
    //       break;
    //     }
    //     case ActionKind.MARK_PIVOT: {
    //       dispatch({ type: ActionKind.BASE, payload: payload });
    //       break;
    //     }
    //     case ActionKind.MARK: {
    //       dispatch({ type: ActionKind.UNMARK, payload: payload });
    //       break;
    //     }
    //     case ActionKind.UNMARK: {
    //       dispatch({ type: ActionKind.MARK, payload: payload });
    //       break;
    //     }
    //     case ActionKind.SWAP: {
    //       dispatch({ type: ActionKind.SWAP, payload: payload });
    //       break;
    //     }
    //     default: {
    //       console.log("error");
    //       break;
    //     }
    //   }
    //   await sleep(2000);
    // }
  };

  const setInput = (data:number[]) => {
    dispatch({type: ActionKind.SET_DATA, payload:data})
  }

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS))
  };

  return (
    <>
      {/*top section */}
      <SortControlsPanel
        rightBtnHandler={Sort}
        inputHandler={setInput}
        leftBtnHandler={setRandomInput}

        inputBtnText={"Set"}
        rightBtnText={"Sort"}
        leftBtnText={"Random"}
        maxElements={MAX_ELEMENTS}
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



