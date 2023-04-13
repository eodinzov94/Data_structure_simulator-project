import { TreeNode } from "./BinaryTreeTypes";
import BinaryTreeNode from "./BinaryTreeNode";
import React, { FC, useEffect, useState } from "react";
import { Events } from "./BinaryTreeTypes";
import { NodeObj } from "../../../ClassObjects/NodeObj";
import { AnimatePresence } from "framer-motion";

interface BTProps {
  root: TreeNode | null;
  level: number;
  speed: number;
  height: number;
  actions: Events | null;
  currentHeapSize?: number;
}

const BinaryTree: FC<BTProps> = (props) => {
  const { speed, level, root, height, actions, currentHeapSize } = props;
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const treeObjects = NodeObj.generateTreeObjects(
    viewportWidth,
    height,
    speed,
    root,
    level,
    currentHeapSize
  );
  NodeObj.setActions(treeObjects, actions);
  return (
    <div>
      <AnimatePresence>
        {treeObjects.map((nodeObj) => (
          <BinaryTreeNode nodeObj={nodeObj} key={nodeObj.id} />
        ))}
      </AnimatePresence>
    </div>
  );
};
export default BinaryTree