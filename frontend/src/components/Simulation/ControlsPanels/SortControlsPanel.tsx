import { useState } from 'react'
import MediumCard from '../../UI/MediumCard';
import SimulationInputGroup from '../../UI/SimulationInputGroup';

export interface Item {
    value: string;
    key: number;
  }
  
  interface Props {
    //Functions are implemented on the stack/queue page
    rightBtnHandler: () => void; //remove from data
    inputHandler: (value: string) => void; //function that gets the value and add to the the data
    leftBtnHandler?:(newData:Item[])=>void;
  
    rightBtnText: string;
    inputBtnText: string;
    leftBtnText?: string;
    
    maxLengthOfValue:number;
    isRemovedEnabled: boolean; //to prevent colision between pop animation
}
  
export const SortControlsPanel = (props:Props) => {
    const [enteredValue, setEnteredValue] = useState<string>(""); //state for the value that need to be push

    const inputValueHandler = () => {
      const value = enteredValue; //get the input value
      if (value.length > 0 && value.length<=props.maxLengthOfValue) {
        //checking that the value is not an empty string
        props.inputHandler(value); //call the push function
        setEnteredValue(""); //reset the value
      }
      else{
        window.alert(`The length of the value must be at least 1 and less than ${props.maxLengthOfValue+1}`)
      }
  
    };
  
  
    const randomButtonHandler= ()=>{
      const newData = [...Array(7)].map(() => (Math.floor(Math.random()*10000).toString() )).map((e,index)=>{return {key:index,value:e}}).reverse();
      if (props.leftBtnHandler)
        props.leftBtnHandler(newData);
    }
  
    return (
      <MediumCard isSmaller={true}>
        <div
          className="grid grid-cols-3 justify-items-center
          "
        >
          {/*left button */}
          <button
            onClick={randomButtonHandler}
            className=" inline-block px-4 py-2.5 bg-lime-500 text-white font-medium text-md leading-tight  rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
          >
            {props.leftBtnText}
          </button>

          {/*input text box for value to push */}
          <SimulationInputGroup
            name={"value"}
            value={enteredValue}
            maxVal={props.maxLengthOfValue}
            placeholder={"Enter value"}
            btnText={props.inputBtnText}
            onChange={setEnteredValue}
            btnOnClick={inputValueHandler}
          />
  
          {/*right button */}
          <button
            onClick={props.rightBtnHandler}
            disabled={props.isRemovedEnabled}
            className=" inline-block px-4 py-2.5 bg-lime-500 text-white font-medium text-md leading-tight  rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
          >
            {props.rightBtnText}
          </button>
        </div>
      </MediumCard>
    );
}
