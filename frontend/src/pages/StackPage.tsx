import { useState } from "react";
import Stack from "../components/Simulation/Stack/Stack";
import StackPanelControl from "../components/Simulation/Stack/StackPanelControl";
import { StackItem } from "../components/Simulation/Stack/Stack";
import { AnimatePresence, motion } from "framer-motion";

//need to creat a componnent for stack & queue that get name and function for 2 buttons, and display 2 button and input number box

const StackPage = () => {
  const [data, setData] = useState<StackItem[]>([]);
  const [isPop, setIsPop] = useState<boolean>(false);

  const popFromStack = () => {
    if (data.length > 0) {
      const new_data = [...data];
      new_data.splice(0, 1); //remove first - index=0
      setData(new_data);
      setIsPop(true);
      setTimeout(() => {
        setIsPop(false);
      }, 2500);
    }
  };

  const pushToStack = (value: string) => {
    const key = data.length;
    const new_data = [{ value, key }, ...data];
    setData(new_data);
  };

  return (
    <>
      <h1>STACK PAGE</h1>
      <div className="container mx-auto max-w-7xl px-0 md: py-20">
        <div className="flex flex-nowrap">
          <StackPanelControl
            popHandler={popFromStack}
            pushToStack={pushToStack}
          />
          <Stack items={data} />
          <div className="basis-4/12">
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
                  duration: 2.5,
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
                  duration: 2.5,
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

export default StackPage;
function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
