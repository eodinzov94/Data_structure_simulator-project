import { useDispatch } from "react-redux";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { BucketSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import { BucketSort } from "../../../components/Simulation/Sorts/BucketSort/BucketSort";
import SortArray from "../../../components/Simulation/Sorts/helpers/SortArray";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import { useAppSelector } from "../../../store/hooks";
import { bucketSortActions as actions } from "../../../store/reducers/sorts/bucketSortReducer";
import { BucketSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import BucketSortController from "../../../ClassObjects/SortControllers/BucketSortController";
import { AnimatePresence, motion } from "framer-motion";
import bucketSortPhoto from "../../../assets/Algorithms/BS1.png";


export const BucketSortPage = () => {
  const MAX_ELEMENTS = 10;
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state.bucketSort);
  const controller = BucketSortController.getController(dispatch);

  const Sort = async () => {
    const opArr: BucketSortOperation[] = BucketSort(state.data);
    await controller.Sort(opArr);
  };

  const setInput = async (data: number[]) => {
    await controller.init();
    dispatch(actions.setData(data));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS, 21));
  };

  return (
    <>
      {/*top section */}
      <SubjectImg
        name={"Bucket Sort"}
        src={bucketSortPhoto}
        width="200px"
      />

      <SortControlsPanel
        rightBtnHandler={Sort}
        inputHandler={setInput}
        leftBtnHandler={setRandomInput}
        inputBtnText={"Set"}
        rightBtnText={"Sort"}
        leftBtnText={"Random"}
        maxElements={MAX_ELEMENTS}
        maxInputNum={21}
      ></SortControlsPanel>

      {/* animation section */}
      <AnimationWrapper
        line={state.line}
        code={BucketSortPseudoCode}
        controller={controller}
      >
        <SortArray items={state.data} speed={1} />
        <div className="mt-20"></div>
        <div className="pl-56">
          <AnimatePresence mode={"sync"}>
            {state.buckets.map((e, index) => (
              <div className="flex justify-left mt-6" key={index}>
                <motion.b
                  style={{ width: "80px" ,fontFamily: "monaco"}}
                  transition={{ duration: 1 }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    color: state.bucketIndex === index ? "#84cc16" : "",
                  }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 1 } }}
                >
                  {e.title}
                </motion.b>
                <div>
                  <SortArray items={e.data} speed={1} />
                </div>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </AnimationWrapper>
    </>
  );
};
