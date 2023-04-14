import BinaryTree from "../../../components/Simulation/BinaryTree/BinaryTree";
import { TreeNode } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import HeapArray from "../../../components/Simulation/Heap/HeapArray/HeapArray";
import HeapAnimationController from "../../../ClassObjects/HeapAnimationController";
import { useAppSelector } from "../../../store/hooks";
import { useDispatch } from "react-redux";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import HeapControlsPanel from "../../../components/Simulation/ControlsPanels/HeapControlsPanel";
import { HeapsortPseudoCode } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import { FC, useEffect, useState } from "react";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import PhoneRotate from "../../../assets/rotateTablet.svg";

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
  const currentRoles = useAppSelector((state) => state.heap.currentRoles);
  const controller = HeapAnimationController.getController(
    currentArr,
    useDispatch()
  );
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const fitsAnimation = viewportWidth>=1120 ;

  return (
    <>
      {fitsAnimation ?
      <>
      <HeapControlsPanel controller={controller} />
      <div className="container mx-auto max-w-7xl px-0 py-0">
        <BinaryTree
          viewportWidth={viewportWidth}
          root={root}
          level={0}
          height={calculateHeight(root)}
          speed={controller.speed}
          actions={currentActions}
          roles={currentRoles}
          currentHeapSize={currentHeapSize}
        />
      </div>
      <div className="container mx-auto max-w-7xl px-0 py-0 mt-80">
        <HeapArray
          items={currentArr}
          actions={currentActions}
          speed={controller.speed}
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
      :
             <div className="relative grid place-content-center place-items-center gap-2 before:bg-gradient-to-t before:from-teal-500/70 before:via-fuchsia-600 before:to-transparent before:blur-xl before:filter">
               <h2 className="title text-3xl font-black text-lime-600">Min supported width for this simulation</h2>
               <h2 className="cursive text-5xl font-thin text-lime-600">1120px</h2>
               <img
                      src={PhoneRotate}
                      alt="Rotate device"
               />
             </div>


      }
    </>
  );
};

export default HeapPage
