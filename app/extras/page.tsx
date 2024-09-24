import { revalidatePath } from "next/cache";
import React, { experimental_taintObjectReference, experimental_taintUniqueValue } from "react";
import HackedComponent from "./hacked-component";

const getData = async () => {
  const data = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies");
  const keys = {
    apiKey: "11191119",
    secret: "0022030",
  };

  // experimental_taintObjectReference("API keys were leaked !! ", keys); // object 전체를 taint 할 수 있다.
  experimental_taintUniqueValue("Error! Secret key was exposed", keys, keys.secret); // object 내의 고유한 값만을 taint 할 수 있다.

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

      {/* 클라이언트 컴포넌트에는 서버 컴포넌트의 key를 전달하면 안되어서 오류 발생 */}
      <HackedComponent data={data} />

      <form action={action}>
        <button>revalidate</button>
      </form>
    </div>
  );
};

export default Extras;
