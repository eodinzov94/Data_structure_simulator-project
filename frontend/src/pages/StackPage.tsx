import { useState } from "react";
import Stack from "../components/Simulation/Stack/Stack";
import StackPanelControl from "../components/Simulation/Stack/StackPanelControl";

//need to creat a componnent for stack & queue that get name and function for 2 buttons, and display 2 button and input number box

const StackPage = () => {
  const [data, setData] = useState<string[]>([]);

  const popFromStack = () => {
    if (data.length > 0) {
      const new_data = [...data];
      new_data.splice(0,1); //remove first - index=0
      setData(new_data);
    }
  };

  const pushToStack = (value: string) => {
    const new_data = [value, ...data];
    setData(new_data);
  };

  return (
    <>
      <h1>STACK PAGE</h1>
      <div className="flex flex-row flex-nowrap">
          <StackPanelControl popHandler={popFromStack} pushToStack={pushToStack}/>
          <Stack items={data}/>
      </div>
    </>
  );
};

export default StackPage;

