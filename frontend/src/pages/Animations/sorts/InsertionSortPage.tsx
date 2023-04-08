import { useReducer, useRef } from "react";
import {
  insertionSortOperation,
  sortItem,
} from "../../../components/Simulation/Sorts/helpers/types";
import { sleep } from "../../../utils/animation-helpers";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { PseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCode";
import { IndexArray } from "../../../components/Simulation/Sorts/helpers/IndexArray";
import SortArray from "../../../components/Simulation/Sorts/helpers/SortArray";
import {
  insertionSortReducer,
  State,
  insertionSortActionKind as ActionKind,
  ItemColor,
} from "../../../components/Simulation/Sorts/InsertionSort/InsertionSortReducer";
import { insertionSort } from "../../../components/Simulation/Sorts/InsertionSort/InsertionSortAlgorithm";
import { InsertionSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import ArrayElement from "../../../components/Simulation/Sorts/helpers/ArrayElement";

const MAX_ELEMENTS = 10;

const INIT_STATE: State = {
  data: [] as sortItem[],
  i: -2,
  j: -2,
  line: -1,
};

const InsertionSortPage = () => {
  const [state, dispatch] = useReducer(insertionSortReducer, INIT_STATE);
  const abortRef = useRef(false);
  const setAbortTrue = () => (abortRef.current = true);
  const setAbortFalse = () => (abortRef.current = false);

  const Sort = async () => {
    setAbortFalse();
    const opArr: insertionSortOperation[] = insertionSort([...state.data]);
    for (var op of opArr) {
      if (abortRef.current) {
        break;
      }
      dispatch({ type: op.action, payload: op.payload });
      await sleep(2000);
    }
  };

  const setInput = (data: number[]) => {
    setAbortTrue();
    dispatch({ type: ActionKind.SET_DATA, payload: { data } });
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS));
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
      ></SortControlsPanel>

      {/* animation section */}

      <div className="container mx-auto max-w-7xl px-0 md: py-0">
        {/*middle section */}
        <div className="flex flex-nowrap">
          <div className="basis-9/12">
            <IndexArray size={state.data.length + 1} i={state.i} j={state.j} />
            <SortArray items={state.data} />
            <div style={{ marginTop: "40px" }}>
              {state.keyValue ? (
                <ArrayElement
                  name="key"
                  value={state.keyValue}
                  color={state.line == 7 ? ItemColor.MARKED : ItemColor.BASE}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* psaudo code */}
          <PseudoCode code={InsertionSortPseudoCode} line={state.line} />
        </div>
      </div>
    </>
  );
};

export default InsertionSortPage;
