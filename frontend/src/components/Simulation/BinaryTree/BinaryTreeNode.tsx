import React, { FC } from "react";
import { motion } from "framer-motion";
import "./BinaryTree.css";
import { getAnimationsAndStyles } from "./Helpers/Functions";
import { NodeObj } from "../../../ClassObjects/NodeObj";
import Branch from "./Branch";

interface BinaryTreeNodeProps {
  nodeObj: NodeObj;
}

const BinaryTreeNode: FC<BinaryTreeNodeProps> = ({ nodeObj }) => {
  const { initial, animate, style } = getAnimationsAndStyles(
    nodeObj.action,
    nodeObj.swapPosition,
    nodeObj.position
  );
  return (
    <>
        <motion.span
          data-id={`${nodeObj.position.x},${nodeObj.position.y}`}
          transition={{
            layout: { duration: 0.400 * nodeObj.speed, ease: "easeIn" },
            duration: 0.400 * nodeObj.speed,
          }}
          layout={"position"}
          initial={initial}
          animate={animate}
          key={`${nodeObj.id},${nodeObj.value}`}
          exit={{ opacity: 0,scale:0.5}}
          style={{
            ...style,
            top: nodeObj.position.y,
            left: nodeObj.position.x,
          }}
          className="node"
        >
          {nodeObj.value === -Infinity ? "−∞" : nodeObj.value}
        </motion.span>
        {nodeObj.branch && (
          <Branch
            branch={nodeObj.branch}
            key={`${nodeObj.branch.x1}-${nodeObj.branch.x2}-${nodeObj.branch.y1}-${nodeObj.branch.y1}`}
          />
        )}
    </>
  );
};

export default BinaryTreeNode

