import { AnimatePresence } from "framer-motion";
import { ArrayItemObj } from "../../../../ClassObjects/ArrayItemObj";
import { Events } from "../../BinaryTree/BinaryTreeTypes";
import ArrayItem from "./ArrayItem";
import "./HeapArray.css";

interface Props {
  items: number[];
  actions: Events;
  speed: number;
  currentHeapSize?: number;
}
const HeapArray = (props: Props) => {
  const { items, actions, speed,currentHeapSize } = props;
  const arr = ArrayItemObj.generateArrayObjects(items, speed,currentHeapSize);
  ArrayItemObj.setActions(arr, actions);
  return (
    <div className="basis-9/12 mr-56">
      <AnimatePresence>
        <span className="s_ul">
          {arr.map((item) => (
            <ArrayItem arrayItemObj={item} key={`${item.id}-${item.value}` } />
          ))}
        </span>
      </AnimatePresence>
    </div>
  );
};


export default HeapArray
