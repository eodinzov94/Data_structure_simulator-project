import BinaryTree from "../../../components/Simulation/BinaryTree/BinaryTree";
import { TreeNode } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import HeapArray from "../../../components/Simulation/Heap/HeapArray/HeapArray";
import HeapAnimationController from "../../../ClassObjects/HeapAnimationController";
import { useAppSelector } from "../../../store/hooks";
import { useDispatch } from "react-redux";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import HeapControlsPanel from "../../../components/Simulation/ControlsPanels/HeapControlsPanel";
import { HeapsortPseudoCode } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import { FC } from "react";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";

function calculateHeight(root: TreeNode | undefined | null): number {
  if (!root) {
    return 0;
  }
  return Math.max(calculateHeight(root.left), calculateHeight(root.right)) + 1;
}

const HeapPage: FC = () => {
  const root = useAppSelector((state) => state.heap.root);
  const currentActions = useAppSelector((state) => state.heap.currentActions);
  const currentArr = useAppSelector((state) => state.heap.currentArr);
  const currentAlg = useAppSelector((state) => state.heap.currentAlg);
  const currentLine = useAppSelector((state) => state.heap.currentLine);
  const currentHeapSize = useAppSelector((state) => state.heap.currentHeapSize);
  const controller = HeapAnimationController.getController(
    currentArr,
    useDispatch()
  );

  return (
    <>
      <HeapControlsPanel controller={controller} />
      <div className="container mx-auto max-w-7xl px-0 py-0 mt-64">
        <HeapArray
          items={currentArr}
          actions={currentActions}
          speed={controller.speed}
          currentHeapSize={currentHeapSize}
        />
      </div>
      <div className="container mx-auto max-w-7xl px-0 py-0">
        <BinaryTree
          root={root}
          level={0}
          height={calculateHeight(root)}
          speed={controller.speed}
          actions={currentActions}
          currentHeapSize={currentHeapSize}
        />
      </div>
      <PlayerControlsPanel controller={controller} />
      <div className="flex justify-end mr-5">
        <div className=" w-fit">
          <PseudoCodeContainer
            line={currentLine}
            code={HeapsortPseudoCode[currentAlg]}
          />
        </div>
      </div>
    </>
  );
};

export default HeapPage;
