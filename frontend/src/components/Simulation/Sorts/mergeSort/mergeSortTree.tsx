import { mergeNode } from "../../../../store/reducers/sorts/mergeSortReducer";
import SortArray from "../helpers/SortArray";
import { numbersToSortItems } from "../helpers/functions";

interface Props {
  tree: mergeNode[];
}

// const tree = [
//   [1, 2, 3, 4, 5, 6, 7],
//   [1, 2, 3, 4],
//   [5, 6, 7],
//   [1, 2],
//   [3, 4],
//   [5, 6],
//   [7],
//   [1],
//   [2],
//   [3],
//   [4],
//   [5],
//   [6],
//   [],
//   [],
// ];

const MergeSortTree = ({ tree }: Props) => {
  return (
    <>
      <SortArray items={tree[1].data} speed={2} />

      <div className={`grid grid-cols-2 mt-8`}>
        <div>
          <SortArray items={tree[2].data} speed={2} />
        </div>
        <div>
          <SortArray items={tree[3].data} speed={2} />
        </div>
      </div>
      <div className={`grid grid-cols-4 mt-8`}>
        <div>
          <SortArray items={tree[4].data} speed={2} />
        </div>
        <div>
          <SortArray items={tree[5].data} speed={2} />
        </div>
        <div>
          <SortArray items={tree[6].data} speed={2} />
        </div>
        <div>
          <SortArray items={tree[7].data} speed={2} />
        </div>
      </div>
      <div className={`grid grid-cols-8 mt-8`}>
        <div>
          <SortArray items={tree[8].data} speed={2} />
        </div>
        <div>
          <SortArray items={tree[9].data} speed={2} />
        </div>
        <div>
          <SortArray items={tree[10].data} speed={2} />
        </div>
        <div>
          <SortArray items={tree[11].data} speed={2} />
        </div>
        <div>
          <SortArray items={tree[12].data} speed={2} />
        </div>
        <div>
          <SortArray items={tree[13].data} speed={2} />
        </div>
        <div>
          <SortArray items={tree[14].data} speed={2} />
        </div>
        <div>
          <SortArray items={tree[15].data} speed={2} />
        </div>
      </div>
    </>
  );
};

export default MergeSortTree;
