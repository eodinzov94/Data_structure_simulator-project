import { useState } from "react";
import Stack from "../../../components/Simulation/Stack/Stack";
import SqControlsPanel, {
  Item,
} from "../../../components/Simulation/ControlsPanels/SqControlsPanel";
import { stackPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { stackActions } from "../../../store/reducers/stackReducer";
import { sleep } from "../../../utils/animation-helpers";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import stackPhoto from "../../../assets/Algorithms/S1.png";

const MAX_ELEMENTS = 10;

//The stack page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code

const StackPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.stack);

  const [data, setData] = useState<Item[]>([]); //data of the stack
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const popFromStack = async () => {
    setIsAnimate(true);

    dispatch(stackActions.setLine(3));
    await sleep(2000);
    if (state.data.length > 0) {
      //if the stack is not empty
      //copy data and remove first element

      const new_data = [...data];
      new_data.splice(0, 1);
      setData(new_data); //update data

      dispatch(stackActions.markTop());
      await sleep(2000);

      dispatch(stackActions.setLine(5));
      await sleep(1000);

      dispatch(stackActions.pop());
      await sleep(2000);
    }
    dispatch(stackActions.setLine(-1));

    setIsAnimate(false);
  };

  const pushToStack = async (value: string) => {
    // if (data.length === MAX_ELEMENTS) {
    //   window.alert(`A maximum of ${MAX_ELEMENTS} values can be entered`);
    // }

    setIsAnimate(true)
    dispatch(stackActions.setLine(10));
    await sleep(2000);
    if (state.data.length < MAX_ELEMENTS) {
      //add new elment at the start
      //const key = data.length;
      dispatch(stackActions.incTop());
      await sleep(2000);
      dispatch(stackActions.setTopValue(value));
      await sleep(2000);
    }
    dispatch(stackActions.setLine(-1));

    setIsAnimate(false)
  };

  const setRandomInput = (newData: Item[]) => {
    dispatch(stackActions.init(newData));
  };

  return (
    <>
      {/*top section */}
      <SubjectImg name={"Queue"} src={stackPhoto} width="200px" />

      <SqControlsPanel
        removeHandler={popFromStack}
        addHandler={pushToStack}
        setRandomInput={setRandomInput}
        isRemovedEnabled={isAnimate}
        isAddEnabled={isAnimate}
        addBtnText={"Push"}
        removeBtnText={"Pop"}
        maxLengthOfValue={8}
      />

      <AnimationWrapper line={state.line} code={stackPseudoCode}>
        <Stack items={state.data} />
      </AnimationWrapper>
    </>
  );
};

export default StackPage;
