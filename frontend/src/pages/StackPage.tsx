import { useState } from "react";
import StackPanelControl from "../components/Simulation/StackPanelControl";

//need to creat a componnent for stack & queue that get name and function for 2 buttons, and display 2 button and input number box

const StackPage = () => {
  const [data, setData] = useState<string[]>(["1", "2", "3"]);

  const popFromStack = () => {
    if (data.length > 0) {
      const new_data = [...data];
      new_data.pop(); //remove first - index=0
      setData(new_data);
    }
  };

  const pushToStack = (value: string) => {
    const new_data = [...data, value];
    setData(new_data);
  };

  return (
    <>
      <h1>STACK PAGE</h1>
      <h2>{data}</h2>
      <StackPanelControl popHandler={popFromStack} pushToStack={pushToStack}/>
    </>
  );
};

export default StackPage;

