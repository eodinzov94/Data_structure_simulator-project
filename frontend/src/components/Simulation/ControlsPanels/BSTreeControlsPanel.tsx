import {Alert, Input} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {setError, setInput, setInputArray,} from "../../../store/reducers/alghoritms/bst-reducer";
import {generateRandomArrForHeap, getArrFromInputForHeap,} from "../BinaryTree/Helpers/Functions";
import {sleep} from "../../../utils/animation-helpers";
import MediumCard from "../../UI/MediumCard";
import BSTreeAnimationController from "../../../ClassObjects/BSTreeAnimationController";
import {randomBuildTree} from "../BST/BST_Algorithms";

interface Props {
    controller: BSTreeAnimationController;
}

const buttonClassname =
    "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";
const BSTreeControlsPanel: FC<Props> = ({controller}) => {
    const inputArray = useAppSelector((state) => state.bst.inputArray);
    const inputValues = useAppSelector((state) => state.bst.inputValues);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const error = useAppSelector((state) => state.bst.error);
    const dispatch = useAppDispatch();

    const setCurrentError = (error: string) => {
        dispatch(setError(error));
        setTimeout(() => {
            dispatch(setError(""));
        }, 5000);
    };
    const createBSTreeHandler = async () => {
        const res = getArrFromInputForHeap(15, inputArray);
        if (typeof res !== "string") {
            try {
                controller.setTreeFromInput(res);
            } catch (e: any) {
                setCurrentError(e.message);
            }

        } else {
            setCurrentError(res);
        }
    };

    const handleInput = (e: any) => {
        const val = Number(e.target.value);
        const key = e.target.name
        if (val < 1000 && val > -1) {
            dispatch(setInput({val, key}));
        } else {
            setCurrentError("Please enter a number between 0 and 999");
        }
    };

    const Animate = async (animation: string) => {
        setIsButtonDisabled(true);
        await sleep(20);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 1500);
        try {
            switch (animation) {
                case "Search":
                    await controller.search(inputValues.Search);
                    return;
                case "Insert":
                    await controller.insert(inputValues.Insert);
                    return;
                case "DeleteNode":
                    await controller.deleteNode(inputValues.DeleteNode);
                    return;
                case "Min":
                    await controller.min();
                    return;
                case "Max":
                    await controller.max();
                    return;
                case "Successor":
                    await controller.successor(inputValues.Successor);
                    return;
                case "Predecessor":
                    await controller.predecessor(inputValues.Predecessor);
                    return;
                case "Clear":
                    await controller.setTreeFromInput([]);
                    return;
                case "Inorder":
                    await controller.inorder()
                    return;
                case "Preorder":
                    await controller.preorder()
                    return;
                case "Postorder":
                    await controller.postorder()
                    return;
                default:
                    return;
            }

        } catch (e: any) {
                setCurrentError(e.message);
        }
    };
    const randomizeInput = () => {
        controller.setTreeFromInput([], randomBuildTree(generateRandomArrForHeap()));
    }
    useEffect(() => { // create a random array whenever the page is loaded.
        controller.setTreeFromInput([2, 1, 3])
    }, [])

    return (
        <>
            {error && (
                <div className="flex absolute top-[48px] inset-0 justify-center py-10 ">
                    <Alert
                        severity="error"
                        color="error"
                        className="w-[670px] h-[50px]"
                        onClose={() => dispatch(setError(""))}
                    >
                        {error}
                    </Alert>
                </div>
            )}
            <MediumCard isSmaller={true} maxWidth={"max-w-7xl"}>
                <div className="flex justify-center">
                    {["Min", "Max", "Clear", "Inorder", "Preorder", "Postorder"].map((text) => (
                        <div className="py-2 px-2" key={text}>
                            <button
                                disabled={isButtonDisabled}
                                className={buttonClassname}
                                onClick={async () => await Animate(text)}
                            >
                                {text}
                            </button>
                        </div>
                    ))}
                    <div className="py-2 px-2" key={"Create"}>
                        <button
                            disabled={isButtonDisabled}
                            className={buttonClassname + " w-[200px]"}
                            onClick={createBSTreeHandler}
                        >
                            Create
                        </button>
                        <br/>
                        <button
                            disabled={isButtonDisabled}
                            className="mt-2 mr-2 bg-white hover:bg-lime-100 text-lime-800 font-semibold py-1 px-[5px] border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={randomizeInput}
                        >
                            Random
                        </button>
                        <Input
                            placeholder="e.g 1,2,3,4,..."
                            sx={{width: "100px"}}
                            value={inputArray}
                            onChange={(e) => dispatch(setInputArray(e.target.value))}
                        />
                    </div>
                    {["Successor", "Predecessor", "Search", "Insert", "DeleteNode"].map((text) => (
                        <div className="py-2 px-2" key={text}>
                            <button
                                disabled={isButtonDisabled}
                                className={buttonClassname}
                                onClick={async () =>
                                    await Animate(text).catch((e) => setCurrentError(e.message))
                                }
                            >
                                {text}
                            </button>
                            <br/>
                            <Input
                                sx={{width: "25px", marginTop: "9px"}}
                                value={inputValues[text as "Search" | "Insert" | "DeleteNode"]}
                                name={text as "Search" | "Insert" | "DeleteNode"}
                                type="text"
                                inputProps={{
                                    min: 0,
                                    max: 999,
                                    style: {textAlign: "center"},
                                }}
                                onChange={handleInput}
                            />
                        </div>
                    ))}
                </div>
            </MediumCard>
        </>
    );
};

export default BSTreeControlsPanel;
