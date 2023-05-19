import { Alert, Input } from "@mui/material";
import React, { FC, useState } from "react";
import HeapAnimationController from "../../../ClassObjects/HeapAnimationController";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setInputArray,
  setInputKey,
} from "../../../store/reducers/alghoritms/heap-reducer";
import { generateRandomArrForHeap, getArrFromInputForHeap } from '../BinaryTree/Helpers/Functions'
import { sleep } from "../../../utils/animation-helpers";
import MediumCard from "../../UI/MediumCard";

interface Props {
  controller: HeapAnimationController;
}
const buttonClassname = "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
const HeapControlsPanel: FC<Props> = ({ controller }) => {
  const inputArray = useAppSelector((state) => state.heap.inputArray);
  const inputKey = useAppSelector((state) => state.heap.inputKey);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const setCurrentError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 5000);
  };
  const createHeapHandler = async () => {
    const res = getArrFromInputForHeap(15, inputArray);
    if (typeof res !== "string") {
      controller.setArrFromInput(res);
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

  const Animate = async (animation: string) => {
    setIsButtonDisabled(true);
    await sleep(20);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1500)
    switch (animation) {
      case "Build-Max-Heap":
        await controller.buildMaxHeap();
        return;
      case "Heap-Max":
        await controller.heapMax();
        return;
      case "Extract-Max":
        await controller.extractMax();
        return;
      case "Insert Key":
        await controller.insertKey(inputKey);
        return;
      case "Heap-Sort":
        await controller.heapSort();
        return;
      case "Clear":
        await controller.setArrFromInput([]);
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
          {["Heap-Max", "Extract-Max", "Heap-Sort", "Clear"].map((text) => (
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
          <div className="py-2 px-2" key={"Build-Max-Heap"}>
            <button
              disabled={isButtonDisabled}
              className={ buttonClassname + " w-[200px]"}

                   //tailwind disabled class end
                   //disabled={isButtonDisabled}
              onClick={createHeapHandler}
            >
              Build-Max-Heap
            </button>
            <br />
            <button
                   disabled={isButtonDisabled}
                   className="mt-2 mr-2 bg-white hover:bg-lime-100 text-lime-800 font-semibold py-1 px-[5px] border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
                   onClick={async () => {
                     await controller.setArrFromInput(generateRandomArrForHeap());
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
          <div className="py-2 px-2" key={"Insert Key"}>
            <button
              disabled={isButtonDisabled}
              className={ buttonClassname }
              onClick={async () =>
                await Animate("Insert Key").catch((e) => {
                      console.log(e)
                      setCurrentError("Array size overflow, max is 15.")
                    }
                )
              }
            >
              Insert Key
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
              onChange={handleInputKey}
            />
          </div>
        </div>
      </MediumCard>
    </>
  );
};

export default HeapControlsPanel;
