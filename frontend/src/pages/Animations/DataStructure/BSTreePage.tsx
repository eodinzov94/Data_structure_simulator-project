import BinaryTree from "../../../components/Simulation/BinaryTree/BinaryTree";
import {useAppSelector} from "../../../store/hooks";
import {useDispatch} from "react-redux";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import {FC, useEffect, useState} from "react";
import PhoneRotate from "../../../assets/rotateTablet.svg";
import {calculateHeight, combineBSTPseudoCodes} from "../../../components/Simulation/BinaryTree/Helpers/Functions";
import BSTreeAnimationController from "../../../ClassObjects/BSTreeAnimationController";
import BSTreeControlsPanel from "../../../components/Simulation/ControlsPanels/BSTreeControlsPanel";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import {PseudoItem} from "../../../components/Simulation/PseudoCode/pc-helpers";
import HeapArray from "../../../components/Simulation/Heap/HeapArray/HeapArray";


const HeapPage: FC = () => {
    const root = useAppSelector((state) => state.bst.currentRoot);
    const currentActions = useAppSelector((state) => state.bst.currentActions);
    const currentAlg = useAppSelector((state) => state.bst.currentAlg);
    const currentLine = useAppSelector((state) => state.bst.currentLine);
    const currentRoles = useAppSelector((state) => state.bst.currentRoles);
    const visitedNodes = useAppSelector((state) => state.bst.visitedNodes);
    const passedNodes = useAppSelector((state) => state.bst.passedNodes);
    const traversalResults = useAppSelector((state) => state.bst.traversalResults);
    const isPlaying = useAppSelector(state => state.bst.isPlaying)
    const controller = BSTreeAnimationController.getController(
        root,
        useDispatch()
    );
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    // @ts-ignore
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
    const fitsAnimation = viewportWidth >= 1500;

    return (
        <>
            {fitsAnimation ?
                <>
                    <BSTreeControlsPanel controller={controller}/>
                    <div className="container mx-auto max-w-7xl px-0 py-0 mt-[400px]">
                        <BinaryTree
                            viewportWidth={viewportWidth}
                            root={root}
                            level={0}
                            height={calculateHeight(root)}
                            speed={controller.speed}
                            actions={currentActions}
                            roles={currentRoles}
                            isBST={true}
                            visitedNodes={visitedNodes}
                            passedNodes={passedNodes}
                        />
                    </div>
                    {traversalResults.length > 0 && <div className="container mx-auto max-w-7xl px-0 py-0 mt-72">
                           <p className="mr-56"><b>Traversal Results</b></p>
                            <HeapArray
                            items={traversalResults}
                            actions={currentActions}
                            speed={controller.speed}
                        />
                    </div>}
                    <PlayerControlsPanel controller={controller} isPlaying={isPlaying}/>
                   <div className="flex justify-end mr-5">
                        <div className=" w-fit">
                            <PseudoCodeContainer
                                line={currentLine}
                                code={combineBSTPseudoCodes(currentAlg) as PseudoItem[]}
                            />
                        </div>
                    </div>
                </>
                :
                <div
                    className="relative grid place-content-center place-items-center gap-2 before:bg-gradient-to-t before:from-teal-500/70 before:via-fuchsia-600 before:to-transparent before:blur-xl before:filter">
                    <h2 className="title text-3xl font-black text-lime-600">Min supported width for this simulation</h2>
                    <h2 className="cursive text-5xl font-thin text-lime-600">1500px current width : {viewportWidth}</h2>
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
