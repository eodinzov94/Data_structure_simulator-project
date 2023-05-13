import { Alert, Input } from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setInputArray, setInputDelete,
  setInputKey, setInputSearch,
} from "../../../store/reducers/alghoritms/bst-reducer";
import {
  generateRandomArrForHeap,
  getArrFromInputForHeap,
} from "../BinaryTree/Helpers/Functions";
import { sleep } from "../../../utils/animation-helpers";
import MediumCard from "../../UI/MediumCard";
import BSTreeAnimationController from "../../../ClassObjects/BSTreeAnimationController";

interface Props {
  controller: BSTreeAnimationController;
}

const buttonClassname =
  "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";
const BSTreeControlsPanel: FC<Props> = ({ controller }) => {
  const inputArray = useAppSelector((state) => state.bst.inputArray);
  const inputKey = useAppSelector((state) => state.bst.inputKey);
  const inputDelete = useAppSelector((state) => state.bst.inputDelete);
  const inputSearch = useAppSelector((state) => state.bst.inputSearch);
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
      await Animate("Create");
    } else {
      setCurrentError(res);
    }
  };

  const handleInput = (e: any) => {
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
    }, 1500);
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
      case "Create":
        await controller.build();
        return;
      case "Clear":
        await controller.setTreeFromInput([]);
        return;
      default:
        return;
    }
  };
  const randomizeInput = () => {
      controller.setTreeFromInput(generateRandomArrForHeap());
  }
  useEffect(() => { // create a random array whenever the page is loaded.
    randomizeInput();
  }, [])

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
      <MediumCard isSmaller={true} maxWidth={"max-w-5xl"}>
        <div className="flex justify-center">
          {["Min", "Max", "Successor", "Predecessor", "Clear"].map((text) => (
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
            <br />
            <button
              disabled={isButtonDisabled}
              className="mt-2 mr-2 bg-white hover:bg-lime-100 text-lime-800 font-semibold py-1 px-[5px] border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={randomizeInput}
            >
              Random
            </button>
            <Input
              placeholder="e.g 1,2,3,4,..."
              sx={{ width: "100px" }}
              value={inputArray}
              onChange={(e) => dispatch(setInputArray(e.target.value))}
            />
          </div>
          {["Search", "Insert", "DeleteNode"].map((text) => (
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
              <br />
              <Input
                sx={{ width: "25px", marginTop: "9px" }}
                // value={handleInput[text as "Search" | "Insert"| "DeleteNode"]}
                type="text"
                inputProps={{
                  min: 0,
                  max: 999,
                  style: { textAlign: "center" },
                }}
                // onChange={changeInputValue([text as "Search" | "Insert"| "DeleteNode"]}
              />
            </div>
          ))}
        </div>
      </MediumCard>
    </>
  );
};

export default BSTreeControlsPanel;
