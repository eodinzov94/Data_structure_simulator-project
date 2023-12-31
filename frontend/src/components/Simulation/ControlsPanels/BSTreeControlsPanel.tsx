import CasinoIcon from "@mui/icons-material/Casino";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TextField, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import React, { FC, useEffect, useState } from "react";
import BSTreeAnimationController from "../../../ClassObjects/BSTreeAnimationController";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setError,
  setInput,
  setInputArray
} from "../../../store/reducers/alghoritms/bst-reducer";
import { AlertError } from "../../UI/Controls/AlertError";
import { theme } from "../../UI/Controls/ControlsTheme";
import { ControlsToolTip } from "../../UI/Controls/ControlsToolTip";
import MediumCard from "../../UI/MediumCard";
import {
  generateRandomArrForHeap,
  getArrFromInputForHeap,
} from "../BinaryTree/Helpers/Functions";
import { randomBuildTree } from "../BST/BST_Algorithms";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";

interface Props {
  controller: BSTreeAnimationController;
  isButtonDisabled: boolean;
}



const buttonClassname =
  "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";
/**
* Renders the controls panel for the binary search tree.
*
* @param {Props} props - The props object.
* @param {Controller} props.controller - The controller object.
* @param {boolean} props.isButtonDisabled - Determines if the button is disabled.
* @return {JSX.Element} The BSTreeControlsPanel component.
*/
const BSTreeControlsPanel: FC<Props> = ({ controller, isButtonDisabled }) => {
  const [regsterActivity] = useRegisterActivityMutation()
  const inputArray = useAppSelector((state) => state.bst.inputArray);
  const inputValues = useAppSelector((state) => state.bst.inputValues);
  const error = useAppSelector((state) => state.bst.error);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const setCurrentError = (error: string) => {
    dispatch(setError(error));
    setTimeout(() => {
      dispatch(setError(""));
    }, 5000);
  };
  /**
 * This function handles the creation of a Binary Search Tree from an input array.
 *
 * @return {Promise<void>} Returns nothing.
 */
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
    const key = e.target.name;
    if (val < 1000 && val > -1) {
      dispatch(setInput({ val, key }));
    } else {
      setCurrentError("Please enter a number between 0 and 999");
    }
  };
  /**
   * Executes a specific animation based on the given string parameter.
   *
   * @param {string} animation - the name of the animation to be executed
   * @return {Promise<void>} returns a Promise that resolves when the animation is complete
   * and rejects with an error message in case of any exception
   */
  const Animate = async (animation: string) => {
    try {
      switch (animation) {
        case "Search":
          regsterActivity({
            subject: "BST",
            algorithm: "Search",
          })
          await controller.search(inputValues.Search);
          return;
        case "Insert":
          regsterActivity({
            subject: "BST",
            algorithm: "Insert"
          })
          await controller.insert(inputValues.Insert);
          return;
        case "DeleteNode":
          regsterActivity({
            subject: "BST",
            algorithm: "DeleteNode"
          })
          await controller.deleteNode(inputValues.DeleteNode);
          return;
        case "Min":
          regsterActivity({
            subject: "BST",
            algorithm: "Min"
          })
          await controller.min();
          return;
        case "Max":
          regsterActivity({
            subject: "BST",
            algorithm: "Max"
          })
          await controller.max();
          return;
        case "Successor":
          regsterActivity({
            subject: "BST",
            algorithm: "Successor"
          })
          await controller.successor(inputValues.Successor);
          return;
        case "Predecessor":
          regsterActivity({
            subject: "BST",
            algorithm: "Predecessor"
          })
          await controller.predecessor(inputValues.Predecessor);
          return;
        case "Clear":
          await controller.setTreeFromInput([]);
          return;
        case "Inorder":
          regsterActivity({
            subject: "BST",
            algorithm: "Inorder"
          })
          await controller.inorder();
          return;
        case "Preorder":
          regsterActivity({
            subject: "BST",
            algorithm: "Preorder"
          })
          await controller.preorder();
          return;
        case "Postorder":
          regsterActivity({
            subject: "BST",
            algorithm: "Postorder"
          })
          await controller.postorder();
          return;
        default:
          return;
      }
    } catch (e: any) {
      setCurrentError(e.message);
    }
  };
  const randomizeInput = () => {
    controller.setTreeFromInput(
      [],
      randomBuildTree(generateRandomArrForHeap())
    );
  };
  useEffect(() => {
    // create a random array whenever the page is loaded.
    controller.setTreeFromInput([2, 1, 3]);
  }, []);

  return (
    <>
      {error && (
        <AlertError error={error} onClose={() => setCurrentError("")} />
      )}
      <MediumCard isSmaller={true} maxWidth={"max-w-5xl"}>
        <ThemeProvider theme={theme} >
          <ControlsToolTip isButtonDisabled={isButtonDisabled}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="algorithms and actions"
                    centered
                  >
                    <Tab label="BST construction" value="1" />
                    <Tab label="Min / Max" value="2" />
                    <Tab label="Traversals" value="3" />
                    <Tab label="Successor" value="Successor" />
                    <Tab label="Predecessor" value="Predecessor" />
                    <Tab label="Search" value="Search" />
                    <Tab label="Insert" value="Insert" />
                    <Tab label="Delete" value="DeleteNode" />
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  className={value === "1" ? "justify-start " : "hidden"}
                >
                  <TextField
                    placeholder="e.g 1,2,3,4,..."
                    size={"small"}
                    sx={{ width: "150px" }}
                    value={inputArray}
                    label="Build-BST"
                    variant="outlined"
                    onChange={(e) => dispatch(setInputArray(e.target.value))}
                  />
                  <button
                    disabled={isButtonDisabled}
                    className={buttonClassname + " w-[40px] h-[40px]"}
                    onClick={createBSTreeHandler}
                  >
                    Go
                  </button>
                  <button
                    disabled={isButtonDisabled}
                    className={buttonClassname + " w-[140px] h-[40px] ml-8"}
                    onClick={randomizeInput}
                  >
                    <CasinoIcon />
                    Randomize
                  </button>
                  <button
                    disabled={isButtonDisabled}
                    className={buttonClassname + " w-[60px] h-[40px] ml-8"}
                    onClick={async () => await Animate("Clear")}
                  >
                    Clear
                  </button>
                </TabPanel>
                <TabPanel
                  value="2"
                  className={
                    value === "2" ? "flex flex-row justify-center " : "hidden"
                  }
                >
                  {["Min", "Max"].map((text) => (
                    <div className="py-2 px-6" key={text}>
                      <button
                        disabled={isButtonDisabled}
                        className={buttonClassname + " w-[60px] h-[40px]"}
                        onClick={async () => await Animate(text)}
                      >
                        {text}
                      </button>
                    </div>
                  ))}
                </TabPanel>
                <TabPanel
                  value="3"
                  className={
                    value === "3" ? "flex flex-row justify-center " : "hidden"
                  }
                >
                  {["Inorder", "Preorder", "Postorder"].map((text) => (
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
                </TabPanel>
                {[
                  "Successor",
                  "Predecessor",
                  "Search",
                  "Insert",
                  "DeleteNode",
                ].map((text) => (
                  <TabPanel
                    value={text}
                    className={value === text ? "justify-start " : "hidden"}
                  >
                    <TextField
                      sx={{ width: "100px" }}
                      name={text as "Search" | "Insert" | "DeleteNode"}
                      size="small"
                      value={
                        inputValues[text as "Search" | "Insert" | "DeleteNode"]
                      }
                      type="text"
                      variant="outlined"
                      label={text}
                      inputProps={{
                        min: 0,
                        max: 999,
                        style: { textAlign: "center" },
                      }}
                      onChange={handleInput}
                    />
                    <button
                      disabled={isButtonDisabled}
                      className={buttonClassname + " w-[40px] h-[40px]"}
                      onClick={async () =>
                        await Animate(text).catch((e) =>
                          setCurrentError(e.message)
                        )
                      }
                    >
                      Go
                    </button>
                  </TabPanel>
                ))}
              </TabContext>
            </Box>
          </ControlsToolTip>
        </ThemeProvider>
      </MediumCard>
    </>
  );
};

export default BSTreeControlsPanel;
