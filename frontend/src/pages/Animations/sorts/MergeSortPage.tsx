import { mergeSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { mergeSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import mergeSortPhoto from "../../../assets/Algorithms/MS1.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mergeSortActions as ActionKind } from "../../../store/reducers/sorts/mergeSortReducer";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import { mergeSort } from "../../../components/Simulation/Sorts/mergeSort/mergeSortAlgorithm";
import MergeSortTree from "../../../components/Simulation/Sorts/mergeSort/mergeSortTree";
import MergeSortController from "../../../ClassObjects/SortControllers/MergeSortController";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";

const MAX_ELEMENTS = 8;

const MergeSortPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.mergeSort);
  const [regsterActivity] = useRegisterActivityMutation();
  const controller = MergeSortController.getController(dispatch);

  const Sort = async () => {
    regsterActivity({
      algorithm: "Merge",
      subject: "Sorts",
    });
    const opArr: mergeSortOperation[] = mergeSort([...state.tree[1].data]);
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

      <SubjectImg name={"Quick Sort"} src={mergeSortPhoto} width="200px" />
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
        code={mergeSortPseudoCode}
        width={300}
        controller={controller}
      >
        {/* <IndexArray size={state.data.length + 1} i={state.i} j={state.j} />
        <SortArray items={state.data} speed={controller.speed} /> */}
        {state.tree.length ? (
          <MergeSortTree
            tree={state.tree}
            left={state.left}
            right={state.right}
            speed={controller.speed}
          />
        ) : (
          <></>
        )}
      </AnimationWrapper>
    </>
  );
};

export default MergeSortPage;
