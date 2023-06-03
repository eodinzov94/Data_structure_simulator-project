import { Alert, createTheme, TextField, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import CasinoIcon from "@mui/icons-material/Casino";
import TabPanel from "@mui/lab/TabPanel";
import React, { FC, useState } from "react";
import HeapAnimationController from "../../../ClassObjects/HeapAnimationController";
import Tooltip from "@mui/material/Tooltip";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setInputArray,
  setInputKey,
} from "../../../store/reducers/alghoritms/heap-reducer";
import {
  generateRandomArrForHeap,
  getArrFromInputForHeap,
} from "../BinaryTree/Helpers/Functions";
import MediumCard from "../../UI/MediumCard";

interface Props {
  controller: HeapAnimationController;
  isButtonDisabled: boolean;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#78ab3a",
    },
    secondary: {
      main: "#78ab3a",
    },
  },
});
const buttonClassname =
  "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";
const HeapControlsPanel: FC<Props> = ({ controller, isButtonDisabled }) => {
  const inputArray = useAppSelector((state) => state.heap.inputArray);
  const inputKey = useAppSelector((state) => state.heap.inputKey);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
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
      <MediumCard isSmaller={true} maxWidth={"max-w-[530px]"}>
        <ThemeProvider theme={theme}>
          <Tooltip
            title="Controls are disabled during simulation"
            arrow
            disableHoverListener={!isButtonDisabled}
          >
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="algorithms and actions"
                    centered
                  >
                    <Tab label="Heap construction" value="1" />
                    <Tab label="Algorithms" value="2" />
                    <Tab label="Insert" value="3" />
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
                    onChange={(e) => dispatch(setInputArray(e.target.value))}
                    label="Build-Max-Heap"
                    variant="outlined"
                  />
                  <button
                    disabled={isButtonDisabled}
                    className={buttonClassname + " w-[40px] h-[40px]"}
                    onClick={createHeapHandler}
                  >
                    Go
                  </button>

                  <button
                    disabled={isButtonDisabled}
                    className={buttonClassname + " w-[140px] h-[40px] ml-8"}
                    onClick={async () => {
                      await controller.setArrFromInput(
                        generateRandomArrForHeap()
                      );
                      await Animate("Build-Max-Heap");
                    }}
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
                  {["Heap-Max", "Extract-Max", "Heap-Sort"].map((text) => (
                    <div className="px-2" key={text}>
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
                <TabPanel
                  value="3"
                  className={value === "3" ? "justify-start " : "hidden"}
                >
                  <TextField
                    sx={{ width: "100px" }}
                    size="small"
                    value={inputKey}
                    type="number"
                    variant="outlined"
                    label="Input-Key"
                    inputProps={{
                      min: 0,
                      max: 999,
                      style: { textAlign: "center" },
                    }}
                    onChange={handleInputKey}
                  />
                  <button
                    disabled={isButtonDisabled}
                    className={buttonClassname + " w-[40px] h-[40px]"}
                    onClick={async () =>
                      await Animate("Insert Key").catch((e) => {
                        console.log(e);
                        setCurrentError("Array size overflow, max is 15.");
                      })
                    }
                  >
                    Go
                  </button>
                </TabPanel>
              </TabContext>
            </Box>
          </Tooltip>
        </ThemeProvider>
      </MediumCard>
    </>
  );
};

export default HeapControlsPanel;
