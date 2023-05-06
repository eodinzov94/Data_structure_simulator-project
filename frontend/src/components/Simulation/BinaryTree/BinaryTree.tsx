import { Events, NodeRole, TreeNode } from "./BinaryTreeTypes";
import BinaryTreeNode from "./BinaryTreeNode";
import React, { FC } from "react";
import { NodeObj } from "../../../ClassObjects/NodeObj";
import { AnimatePresence } from "framer-motion";

interface BTProps {
  root: TreeNode | undefined;
  level: number;
  speed: number;
  height: number;
  actions: Events | null;
  currentHeapSize?: number;
  roles: NodeRole[];
  viewportWidth: number;
}

const BinaryTree: FC<BTProps> = (props) => {
  const { speed, level, root, height, actions, currentHeapSize, roles,viewportWidth } = props;
  const treeObjects = NodeObj.generateTreeObjects(
    viewportWidth,
    height,
    speed,
    root,
    level,
    currentHeapSize
  );
  NodeObj.setActions(treeObjects, actions);
  NodeObj.setRoles(treeObjects, roles);
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
export default BinaryTree;
