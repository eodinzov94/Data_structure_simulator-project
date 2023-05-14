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
import { quickSortActions as ActionKind } from "../../../store/reducers/sorts/quickSortReducer";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import QuickSortController from "../../../ClassObjects/SortControllers/QuickSortController";

const MAX_ELEMENTS = 10;

//The Queue page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code
export interface Position {
  curr: number;
  prev: number;
}

const QuickSortPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.quickSort);
  const controller = QuickSortController.getController(dispatch);

  const Sort = async () => {
    const opArr: quickSortOperation[] = quickSort([...state.data]);
    await controller.Sort(opArr);
  };

  const setInput = async (data: number[]) => {
    await controller.init();
    dispatch(ActionKind.init(data));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS));
  };

  return (
    <>
      {/*top section */}
      <SubjectImg name={"Quick Sort"} src={quickSortPhoto} width="200px" />
      <SortControlsPanel
        rightBtnHandler={Sort}
        inputHandler={setInput}
        leftBtnHandler={setRandomInput}
        inputBtnText={"Set"}
        rightBtnText={"Sort"}
        leftBtnText={"Random"}
        maxElements={MAX_ELEMENTS}
      />
      <AnimationWrapper line={state.line} code={QuickSortPseudoCode} controller={controller}>
        <IndexArray size={state.data.length + 1} i={state.i} j={state.j} />
        <QuickSort items={state.data} speed={controller.speed}/>
        <div>
          p = {state.p}, r={state.r}
        </div>
      </AnimationWrapper>
    </>
  );
};

export default QuickSortPage;
