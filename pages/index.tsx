import { useEffect } from "react";
import { Square } from "./components/square";
import { useDisplay } from "./atom/display";

export default function Home() {
  const { displayState, memoryState } = useDisplay();

  const renderVisor = () => {
    return (
      <div className="flex w-56 h-14 place-items-center border-x-[1px] border-b-[1px] border-black p-2 text-white text-3xl justify-end">
        <h1>{displayState}</h1>
      </div>
    );
  };

  const renderMemory = () => {
    return (
      <div
        className="flex w-56 h-14 place-items-center border-x-[1px] border-t-[1px] border-black p-2 text-white text-opacity-50 text-xs
      justify-end"
      >
        <h1>{memoryState}</h1>
      </div>
    );
  };

  return (
    <div className="flex flex-col place-items-center mt-40">
      <div className="shadow-md shadow-black">
        {renderMemory()}
        {renderVisor()}
        <div className="grid grid-cols-4 w-56">
          <Square textProp="+/-" />
          <Square textProp="%" />
          <Square textProp="DEL" />
          <Square textProp="/" className="text-green-500 text-2xl" />
          <Square textProp={7} />
          <Square textProp={8} />
          <Square textProp={9} />
          <Square textProp="X" className="text-yellow-500 text-xl" />
          <Square textProp={4} />
          <Square textProp={5} />
          <Square textProp={6} />
          <Square textProp="-" className="text-red-500 text-3xl" />
          <Square textProp={1} />
          <Square textProp={2} />
          <Square textProp={3} />
          <Square textProp="+" className="text-blue-500 text-3xl" />
          <Square textProp={0} />
          <Square textProp="," />
          <Square textProp="=" doubleWidth className=" text-3xl bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
