import BinaryTree from '../BinaryTree/BinaryTree'
import { TreeNode } from '../BinaryTree/BinaryTreeTypes'


const Heap = () => {
  const tree3: TreeNode = {
    value: 10,
    left: {
      value: 5,

    }
  };
  const tree: TreeNode = {
    value: 10,
    left: {
      value: 5,
      left: { value: 2 },
      right: { value: 7 },
    },
    right: {
      value: 15,
      left: { value: 12 },
      right: { value: 20 },
    },
  };

  const tree2: TreeNode = {
    value: 15,
    left: {
      value: 8,
      left: {
        value: 3,
        left: { value: 1 },
        right: { value: 6, left: { value: 4 }, right: { value: 7 } },
      },
      right: {
        value: 10,
        left: { value: 9 },
        right: { value: 14, left: { value: 13 }, right: { value: 20 } },
      },
    },
    right: {
      value: 25,
      left: {
        value: 18,
        left: { value: 16 },
        right: { value: 22, left: { value: 21 }, right: { value: 24 } },
      },
      right: {
        value: 30,
        left: { value: 28, left: { value: 26 }, right: { value: 29 } },
        right: { value: 35 },
      },
    },
  };
  const treeNode = {
    value: 10,
    left: {
      value: 5,
      left: {
        value: 3,
        left: {
          value: 2,
          left: {
            value: 1
          }
        },
        right: {
          value: 4
        }
      },
      right: {
        value: 7,
        left: {
          value: 6
        },
        right: {
          value: 9,
          left: {
            value: 8
          }
        }
      }
    },
    right: {
      value: 15,
      left: {
        value: 12,
        left: {
          value: 11
        },
        right: {
          value: 14,
          left: {
            value: 13
          }
        }
      },
      right: {
        value: 17,
        left: {
          value: 16
        },
        right: {
          value: 19,
          left: {
            value: 18
          },
          right: {
            value: 20
          }
        }
      }
    }
  }

  return (
    <BinaryTree root={treeNode} level ={1}/>
  )


}

export default Heap
