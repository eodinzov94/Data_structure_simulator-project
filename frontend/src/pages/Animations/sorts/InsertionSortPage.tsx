import { useReducer } from "react";
import {
  insertionSortOperation,
  sortItem,
} from "../../../components/Simulation/Sorts/types";
import { sleep } from "../../../utils/animation-helpers";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { PseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCode";
import { IndexArray } from "../../../components/Simulation/Sorts/IndexArray";
import SortArray from "../../../components/Simulation/Sorts/SortArray";
import {
  insertionSortReducer,
  State,
  insertionSortActionKind as ActionKind,
} from "../../../components/Simulation/Sorts/InsertionSort/InsertionSortReducer";
import { insertionSort } from "../../../components/Simulation/Sorts/InsertionSort/InsertionSortAlgorithm";
import { InsertionSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import ArrayElement from "../../../components/Simulation/Sorts/ArrayElement";

const MAX_ELEMENTS = 10;

const INIT_STATE: State = {
  data: [] as sortItem[],
  i: -2,
  j: -2,
  line: -1,
};

var element: sortItem;

const InsertionSortPage = () => {
  const [state, dispatch] = useReducer(insertionSortReducer, INIT_STATE);

  const Sort = async () => {
    const opArr: insertionSortOperation[] = insertionSort([...state.data]);
    for (var op of opArr) {
      dispatch({ type: op.action, payload: op.payload });
      await sleep(3000);
    }
  };

  const setInput = (data: number[]) => {
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

      {/* psaudo code */}
      <div className="container mx-auto max-w-7xl px-0 md: py-0">
        {/*middle section */}
        <div className="flex flex-nowrap">
          <div className="basis-9/12">
            <IndexArray size={state.data.length + 1} i={state.i} j={state.j} />
            <SortArray items={state.data} />
            <div style={{ marginTop: "40px" }}>
              {state.keyValue ? (
                <ArrayElement name="key" value={state.keyValue} />
              ) : (
                <></>
              )}
            </div>
          </div>
          <PseudoCode code={InsertionSortPseudoCode} line={state.line} />
        </div>
      </div>
    </>
  );
};

export default InsertionSortPage;
