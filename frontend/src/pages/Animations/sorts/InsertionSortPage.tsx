import {useRef } from "react";
import {
  insertionSortOperation,
} from "../../../components/Simulation/Sorts/helpers/types";
import { sleep } from "../../../utils/animation-helpers";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { IndexArray } from "../../../components/Simulation/Sorts/helpers/IndexArray";
import SortArray from "../../../components/Simulation/Sorts/helpers/SortArray";
import { insertionSort } from "../../../components/Simulation/Sorts/InsertionSort/InsertionSortAlgorithm";
import { InsertionSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import ArrayElement from "../../../components/Simulation/Sorts/helpers/ArrayElement";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import insertionSortPhoto from "../../../assets/Algorithms/IS1.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { insertionSortActions as actions, ItemColor } from "../../../store/reducers/sorts/insertionSortReducer";
import InsertionSortController from "../../../ClassObjects/SortControllers/InsertionSortController";

const MAX_ELEMENTS = 10;

const InsertionSortPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.insertionSort);
  const controller = InsertionSortController.getController(dispatch);

  const Sort = async () => {
    const opArr: insertionSortOperation[] = insertionSort([...state.data]);
    await controller.Sort(opArr);
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
    <SubjectImg name={"Insertion Sort"} src={insertionSortPhoto} width="260px"/>

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
      <AnimationWrapper line={state.line} code={InsertionSortPseudoCode} controller={controller}>
        <IndexArray size={state.data.length + 1} i={state.i} j={state.j} />
        <SortArray items={state.data} speed={controller.speed}/>
        <div style={{ marginTop: "40px" }}>
          {state.keyValue ? (
            <ArrayElement
              name="key"
              keyVal={1}
              value={state.keyValue}
              color={state.line === 7 ? ItemColor.MARKED : ItemColor.BASE}
              speed={controller.speed}
            />
          ) : (
            <></>
          )}
        </div>
      </AnimationWrapper>
    </>
  );
};

export default InsertionSortPage;
