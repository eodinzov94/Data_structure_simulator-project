import { useState } from "react";

/* This component renders a side navbar on the stack page*/

interface Props {
  //Functions are implemented on the stack page
  popHandler: () => void; //remove from stack
  pushToStack: (value: string) => void; //function that gets the value and add to the the stack
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
    <div className="basis-2/12">
      <ul className="">
        {/*input text box for value to push */}
        <li>
          <input
            id="value"
            name="value"
            type="text"
            className={`relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm`}
            placeholder="Enter value to push"
            maxLength={10}
            value={enteredValue}
            onChange={(e) => setEnteredValue(e.currentTarget.value)} //update the state value to be set as the input
          />
        </li>

        {/*PUSH button */}
        <li>
          <button
            onClick={pushHandler}
            className="m-1 inline-block px-5 py-2.5 bg-lime-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
          >
            Push
          </button>
        </li>

        {/*POP button */}
        <li>
          <button
            onClick={props.popHandler}
            className="m-3 w-9/12 inline-block px-10 py-2.5 bg-lime-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
          >
            Pop
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StackPanelControl;
