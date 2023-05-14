import { useAppSelector } from "../../../store/hooks";
import SortPlayerPanel from "../ControlsPanels/SortPlayerPanel";
import { AnimationWrraperProps, PseudoProps } from "../PseudoCode/pc-helpers";
import { PseudoCode } from "../PseudoCode/PseudoCode";

export const AnimationWrapper = (props: AnimationWrraperProps) => {
  const isSortStarted = useAppSelector(state => state.animationController.isSortStarted)
  return (
    <div className="flex flex-nowrap">
      <div className="container mx-auto max-w-7xl px-0 md: py-10">
        {/*middle section */}
        {props.children}
        {props.controller && isSortStarted && <SortPlayerPanel controller={props.controller}/>}
      </div>
      {/*rigth section */}
      <PseudoCode code={props.code} line={props.line} />
    </div>
  );
};
