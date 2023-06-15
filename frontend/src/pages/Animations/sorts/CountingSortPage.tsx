import { countingSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { IndexArray } from "../../../components/Simulation/Sorts/helpers/IndexArray";
import SortArray from "../../../components/Simulation/Sorts/helpers/SortArray";
import { CountingSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { init } from "../../../store/reducers/sorts/countingSortReducer";
import { CountingSort } from "../../../components/Simulation/Sorts/CountingSort/CountingSortAlgorithem";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import countingSortPhoto from "../../../assets/Algorithms/CS1.png";
import CountingSortController from "../../../ClassObjects/SortControllers/CountingSortController";
import { StyledTextDiv } from "../../../components/UI/StyledTextDiv";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";

const MAX_ELEMENTS = 10;

const CountingSortPage = () => {
  const dispatch = useAppDispatch();
  const isSortStarted = useAppSelector(
    (s) => s.animationController.isSortStarted
  );
  const state = useAppSelector((state) => state.countingSort);
  const [regsterActivity] = useRegisterActivityMutation();
  const controller = CountingSortController.getController(dispatch);

  const Sort = async () => {
    regsterActivity({
      algorithm: "Counting",
      subject: "Sorts",
    });
    const opArr: countingSortOperation[] = CountingSort([...state.A], state.k);
    await controller.Sort(opArr);
  };

  const setInput = async (data: number[]) => {
    await controller.init();
    dispatch(init({ data, arr_name: "A" }));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS, 11));
  };

  return (
    <>
      {/*top section */}
      <SubjectImg
        name={"Counting Sort"}
        src={countingSortPhoto}
        width="260px"
      />

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
      <AnimationWrapper
        line={state.line}
        code={CountingSortPseudoCode}
        controller={controller}
      >
        {(state.A.length > 0) ?<StyledTextDiv text={`A[${state.A.length}]`} style={{ height: "20px" }}/>:<></>}
        <IndexArray size={state.A.length + 1} i={state.indexA} />
        <SortArray items={state.A} speed={controller.speed} />

        <div style={{ marginTop: "40px" }}>
          {(state.C.length > 0) ?<StyledTextDiv text={`C[${state.C.length}]`} style={{ height: "20px" }}/>:<></>} 
          <IndexArray size={state.C.length + 1} i={state.indexC} />
          <SortArray items={state.C} speed={controller.speed} />
        </div>

        <div style={{ marginTop: "40px" }}>
          {(state.B.length > 0) ?<StyledTextDiv text={`B[${state.B.length}]`} style={{ height: "20px" }}/>:<></>} 
          <IndexArray size={state.B.length + 1} i={state.indexB} />
          <SortArray items={state.B} speed={controller.speed} />
        </div>

        {isSortStarted ? (
          <StyledTextDiv
            text={`K -> ${state.k}`}
            style={{ marginTop: "20px" }}
          />
        ) : (
          <></>
        )}
      </AnimationWrapper>
    </>
  );
};

export default CountingSortPage;
