import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

type Props = {};

const LiveShop = (props: Props) => {
  return (
    <div>
      <Link href="/streams/add" className="bg-orange-500 items-center justify-center flex rounded-full size-10 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400">
        <PlusIcon className="size-7" />
      </Link>
    </div>
  );
};

export default LiveShop;
