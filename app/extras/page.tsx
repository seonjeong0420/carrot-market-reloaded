import { revalidatePath } from "next/cache";
import React, { experimental_taintObjectReference } from "react";
import HackedComponent from "./hacked-component";

const getData = async () => {
  const data = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies");
  const keys = {
    apiKey: "11191119",
    secret: "0022030",
  };

  experimental_taintObjectReference("API keys were leaked !! ", keys);
  return keys;
};

const Extras = async () => {
  const data = await getData();
  const action = async () => {
    "use server";
    revalidatePath("/extras");
  };

  return (
    <div className="flex flex-col gap-3 py-10">
      <h1 className="text-6xl font-roboto">Extras Next.js Function</h1>
      <h2 className="font-rubik">so much more to learn!</h2>
      <span className="font-metallica text-4xl">metallica</span>
      <HackedComponent data={data} />

      <form action={action}>
        <button>revalidate</button>
      </form>
    </div>
  );
};

export default Extras;
