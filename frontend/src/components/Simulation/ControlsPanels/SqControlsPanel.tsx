import { useState } from "react";
import MediumCard from "../../UI/MediumCard";
import SimulationInputGroup from "../../UI/SimulationInputGroup";

interface Props {
  //Functions are implemented on the stack page
  removeHandler: () => void; //remove from stack
  addHandler: (value: string) => void; //function that gets the value and add to the the stack
  isRemovedEnabled: boolean; //to prevent colision between pop animation
  addBtnText: string;
  removeBtnText: string;
}

const SqControlsPanel = (props: Props) => {
  const [enteredValue, setEnteredValue] = useState<string>(""); //state for the value thatneed to be push

  const inputValueHandler = () => {
    const value = enteredValue; //get the input value
    if (value.length) {
      //checking that the value is not an empty string
      props.addHandler(value); //call the push function
      setEnteredValue(""); //reset the value
    }
  };

  return (
    <MediumCard isSmaller={true}>
      <div
        className="grid grid-cols-3 justify-items-center
        "
      >
        {/*POP button */}
        <button
          onClick={props.removeHandler}
          disabled={props.isRemovedEnabled}
          className=" inline-block px-4 py-2.5 bg-lime-500 text-white font-medium text-md leading-tight  rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
        >
          Random
        </button>
        {/*input text box for value to push */}
        <SimulationInputGroup
          name={"value"}
          value={enteredValue}
          maxVal={10}
          placeholder={"Enter value"}
          btnText={props.addBtnText}
          onChange={setEnteredValue}
          btnOnClick={inputValueHandler}
        />

        {/*POP button */}
        <button
          onClick={props.removeHandler}
          disabled={props.isRemovedEnabled}
          className=" inline-block px-4 py-2.5 bg-lime-500 text-white font-medium text-md leading-tight  rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
        >
          {props.removeBtnText}
        </button>
      </div>
    </MediumCard>
  );
};

export default SqControlsPanel;
