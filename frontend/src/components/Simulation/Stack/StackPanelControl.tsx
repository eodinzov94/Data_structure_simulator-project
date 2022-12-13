import { useState } from "react";
import MediumCard from "../../UI/MediumCard";
import SimulationInputGroup from "../../UI/SimulationInputGroup";

interface Props {
  //Functions are implemented on the stack page
  popHandler: () => void; //remove from stack
  pushToStack: (value: string) => void; //function that gets the value and add to the the stack
  isPopEnabled: boolean; //to prevent colision between pop animation
}

const StackPanelControl = (props: Props) => {
  const [enteredValue, setEnteredValue] = useState<string>(""); //state for the value thatneed to be push

  const pushHandler = () => {
    const value = enteredValue; //get the input value
    if (value.length) {
      //checking that the value is not an empty string
      props.pushToStack(value); //call the push function
      setEnteredValue(""); //reset the value
    }
  };

  return (
    <MediumCard isSmaller={true}>
      {/*input text box for value to push */}
      <div className="grid grid-cols-2 justify-items-center
      ">
        <SimulationInputGroup
          name={"value"}
          value={enteredValue}
          maxVal={10}
          placeholder={"Enter value to push"}
          btnText={"Push"}
          onChange={setEnteredValue}
          btnOnClick={pushHandler}
        />

        {/*POP button */}
        <button
          onClick={props.popHandler}
          disabled={props.isPopEnabled}
          className=" inline-block px-8 py-2.5 bg-lime-500 text-white font-medium text-md leading-tight  rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
        >
          Pop
        </button>
      </div>
    </MediumCard>
  );
};

export default StackPanelControl;
