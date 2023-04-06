import {useRef } from "react";
import {
  countingSortOperation
} from "../../../components/Simulation/Sorts/helpers/types";
import { sleep } from "../../../utils/animation-helpers";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { PseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCode";
import { IndexArray } from "../../../components/Simulation/Sorts/helpers/IndexArray";
import SortArray from "../../../components/Simulation/Sorts/helpers/SortArray";
import {
  CountingSortPseudoCode,
} from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  init,
} from "../../../store/reducers/countingSortReducer";
import { CountingSort } from "../../../components/Simulation/Sorts/CountingSort/CountingSortAlgorithem";

const MAX_ELEMENTS = 10;

const CountingSortPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.countingSort);

  const abortRef = useRef(false);
  const setAbortTrue = () => (abortRef.current = true);
  const setAbortFalse = () => (abortRef.current = false);

  const Sort = async () => {
    const opArr: countingSortOperation[] = CountingSort([...state.A], state.k);
    for (var op of opArr) {
      if (abortRef.current) {
        break;
      }
      dispatch(op.action(op.payload));
      await sleep(2000);
    }
  };

  const setInput = (data: number[]) => {
    dispatch(init({ data, arr_name: "A" }));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS, 10));
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
        maxInputNum={9}
      ></SortControlsPanel>

      {/* animation section */}

      <div className="container mx-auto max-w-7xl px-0 md: py-0">
        {/*middle section */}
        <div className="flex flex-nowrap">
          <div className="basis-9/12">
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
          </div>
          {/* psaudo code */}
          <PseudoCode code={CountingSortPseudoCode} line={state.line} />
        </div>
      </div>
    </>
  );
};

export default CountingSortPage;
