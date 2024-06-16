export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5 dark:bg-gray-700 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100">
      <div className="flex flex-col gap-5 bg-white w-full shadow-lg p-5 rounded-3xl max-w-screen-sm dark:bg-gray-600 *:outline-none has-[:invalid]:bg-red-100">
        {["Nico", "Me", "You", "Yourself", ""].map((person, index) => (
          <div
            key={index}
            className="flex items-center gap-5 odd:bg-gray-100 even:bg-cyan-100 p-2.5 rounded-xl group"
          >
            {/* TODO : bg값 custom 
            [] 대괄호 표기법을 통해 속성값을 custom 할 수가 있다. */}
            <div className="size-7 bg-[#543cb8] rounded-full"></div>

            {/* 스켈레톤 UI
            <div className="w-40 h-4 rounded-full bg-gray-400 animate-pulse"></div>
            <div className="w-20 h-4 rounded-full bg-gray-400 animate-pulse"></div> */}

            <span className="text-lg font-medium empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300 group-hover:text-red-500">
              {person}
            </span>
            <div className="relative  size-6 bg-red-500 text-white flex items-center justify-center rounded-full">
              <span className="z-10">{index}</span>
              <div className="absolute size-6 bg-red-500 rounded-full animate-ping"></div>
            </div>
          </div>
        ))}
        {/*
        TODO : Form TailwindCSS 로 반응형 만들어보기
         <input
          type="text"
          placeholder="Email Address"
          className="w-full rounded-md h-12 pl-5 bg-gray-200 transition-shadow ring ring-transparent focus:ring-green-500 placeholder:drop-shadow invalid:focus:ring-red-500 peer"
          required
        />
        <span className="text-red-500 font-medium hidden peer-invalid:block">
          Email is required.
        </span>
        <button className="btn">
          Login
        </button> */}
        {/* 
        TODO : Tailwind CSS 맛보기 코드
        <div className="flex justify-between items-center">
          <div className="flex flex-col ">
            <span className="text-gray-500 font-semibold -mb-1 dark:text-gray-100">
              In transit
            </span>
            <span className="text-4xl font-semibold dark:text-white">
              Coolblue
            </span>
          </div>
          <div className="size-12 bg-orange-500 rounded-full"></div>
        </div>
        <div className="my-2 flex items-center gap-2">
          <span className="px-2.5 py-1.5 rounded-3xl bg-green-400 text-white text-xs font-medium hover:bg-green-800 hover:scale-125 transition">
            Today
          </span>
          <span className="dark:text-gray-100">9:30-10:30</span>
        </div>
        <div className="relative">
          <div className="absolute bg-gray-200 w-full h-2 rounded-full"></div>
          <div className="absolute bg-green-400 w-2/3 h-2 rounded-full"></div>
        </div>
        <div className="flex justify-between items-center mt-5 text-gray-600 dark:text-gray-300">
          <span>Expected</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span className="text-gray-400 dark:text-gray-500">Delivered</span>
        </div> */}
      </div>
    </main>
  );
}
