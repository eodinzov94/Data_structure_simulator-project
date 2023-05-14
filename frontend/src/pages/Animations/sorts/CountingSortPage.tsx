import { useRef } from "react";
import { countingSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { IndexArray } from "../../../components/Simulation/Sorts/helpers/IndexArray";
import SortArray from "../../../components/Simulation/Sorts/helpers/SortArray";
import { CountingSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { init } from "../../../store/reducers/countingSortReducer";
import { CountingSort } from "../../../components/Simulation/Sorts/CountingSort/CountingSortAlgorithem";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import countingSortPhoto from "../../../assets/Algorithms/CS1.png";
import CountingSortController from "../../../ClassObjects/SortControllers/CountingSortController";

const MAX_ELEMENTS = 10;

const CountingSortPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.countingSort);

  const abortRef = useRef(false);
  const setAbortTrue = () => (abortRef.current = true);
  const setAbortFalse = () => (abortRef.current = false);
  const controller = CountingSortController.getController(dispatch);

  const Sort = async () => {
    setAbortFalse();
    const opArr: countingSortOperation[] = CountingSort([...state.A], state.k);
    await controller.Sort(opArr);
  };

  const setInput = (data: number[]) => {
    setAbortTrue();
    dispatch(init({ data, arr_name: "A" }));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS, 11));
  };

  return (
    <>
      {/*top section */}
      <SubjectImg name={"Counting Sort"} src={countingSortPhoto} width="260px" />

      <SortControlsPanel
        rightBtnHandler={Sort}
        inputHandler={setInput}
        leftBtnHandler={setRandomInput}
        inputBtnText={"Set"}
        rightBtnText={"Sort"}
        leftBtnText={"Random"}
        maxElements={MAX_ELEMENTS}
        maxInputNum={9}
      ></SortControlsPanel>

      {/* animation section */}
      <AnimationWrapper line={state.line} code={CountingSortPseudoCode} controller={controller}>
        <IndexArray size={state.A.length + 1} i={state.indexA} />
        <SortArray items={state.A} />

        <div style={{ marginTop: "40px" }}>
          <IndexArray size={state.C.length + 1} i={state.indexC} />
          <SortArray items={state.C} />
        </div>

        <div style={{ marginTop: "40px" }}>
          <IndexArray size={state.B.length + 1} i={state.indexB} />
          <SortArray items={state.B} />
        </div>

        <div> K = {state.k}</div>
      </AnimationWrapper>
    </>
  );
};

export default CountingSortPage;
