import { useState } from "react";
import Stack from "../../../components/Simulation/Stack/Stack";
import SqControlsPanel, {
  Item,
} from "../../../components/Simulation/ControlsPanels/SqControlsPanel";
import { PseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCode";
import { stackPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { stackActions } from "../../../store/reducers/stackReducer";
import { sleep } from "../../../utils/animation-helpers";

const MAX_ELEMENTS = 10;

//The stack page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code

const StackPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.stack);

  const [data, setData] = useState<Item[]>([]); //data of the stack
  const [isPop, setIsPop] = useState<boolean>(false);
  const [isPush, setIsPush] = useState<boolean>(false);

  const popFromStack = async () => {
    setIsPop(true);

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

    setIsPop(false);
  };

  const pushToStack = async (value: string) => {
    // if (data.length === MAX_ELEMENTS) {
    //   window.alert(`A maximum of ${MAX_ELEMENTS} values can be entered`);
    // }

    setIsPush(true)
    dispatch(stackActions.setLine(10));
    await sleep(2000);
    if (state.data.length < MAX_ELEMENTS) {
      //add new elment at the start
      const key = data.length;
      dispatch(stackActions.incTop());
      await sleep(2000);
      dispatch(stackActions.setTopValue(value));
      await sleep(2000);
    }
    dispatch(stackActions.setLine(-1));
    setIsPush(false)

  };

  const setRandomInput = (newData: Item[]) => {
    dispatch(stackActions.init(newData));
  };

  return (
    <>
      {/*top section */}

      <SqControlsPanel
        removeHandler={popFromStack}
        addHandler={pushToStack}
        setRandomInput={setRandomInput}
        isRemovedEnabled={isPop}
        isAddEnabled={isPush}
        addBtnText={"Push"}
        removeBtnText={"Pop"}
        maxLengthOfValue={8}
      />

      <div className="container mx-auto max-w-7xl px-0 md: py-10">
        <div className="flex flex-nowrap">
          {/*middle section */}
          <Stack items={state.data} />

          {/*rigth section */}
          <PseudoCode code={stackPseudoCode} line={state.line} />
        </div>
      </div>
    </>
  );
};

export default StackPage;
