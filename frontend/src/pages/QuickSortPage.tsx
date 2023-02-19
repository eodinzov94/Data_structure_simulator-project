import { useState } from "react";
import { motion } from "framer-motion";
import ControlsPanel, {
  Item,
} from "../components/Simulation/ControlsPanels/SqControlsPanel";
import QuickSort from "../components/Simulation/Sorts/QuickSort/QuickSort";
import { sortItem } from "../components/Simulation/Sorts/types";

const MAX_ELEMENTS = 10;

//The Queue page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code
export interface Position {
  curr: number;
  prev: number;
}

const QuickSortPage = () => {
  const [data, setData] = useState<sortItem[]>([]); //data of the array
  const [isPop, setIsPop] = useState<boolean>(false);
  const [keyValue, setKeyValue] = useState<number>(0);

  const Dequeue = () => {
    // if (data.length > 0) {
    //   //if the stack is not empty
    //   //copy data and remove first element
    //   setIsPop(false);
    //   const new_data = [...data];
    //   new_data.splice(0, 1);
    //   setData(new_data); //update data
    //   setIsPop(true);

    //   setTimeout(() => {
    //     setIsPop(false);
    //   }, 2000);
    // }
    replace(2, 0);
  };

  const Enqueue = (value: string) => {
    if (data.length === MAX_ELEMENTS) {
      window.alert(`A maximum of ${MAX_ELEMENTS} values can be entered`);
    } else {
      //add new elment at the start
      const new_data = [...data, { value, key: keyValue, isSelected: false }];
      setKeyValue((prevState) => {
        return prevState + 1;
      });
      setData(new_data);
    }
  };

  const setRandomInput = (newData: sortItem[]) => {
    setData(newData);
    setKeyValue(newData.length);
  };

  const replace = (index1: number, index2: number) => {
    setData((prevState) => {
      const newData1 = [...prevState];
      newData1[index1].isSelected = true;
      newData1[index2].isSelected = true;
      return newData1;
    });
    let timer = setTimeout(() => {
      setTimeout(() => {
        setData((prevState) => {
          const newData1 = [...prevState];
          newData1[index1].isSelected = false;
          newData1[index2].isSelected = false;
          return newData1;
        });
      }, 2000);
      setData((prevState) => {
        {
          const newData = [...prevState];
          let x = newData[index1];
          newData[index1] = newData[index2];
          newData[index2] = x;
          return newData;
        }
      });
    }, 500);
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
        maxLengthOfValue={4}
      />

      <div className="container mx-auto max-w-7xl px-0 md: py-0">
        <div className="flex flex-nowrap">
          {/*middle section */}
          <QuickSort items={data} />
        </div>
      </div>
    </>
  );
};

export default QuickSortPage;

{
  /*rigth section */
}
{
  /* <div className="basis-3/12">
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
          </div> */
}
