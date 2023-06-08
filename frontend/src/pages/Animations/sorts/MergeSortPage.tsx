import QuickSort from "../../../components/Simulation/Sorts/QuickSort/QuickSort";
import {
  quickSortOperation,
  sortItem,
} from "../../../components/Simulation/Sorts/helpers/types";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { quickSort } from "../../../components/Simulation/Sorts/QuickSort/QuickSortAlgorithm";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { IndexArray } from "../../../components/Simulation/Sorts/helpers/IndexArray";
import {
  QuickSortPseudoCode,
  mergeSortPseudoCode,
} from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import mergeSortPhoto from "../../../assets/Algorithms/MS1.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { quickSortActions as ActionKind } from "../../../store/reducers/sorts/quickSortReducer";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import QuickSortController from "../../../ClassObjects/SortControllers/QuickSortController";

const MAX_ELEMENTS = 10;

//The Queue page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code
export interface Position {
  curr: number;
  prev: number;
}

interface node {
  array: number[];
  left?: node;
  right?: node;
}

const tree: node = {
  array: [1, 2, 3, 4, 5, 6, 7],
  left: {
    array: [1, 2, 3, 4],
    left: {
      array: [1, 2],
    },
    right: {
      array: [3, 4],
    },
  },
  right: {
    array: [5, 6, 7],
  },
};

const MergeSortPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.quickSort);
  const controller = QuickSortController.getController(dispatch);

  const Sort = async () => {
    const opArr: quickSortOperation[] = quickSort([...state.data]);
    await controller.Sort(opArr);
  };

  const setInput = async (data: number[]) => {
    await controller.init();
    dispatch(ActionKind.init(data));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS));
  };

  const calcTree = (root: node, nodesInLevel: number): JSX.Element => {
    return (
      <>
        <div className={`grid grid-cols-${nodesInLevel}`}>
          {root.array}
        </div>
        {root.left && calcTree(root.left, nodesInLevel* 2)}
        {root.right && calcTree(root.right, nodesInLevel* 2)}
      </>
    );
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
      />

      <div>{calcTree(tree, 1)}</div>
    </>
  );
};

export default MergeSortPage;
