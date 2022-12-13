import { useState } from "react";
import Stack from "../components/Simulation/Stack/Stack";
import { StackItem } from "../components/Simulation/Stack/Stack";
import { AnimatePresence, motion } from "framer-motion";
import StackPanelControl from "../components/Simulation/Stack/StackPanelControl";

//The stack page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code

const StackPage = () => {
  const [data, setData] = useState<StackItem[]>([]); //data of the stack
  const [isPop, setIsPop] = useState<boolean>(false);

  const popFromStack = () => {
    if (data.length > 0) {
      //if the stack is not empty
      //copy data and remove first element
      setIsPop(false);
      const new_data = [...data];
      new_data.splice(0, 1);
      setData(new_data); //update data

      setIsPop(true);

      setTimeout(() => {
        setIsPop(false);
      }, 2000);
    }
  };

  const pushToStack = (value: string) => {
    //add new elment at the start
    const key = data.length;
    const new_data = [{ value, key }, ...data];
    setData(new_data);
  };

  return (
    <>
      {/*top section */}
      <StackPanelControl
        isPopEnabled={isPop}
        popHandler={popFromStack}
        pushToStack={pushToStack}
      />

      <div className="container mx-auto max-w-7xl px-0 md: py-10">
        <div className="flex flex-nowrap">
          {/*middle section */}
          <Stack items={data} />

          {/*rigth section */}
          <div className="basis-4/12">
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

export default StackPage;
