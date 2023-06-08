import { RadixSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import SortArray from "../../../components/Simulation/Sorts/helpers/SortArray";
import { RadixSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import radixSortPhoto from "../../../assets/Algorithms/RS1.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { radixSortActions as actions } from "../../../store/reducers/sorts/radixSortReducer";
import InsertionSortController from "../../../ClassObjects/SortControllers/InsertionSortController";
import { ValueArray } from "../../../components/Simulation/Sorts/helpers/ValueArray";
import { radixSort } from "../../../components/Simulation/Sorts/RadixSort/RadixSortAlgorithm";
import { sleep } from "../../../utils/animation-helpers";

const MAX_ELEMENTS = 10;

const RadixSortPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.radixSort);
  const controller = InsertionSortController.getController(dispatch);

  const Sort = async () => {
    const opArr: RadixSortOperation[] = radixSort([...state.data]);
    for (let op of opArr) {
      dispatch(op.action(op.payload));
      await sleep(2000);
    }
    // await controller.Sort(opArr);
    // dispatch(actions.sort());
  };

  const setInput = async (data: number[]) => {
    await controller.init();
    dispatch(actions.setData(data));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS,1000));
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
      </AnimationWrapper>
    </>
  );
};

export default RadixSortPage;
