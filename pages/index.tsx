import { useEffect, useState } from "react";
import { Square } from "./components/square";
import { useDisplay } from "./atom/display";

export default function Home() {
  const { display, upperDisplay, partialResult, directManipulation } =
    useDisplay();

  const renderDisplay = () => {
    return (
      <div className="flex w-56 h-14 place-items-center border-x-[1px] border-b-[1px] border-black p-2 text-white text-3xl justify-end">
        <h1>{display}</h1>
      </div>
    );
  };

  const renderMemory = () => {
    return (
      <div
        className="flex w-56 h-14 place-items-center border-x-[1px] border-t-[1px] border-black p-2 text-white text-opacity-50 text-xs
      justify-end"
      >
        <h1>{upperDisplay}</h1>
      </div>
    );
  };

  const renderHistory = () => {
    return (
      <div
        className="flex w-56 h-14 place-items-center border-x-[1px] border-t-[1px] border-black p-2 text-white text-opacity-50 text-xs
      justify-end"
      >
        <h1>{directManipulation}</h1>
      </div>
    );
  };

  return (
    <div className="flex flex-col place-items-center mt-16 ">
      <div className="shadow-xl shadow-black">
        {renderMemory()}
        {renderDisplay()}

        <div className="grid grid-cols-4 w-56">
          <Square prop="+/-" />
          <Square prop="%" />
          <Square prop="DEL" />
          <Square prop="/" className="text-green-500 text-2xl" />
          <Square prop={7} />
          <Square prop={8} />
          <Square prop={9} />
          <Square prop="X" className="text-yellow-500 text-xl" />
          <Square prop={4} />
          <Square prop={5} />
          <Square prop={6} />
          <Square prop="-" className="text-red-500 text-3xl" />
          <Square prop={1} />
          <Square prop={2} />
          <Square prop={3} />
          <Square prop="+" className="text-blue-500 text-3xl" />
          <Square prop={0} />
          <Square prop="," />
          <Square prop="=" doubleWidth className=" text-3xl bg-slate-800" />
        </div>
        <div className="absolute text-white bg-gray-600 w-56 h-3 border-x-[1px] border-black shadow-sm shadow-black "></div>
      </div>
      <div className="relative left-[118px] bottom-[195.2px] bg-gray-600 w-[405.5px] h-3 border-[1px] border-black shadow-md shadow-black -rotate-90 opacity-50"></div>
      <div className="relative left-[124px] bottom-[203px] bg-black w-[405.5px] h-1 border-x-[1px] border-black  -rotate-90 opacity-80"></div>
      <div>made by Leonardo Zanini</div>
    </div>
  );
}
