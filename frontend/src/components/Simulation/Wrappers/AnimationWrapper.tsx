import SortPlayerPanel from "../ControlsPanels/SortPlayerPanel";
import { AnimationWrraperProps, PseudoProps } from "../PseudoCode/pc-helpers";
import { PseudoCode } from "../PseudoCode/PseudoCode";

export const AnimationWrapper = (props: AnimationWrraperProps) => {
  return (
    <div className="flex flex-nowrap">
      <div className="container mx-auto max-w-7xl px-0 md: py-10">
        {/*middle section */}
        {props.children}
        <SortPlayerPanel controller={props.controller}/>
      </div>
      {/*rigth section */}
      <PseudoCode code={props.code} line={props.line} />
    </div>
  );
};
