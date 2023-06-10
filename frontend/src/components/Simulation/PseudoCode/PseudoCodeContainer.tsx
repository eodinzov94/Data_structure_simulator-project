import React, {FC} from "react";
import {PseudoCode} from "./PseudoCode";
import {Drawer} from "@mui/material";
import {PseudoItem} from "./pc-helpers";

interface Props {
    line: number;
    code: PseudoItem[];
}

const PseudoCodeContainer: FC<Props> = ({code, line}) => {
    return (
        <Drawer
            variant="permanent"
            elevation={11}
            anchor="right"
            hideBackdrop
            ModalProps={{disableEnforceFocus: true}}
            PaperProps={{
                style: {
                    minWidth: "fit-content",
                    height: "auto",
                    top: "265px",
                    marginRight: -50,
                    border:"none",
                    background:"transparent",
                    padding: 50
                },
            }}
        >
            <PseudoCode line={line} code={code}/>
        </Drawer>
    );
};

export default PseudoCodeContainer;
