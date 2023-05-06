import {Alert, Input} from "@mui/material";
import React, {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {setInputArray, setInputKey,} from "../../../store/reducers/alghoritms/heap-reducer";
import {generateRandomArrForHeap, getArrFromInputForHeap} from '../BinaryTree/Helpers/Functions'
import {sleep} from "../../../utils/animation-helpers";
import MediumCard from "../../UI/MediumCard";
import BSTreeAnimationController from "../../../ClassObjects/BSTreeAnimationController";

interface Props {
    controller: BSTreeAnimationController;
}
const buttonClassname = "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
const HeapControlsPanel: FC<Props> = ({ controller }) => {
    const inputArray = useAppSelector((state) => state.bst.inputArray);
    const inputKey = useAppSelector((state) => state.bst.inputKey);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useAppDispatch();
    const setCurrentError = (error: string) => {
        setError(error);
        setTimeout(() => {
            setError("");
        }, 5000);
    };
    const createBSTreeHandler = async () => {
        const res = getArrFromInputForHeap(15, inputArray);
        if (typeof res !== "string") {
            controller.setTreeFromInput(res);
            await Animate("Build-Max-Heap");
        } else {
            setCurrentError(res);
        }
    };

    const handleInputKey = (e: any) => {
        const val = Number(e.target.value);
        if (val < 1000 && val > -1) {
            dispatch(setInputKey(val));
        } else {
            setCurrentError("Please enter a number between 0 and 999");
        }
    };
    const handleDelete = (e: any) => {
        const val = Number(e.target.value);
        //TODO: implement delete
    };

    const Animate = async (animation: string) => {
        setIsButtonDisabled(true);
        await sleep(20);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 1500)
        switch (animation) {
            case "Search":
                await controller.search();
                return;
            case "Insert":
                await controller.insert();
                return;
            case "DeleteNode":
                await controller.deleteNode();
                return;
            case "Min":
                await controller.min();
                return;
            case "Max":
                await controller.max();
                return;
            case "Successor":
                await controller.successor();
                return;
            case "Predecessor":
                await controller.predecessor();
                return;
            case "Build":
                await controller.build();
                return;
            case "Clear":
                await controller.setTreeFromInput([]);
                return;
            default:
                return;
        }

    };
    return (
        <>
            {error && (
                <div className="flex absolute top-[48px] inset-0 justify-center py-10 ">
                    <Alert
                        severity="error"
                        color="error"
                        className="w-[670px] h-[50px]"
                        onClose={() => setError("")}
                    >
                        {error}
                    </Alert>
                </div>
            )}
            <MediumCard isSmaller={true} maxWidth={"max-w-3xl"}>
                <div className="flex">
                    { ["Search","Min","Max","Successor","Predecessor","Clear"].map((text) => (
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
                    <div className="py-2 px-2" key={"Build"}>
                        <button
                            disabled={isButtonDisabled}
                            className={ buttonClassname + " w-[200px]"}

                            //tailwind disabled class end
                            //disabled={isButtonDisabled}
                            onClick={createBSTreeHandler}
                        >
                            Build-Max-Heap
                        </button>
                        <br />
                        <button
                            disabled={isButtonDisabled}
                            className="mt-2 mr-2 bg-white hover:bg-lime-100 text-lime-800 font-semibold py-1 px-[5px] border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={async () => {
                                await controller.setTreeFromInput(generateRandomArrForHeap());
                                await Animate("Build-Max-Heap");
                            }}
                        >
                            Random
                        </button>
                        <Input
                            placeholder="e.g 1,2,3,4,..."
                            sx={{ width: "120px"}}
                            value={inputArray}
                            onChange={(e) => dispatch(setInputArray(e.target.value))}
                        />
                    </div>
                    { ["Insert","DeleteNode"].map((text) => (
                        <div className="py-2 px-2" key={text}>
                            <button
                                disabled={isButtonDisabled}
                                className={ buttonClassname }
                                onClick={async () =>
                                    await Animate(text).catch((e) =>
                                        setCurrentError(e.message)
                                    )
                                }
                            >
                                {text}
                            </button>
                            <br />
                            <Input
                                sx={{ width: "25px",marginTop:"9px" }}
                                value={inputKey}
                                type="text"
                                inputProps={{
                                    min: 0,
                                    max: 999,
                                    style: { textAlign: "center" },
                                }}
                                onChange={text==="Insert"?handleInputKey:handleDelete}
                            />
                        </div>
                    ))}


                </div>
            </MediumCard>
        </>
    );
};

export default HeapControlsPanel;
