import BinaryTree from "../../../components/Simulation/BinaryTree/BinaryTree";
import {useAppSelector} from "../../../store/hooks";
import {useDispatch} from "react-redux";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import {FC, useEffect, useState} from "react";
import PhoneRotate from "../../../assets/rotateTablet.svg";
import {calculateHeight} from "../../../components/Simulation/BinaryTree/Helpers/Functions";
import BSTreeAnimationController from "../../../ClassObjects/BSTreeAnimationController";


const HeapPage: FC = () => {
    const root = useAppSelector((state) => state.bst.currentRoot);
    const currentActions = useAppSelector((state) => state.bst.currentActions);
    const currentAlg = useAppSelector((state) => state.bst.currentAlg);
    const currentLine = useAppSelector((state) => state.bst.currentLine);
    const currentRoles = useAppSelector((state) => state.bst.currentRoles);
    const controller = BSTreeAnimationController.getController(
        root,
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
    const fitsAnimation = viewportWidth >= 1120;

    return (
        <>
            {fitsAnimation ?
                <>
                    {/* TODO: <BSTreeControlsPanel controller={controller}/>*/}
                    <div className="container mx-auto max-w-7xl px-0 py-0">
                        <BinaryTree
                            viewportWidth={viewportWidth}
                            root={root}
                            level={0}
                            height={calculateHeight(root)}
                            speed={controller.speed}
                            actions={currentActions}
                            roles={currentRoles}
                        />
                    </div>
                    <PlayerControlsPanel controller={controller}/>
                    {/*TODO:<div className="flex justify-end mr-5">*/}
                    {/*    <div className=" w-fit">*/}
                    {/*        <PseudoCodeContainer*/}
                    {/*            line={currentLine}*/}
                    {/*            code={combinePseudoCodes(currentAlg)}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </>
                :
                <div
                    className="relative grid place-content-center place-items-center gap-2 before:bg-gradient-to-t before:from-teal-500/70 before:via-fuchsia-600 before:to-transparent before:blur-xl before:filter">
                    <h2 className="title text-3xl font-black text-lime-600">Min supported width for this simulation</h2>
                    <h2 className="cursive text-5xl font-thin text-lime-600">1120px current width : {viewportWidth}</h2>
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
