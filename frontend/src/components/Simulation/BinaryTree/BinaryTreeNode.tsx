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
          data-id={nodeObj.nodeRole}
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
            backgroundColor:nodeObj.isVisited?"#dde11d":nodeObj.isPassed?"#abe7b6":"lightyellow",
            ...style,
            top: nodeObj.position.y,
            left: nodeObj.position.x,
            borderColor:nodeObj.isVisited?"#3f0624":"#84cc16",
          }}
          className={nodeObj.nodeRole?"node node-selected":"node"}
        >
          {nodeObj.value === -Infinity ? "−∞" : nodeObj.value}

        </motion.span>
           {nodeObj.branch && (
                  <Branch
                         branch={nodeObj.branch}
                         key={`${nodeObj.id},${nodeObj.value}-Branch`}
                         isPassed={nodeObj.isPassed}
                         speed={nodeObj.speed}
                  />
           )}
    </>
  );
};

export default BinaryTreeNode

