import { useState } from "react";
import { motion } from "framer-motion";
import Queue from "../components/Simulation/Queue/Queue";
import ControlsPanel, {
    Item,
} from "../components/Simulation/ControlsPanels/SqControlsPanel";
import Heap from "../components/Simulation/Heap/Heap";

const MAX_ELEMENTS = 10;

//The Queue page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code
export interface Position {
    curr: number;
    prev: number;
}

const QueuePage = () => {
    //TODO: finish this page

    const [data, setData] = useState<Item[]>([]); //data of the stack
    const [isPop, setIsPop] = useState<boolean>(false);
    const [keyValue, setKeyValue] = useState<number>(0);
    const [headPosition, setHeadPosition] = useState<Position>({
        curr: 0,
        prev: 35,
    });
    const [tailPosition, setTailPosition] = useState<number>(-35);

    //   const [xPosition, setXPosition] = useState(35);
    //   const [xPrevPosition, setXPrevPosition] = useState(70);

    const Dequeue = () => {
        if (data.length > 0) {
            //if the stack is not empty
            //copy data and remove first element
            setIsPop(false);
            const new_data = [...data];
            new_data.splice(0, 1);
            setData(new_data); //update data
            setHeadPosition((prevState) => {
                return { curr: prevState.curr + 35, prev: prevState.curr };
            });
            setTailPosition((prevState) => {
                return prevState-35;
            });
            setIsPop(true);

            setTimeout(() => {
                setIsPop(false);
            }, 2000);
        }
    };

    const Enqueue = (value: string) => {
        if (data.length === MAX_ELEMENTS) {
            window.alert(`A maximum of ${MAX_ELEMENTS} values can be entered`);
        } else {
            //add new elment at the start
            const new_data = [...data, { value, key: keyValue }];
            setKeyValue((prevState) => {
                return prevState + 1;
            });
            setHeadPosition((prevState) => {
                return { curr: prevState.curr - 35, prev: prevState.curr };
            });
            setTailPosition((prevState) => {
                return prevState+35;
            });
            setData(new_data);
        }
    };

    const setRandomInput = (newData: Item[]) => {
        setData(newData);
        setKeyValue(newData.length);

        //fix positions
        setHeadPosition((prevState) => {
            return { curr: -35 * newData.length, prev: prevState.curr };
        });

        //fix positions
        setTailPosition((prevState) => {
            return  -35 + 35 * newData.length;
        });
    };

    return (
        <>
            {/*top section */}
            {/*<ControlsPanel/>*/}

            <div className="container mx-auto max-w-7xl px-0 md: py-0">
                {/*middle section */}
                <div className="flex flex-nowrap">
                    <Heap />

                </div>
                {/*bottom section */}
            </div>
        </>
    );
};

export default QueuePage;
