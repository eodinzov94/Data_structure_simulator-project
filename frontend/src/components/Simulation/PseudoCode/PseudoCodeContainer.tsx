import React, { FC, useState } from "react";
import { PseudoCode} from "./PseudoCode";
import { Drawer, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { PseudoItem } from "./pc-helpers";

interface Props {
  line: number;
  code: PseudoItem[];
}

const PseudoCodeContainer: FC<Props> = ({ code, line }) => {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      {open ? (
        <Drawer
          variant="persistent"
          elevation={11}
          anchor="right"
          open={open}
          hideBackdrop
          ModalProps={{ disableEnforceFocus: true }}
          PaperProps={{
            style: {
              minWidth: "300px",
              height: "auto",
              top: "265px",
              border: "2px solid #84cc16",
              borderRadius: "20px",
              marginRight: 5,
              padding: 10,
              position:"absolute"
            },
          }}
        >
          <div className="flex justify-end">
            <IconButton onClick={handleDrawerClose}>
              <ChevronRight color="action" className="bg-lime-400 rounded-full" />
            </IconButton>
          </div>
          <PseudoCode line={line} code={code} />
        </Drawer>
      ) : (
        <div className="absolute top-[265px] right-1">
          <IconButton onClick={handleDrawerOpen}>
            <ChevronLeft className="bg-lime-400 rounded-full" />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default PseudoCodeContainer;
