import {
  Alert,
  Drawer,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import React, { FC, useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import HeapAnimationController from "../../../ClassObjects/HeapAnimationController";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setInputArray,
  setInputKey,
} from "../../../store/reducers/alghoritms/heap-reducer";
import { getArrFromInputForHeap } from "../BinaryTree/Helpers/Functions";
import { sleep } from '../../../utils/animation-helpers'
interface Props {
  controller: HeapAnimationController;
}

const HeapControlsPanel: FC<Props> = ({ controller }) => {
  const [open, setOpen] = useState(true);
  const inputArray = useAppSelector((state) => state.heap.inputArray);
  const inputKey = useAppSelector((state) => state.heap.inputKey);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
 const  setCurrentError = (error:string) => {
   setError(error)
   setTimeout(() => {
     setError('')
   }, 2000);
 }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const createHeapHandler = async () => {
    const res = getArrFromInputForHeap(25, inputArray);
    if (typeof res !== "string") {
      controller.setArray(res);
      await Animate("Build-Max-Heap");
    } else {
      setCurrentError(res)
    }
  };

  const handleInputKey = (e: any) => {
    const val = Number(e.target.value);
    if (val < 1000 && val > -1) {
      dispatch(setInputKey(val));
    } else {
      setCurrentError("Please enter a number between 0 and 999")
    }
  };

  const Animate = async (animation: string) => {
    await sleep(400)
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
      default:
        return;
    }
  };
  return (
    <>
      {open ? (
        <Drawer
          variant="persistent"
          elevation={11}
          anchor="left"
          open={open}
          hideBackdrop
          ModalProps={{ disableEnforceFocus: true }}
          PaperProps={{
            style: {
              height: "auto",
              top: "25%",
              border: "2px solid #84cc16",
              borderRadius: "20px",
              marginLeft: 5,
            },
          }}
        >
          <div className="flex justify-end">
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft className="bg-lime-400 rounded-full" />
            </IconButton>
          </div>
          {error && <Alert severity="error" color="error" onClose={()=>setError('')}>
            {error}
          </Alert>}
          <List>
            <ListItem key={"Build-Max-Heap"}>
              <div className="flex justify-end items-center">
                <ListItemText primary={"Build-Max-Heap"} />
                <Input
                  className="ml-5 mr-2"
                  placeholder="e.g 1,2,3,4,..."
                  value={inputArray}
                  onChange={(e) => dispatch(setInputArray(e.target.value))}
                />
                <ListItemButton className="w-15" onClick={createHeapHandler}>
                  GO
                </ListItemButton>
              </div>
            </ListItem>
            {["Heap-Max", "Extract-Max", "Heap-Sort"].map((text) => (
              <ListItem key={text}>
                <div className="flex justify-end items-center">
                  <ListItemText>{text}</ListItemText>
                  <ListItemButton
                    className="w-15"
                    onClick={async () => await Animate(text)}
                  >
                    GO
                  </ListItemButton>
                </div>
              </ListItem>
            ))}
            <ListItem key={"Insert Key"}>
              <ListItemText primary={"Insert Key"} />
              <Input
                className="ml-5 mr-2"
                placeholder="e.g 1,2,3,4,..."
                value={inputKey}
                type = 'text'
                inputProps={{
                  min: 0,
                  max: 999,
                }}
                onChange={handleInputKey}
              />
              <ListItemButton
                className="w-2"
                onClick={async () => await Animate("Insert Key")}
              >
                GO
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      ) : (
        <div className="flex justify-start absolute top-1/4">
          <IconButton onClick={handleDrawerOpen}>
            <ChevronRight color="action" className="bg-lime-400 rounded-full" />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default HeapControlsPanel;
