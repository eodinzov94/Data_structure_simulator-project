import { useRef } from "react";
import QuickSort from "../../../components/Simulation/Sorts/QuickSort/QuickSort";
import { quickSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import { sleep } from "../../../utils/animation-helpers";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { quickSort } from "../../../components/Simulation/Sorts/QuickSort/QuickSortAlgorithm";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { IndexArray } from "../../../components/Simulation/Sorts/helpers/IndexArray";
import { QuickSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import quickSortPhoto from "../../../assets/Algorithms/QS1.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { quickSortActions as ActionKind } from "../../../store/reducers/quickSortReducer";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";

const MAX_ELEMENTS = 10;

//The Queue page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code
export interface Position {
  curr: number;
  prev: number;
}

const QuickSortPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.quickSort);

  const abortRef = useRef(false); //dive into it later

  const Sort = async () => {
    setAbortFalse();
    const arr: quickSortOperation[] = quickSort([...state.data]);
    console.log(arr)
    //change to iterate with i, and i will be save as state - will help with memento
    for (var op of arr) {
      if (abortRef.current) {
        break;
      }
      dispatch(op.action(op.payload));
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

  const setInput = (data: number[]) => {
    setAbortTrue();
    dispatch(ActionKind.init(data));
  };

  const setRandomInput = () => {
    setAbortTrue();
    setInput(getRandomNumsArr(MAX_ELEMENTS));
  };

  const setAbortTrue = () => (abortRef.current = true);
  const setAbortFalse = () => (abortRef.current = false);

  return (
    <>
      {/*top section */}
      <SubjectImg name={"Quick Sort"} src={quickSortPhoto} width="200px" />
      <SortControlsPanel
        rightBtnHandler={Sort}
        inputHandler={setInput}
        leftBtnHandler={setRandomInput}
        abortTrueHandler={setAbortTrue}
        abortFalseHandler={setAbortFalse}
        inputBtnText={"Set"}
        rightBtnText={"Sort"}
        leftBtnText={"Random"}
        maxElements={MAX_ELEMENTS}
      />
      <AnimationWrapper line={state.line} code={QuickSortPseudoCode}>
        <IndexArray size={state.data.length + 1} i={state.i} j={state.j} />
        <QuickSort items={state.data} />
        <div>
          p = {state.p}, r={state.r}
        </div>
      </AnimationWrapper>
    </>
  );
};

export default QuickSortPage;
