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
import { ValueArray } from "../../../components/Simulation/Sorts/helpers/ValueArray";
import { radixSort } from "../../../components/Simulation/Sorts/RadixSort/RadixSortAlgorithm";
import RadixSortController from "../../../ClassObjects/SortControllers/RadixSortController";
import { StyledTextDiv } from "../../../components/UI/StyledTextDiv";

const MAX_ELEMENTS = 10;

const RadixSortPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.radixSort);
  const controller = RadixSortController.getController(dispatch);

  const Sort = async () => {
    const opArr: RadixSortOperation[] = radixSort([...state.data]);
    await controller.Sort(opArr);
  };

  const setInput = async (data: number[]) => {
    await controller.init();
    dispatch(actions.setData(data));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS, 1000));
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
        maxInputNum={999}
      ></SortControlsPanel>

      {/* animation section */}
      <AnimationWrapper
        line={state.line}
        code={RadixSortPseudoCode}
        controller={controller}
      >
        <ValueArray data={state.sortData} speed={controller.speed}></ValueArray>
        <SortArray items={state.data} speed={controller.speed} />
        {state.currDigit >= 0 ? (
          <StyledTextDiv 
            style={{ fontFamily: "monaco", fontWeight: "bolder",marginTop:'20px' }}
            text={`Current digit position -> ${state.currDigit}`}
          />
        ) : (
          <></>
        )}
      </AnimationWrapper>
    </>
  );
};

export default RadixSortPage;
