import {FC, useState} from "react";
import "./styles.css";
const tree: TreeNode = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 4,
        },
        right: {
            value: 5,
        },
    },
    right: {
        value: 3,
        left: {
            value: 6,
        },
        right: {
            value: 7,
        },
    },
};
interface TreeNode {
    value: number;
    left?: TreeNode;
    right?: TreeNode;
}

interface Props {
    root?: TreeNode;
}

const Node = ({ val }: { val: number }) => <div className="node">{val}</div>;

const Branch = () => <div className="branch"></div>;


const RenderTree : FC<Props> = ({root}): JSX.Element | null => {
    if (!root) {
        return null;
    }


    return (
        <div className="node-wrapper">
            <Node val={root.value} />
            <div className="children">
                <div className="left-child">
                    <RenderTree root={root.left} />
                    {root.left && <Branch />}
                </div>
                <div className="right-child">
                    <RenderTree root={root.right} />
                    {root.right && <Branch />}
                </div>
            </div>
        </div>
    );
};
const BinaryTree = () => {
    const [selected, setSelected] = useState<number | null>(null);

    const handleNodeClick = (val: number) => {
        setSelected(val);
    };
    return <RenderTree root ={tree}/>

};

export default BinaryTree;
