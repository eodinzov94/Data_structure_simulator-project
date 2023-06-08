import { insertionSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import {
  getRandomNumsArr,
  numbersToSortItems,
} from "../../../components/Simulation/Sorts/helpers/functions";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { IndexArray } from "../../../components/Simulation/Sorts/helpers/IndexArray";
import SortArray from "../../../components/Simulation/Sorts/helpers/SortArray";
import { insertionSort } from "../../../components/Simulation/Sorts/InsertionSort/InsertionSortAlgorithm";
import { RadixSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import ArrayElement from "../../../components/Simulation/Sorts/helpers/ArrayElement";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import radixSortPhoto from "../../../assets/Algorithms/RS1.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { radixSortActions as actions } from "../../../store/reducers/sorts/radixSortReducer";
import InsertionSortController from "../../../ClassObjects/SortControllers/InsertionSortController";
import { ValueArray } from "../../../components/Simulation/Sorts/helpers/ValueArray";

const MAX_ELEMENTS = 10;

const RadixSortPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.radixSort);
  const controller = InsertionSortController.getController(dispatch);

  const Sort = async () => {
    // const opArr: insertionSortOperation[] = insertionSort([...state.data]);
    // await controller.Sort(opArr);
    dispatch(actions.sort());
    console.log(state.data);
  };

  const setInput = async (data: number[]) => {
    await controller.init();
    dispatch(actions.setData(data));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS));
  };

  return (
    <>
      {/*top section */}
      <SubjectImg name={"Insertion Sort"} src={radixSortPhoto} width="200px" />

      <SortControlsPanel
        rightBtnHandler={Sort}
        inputHandler={setInput}
        leftBtnHandler={setRandomInput}
        inputBtnText={"Set"}
        rightBtnText={"Sort"}
        leftBtnText={"Random"}
        maxElements={MAX_ELEMENTS}
      ></SortControlsPanel>

      {/* animation section */}
      <AnimationWrapper
        line={state.line}
        code={RadixSortPseudoCode}
        controller={controller}
      >
        <ValueArray data={state.sortData}></ValueArray>
        <SortArray items={state.data} speed={controller.speed} />
        <div style={{ marginTop: "50px" }}>
          {/* <SortArray items={state.sortData} speed={controller.speed} /> */}
        </div>
      </AnimationWrapper>
    </>
  );
};

export default RadixSortPage;
