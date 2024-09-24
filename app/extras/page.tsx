import { revalidatePath } from "next/cache";
import React from "react";

const getData = async () => {
  const data = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies");
};

const Extras = async () => {
  await getData();
  const action = async () => {
    "use server";
    revalidatePath("/extras");
  };

  return (
    <div className="flex flex-col gap-3 py-10">
      <h1 className="text-6xl font-roboto">Extras Next.js Function</h1>
      <h2 className="font-rubik">so much more to learn!</h2>
      <span className="font-metallica text-4xl">metallica</span>
      <form action={action}>
        <button>revalidate</button>
      </form>
    </div>
  );
};

export default Extras;
