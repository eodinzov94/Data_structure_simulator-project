import { useState } from "react";
import Stack from "../components/Simulation/Stack/Stack";
import StackPanelControl from "../components/Simulation/Stack/StackPanelControl";
import { StackItem } from "../components/Simulation/Stack/Stack";

//need to creat a componnent for stack & queue that get name and function for 2 buttons, and display 2 button and input number box

const StackPage = () => {
  const [data, setData] = useState<StackItem[]>([]);

  const popFromStack = () => {
    if (data.length > 0) {
      const new_data = [...data];
      new_data.splice(0, 1); //remove first - index=0
      setData(new_data);
    }
  };

  const pushToStack = (value: string) => {
    const key = data.length;
    const new_data = [{value,key}, ...data];
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
          <div className="basis-4/12"></div>
        </div>
      </div>
    </>
  );
};

export default StackPage;
