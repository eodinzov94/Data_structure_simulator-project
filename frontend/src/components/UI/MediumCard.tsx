import React from "react";

//for using children as in JS
type Props = { children: React.ReactNode };

const MediumCard: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-full items-center justify-center py-10  sm:px-4 lg:px-8 ">
      <div className="max-w-xl w-full p-10 bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="w-full max-w-xl space-y-8 ">{children}</div>
      </div>
    </div>
  );
};

export default MediumCard;
