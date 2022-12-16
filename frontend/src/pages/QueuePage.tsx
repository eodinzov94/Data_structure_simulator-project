import { useEffect, useState } from "react";
import { StackItem } from "../components/Simulation/Stack/Stack";
import { AnimatePresence, motion } from "framer-motion";
import Queue from "../components/Simulation/Queue/Queue";
import ControlsPanel from "../components/Simulation/ControlsPanels/SqControlsPanel";

//The stack page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code
export interface Position {
  curr: number;
  prev: number;
}

const QueuePage = () => {
  const [data, setData] = useState<StackItem[]>([]); //data of the stack
  const [isPop, setIsPop] = useState<boolean>(false);
  const [keyValue, setKeyValue] = useState<number>(0);
  const [headPosition, setHeadPosition] = useState<Position>({
    curr: 0,
    prev: 35,
  });
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
      setIsPop(true);

      setTimeout(() => {
        setIsPop(false);
      }, 2000);
    }
  };

  const Enqueue = (value: string) => {
    //add new elment at the start
    const new_data = [...data, { value, key: keyValue }];
    setKeyValue((prevState) => {
      return prevState + 1;
    });
    setHeadPosition((prevState) => {
        return { curr: prevState.curr - 35, prev: prevState.curr };
      });
    setData(new_data);
  };

  return (
    <>
      {/*top section */}
      <ControlsPanel
        removeHandler={Dequeue}
        addHandler={Enqueue}
        isRemovedEnabled={isPop}
        addBtnText={"Enqueue"}
        removeBtnText={"Dequeue"}
      />

      <div className="container mx-auto max-w-7xl px-0 md: py-0">
        <div className="flex flex-nowrap">
          {/*middle section */}
          <Queue
            headPosition={headPosition}
            items={data}
          />

          {/*rigth section */}
          <div className="basis-3/12">
            Pseudo code:
            <ul>
              <motion.li
                initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                animate={
                  isPop
                    ? {
                        backgroundColor: ["#bef264", "rgba(0,0,0,0)"],
                      }
                    : {}
                }
                transition={{
                  // duration: 2.5,
                  duration: 2,
                }}
              >
                {"if (!stack.isEmpty()):"}
              </motion.li>
              <motion.li
                initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                animate={
                  isPop
                    ? {
                        backgroundColor: ["rgba(0,0,0,0)", "#bef264"],
                      }
                    : {}
                }
                transition={{
                  // duration: 2.5,
                  delay: 0.5,
                  duration: 0.5,
                }}
              >
                {"    return arr[size-1];"}
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueuePage;
