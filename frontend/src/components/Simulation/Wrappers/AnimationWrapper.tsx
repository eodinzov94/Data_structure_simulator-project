import React from "react";
import { PseudoProps } from "../PseudoCode/pc-helpers";
import { PseudoCode } from "../PseudoCode/PseudoCode";

export const AnimationWrapper = (props: PseudoProps) => {
  return (
    <div className="flex flex-nowrap">
      <div className="container mx-auto max-w-7xl px-0 md: py-10">
        {/*middle section */}
        {props.children}
      </div>
      {/*rigth section */}
      <PseudoCode code={props.code} line={props.line} />
    </div>
  );
};
