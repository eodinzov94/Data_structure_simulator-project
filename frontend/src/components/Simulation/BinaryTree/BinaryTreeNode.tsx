import React, {FC, ReactElement, useEffect, useRef} from 'react'
import {motion} from 'framer-motion'
import './BinaryTree.css'

interface BinaryTreeNodeProps {
    position: {
        top: number,
        left: number
    }
    zoomPercentage: number
    speed: number
    id: number
    value: number
    style: React.CSSProperties
    children?: ReactElement | ReactElement[];
}

const BinaryTreeNode: FC<BinaryTreeNodeProps> = (props) => {
    const {position, speed, zoomPercentage, id, value, style, children} = props
    const {top, left} = position
    const prevPropsRef = useRef(props);

    // useEffect(() => {
    //     const changedProps = Object.entries(props).reduce((acc, [key, value]) => {
    //         // @ts-ignore
    //         if (prevPropsRef.current[key] !== value) {
    //             // @ts-ignore
    //             acc[key] = { from: prevPropsRef.current[key], to: value };
    //         }
    //         return acc;
    //     }, {});
    //
    //     if (Object.keys(changedProps).length > 0) {
    //         console.log('MyComponent re-rendered due to props change:', changedProps);
    //     }
    //
    //     prevPropsRef.current = props;
    // }, [props]);
    return (
        <>
            <motion.span
                data-id={`${id},${top},${left}`}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                key={`${id},${value}`}
                style={{
                    ...style,
                    top: top,
                    left: left,
                    scale: zoomPercentage,
                }}
                className='node'
            >
                {value}
            </motion.span>
            {children}
        </>
    )
}

export default BinaryTreeNode
