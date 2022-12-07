import { useState } from "react";

interface Props{
    popHandler:()=>void;
    pushToStack:(value:string)=>void;
}

const StackPanelControl = (props:Props) => {
    const [enteredValue,setEnteredValue] = useState<string>("");

    const pushHandler = () =>{
        const value = enteredValue;
        if(value.length){
            props.pushToStack(value);
            setEnteredValue("");
        }
    }

    

    return (
    <div className="basis-3/12">
      <ul className="relative">
        <li>
          <input
            id="value"
            name="value"
            type="text"
            className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm`}
            placeholder="Enter value to push"
            value={enteredValue}
            onChange = {(e)=>setEnteredValue(e.currentTarget.value)}
            />
        </li>
        <li>
          <button onClick={pushHandler} className="m-1 inline-block px-5 py-2.5 bg-lime-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out">
            Push
          </button>
        </li>
        <li>
          <button onClick={props.popHandler} className="m-3 w-9/12 inline-block px-10 py-2.5 bg-lime-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out">
            Pop
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StackPanelControl;
