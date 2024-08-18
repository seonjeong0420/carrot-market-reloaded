import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="*:rounded-md flex gap-5 animate-pulse">
          <div className="flex flex-col gap-2 *:rounded-md ">
            <div className="bg-neutral-700 h-5 w-28" />
            <div className="bg-neutral-700 h-5 w-60" />
            <div className="flex gap-2 *:rounded-md">
              <div className="bg-neutral-700 h-5 w-10" />
              <div className="bg-neutral-700 h-5 w-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
