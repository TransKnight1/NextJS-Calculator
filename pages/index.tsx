import { useEffect, useState } from "react";
import { Square } from "./components/square";
import { useDisplay } from "./atom/display";

export default function Home() {
  const { display, memory, operationHistory, buttonsPressed } = useDisplay();
  const lastCharPressed = buttonsPressed.slice(-1).toString();
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (
      lastCharPressed === "=" &&
      buttonsPressed[buttonsPressed.length - 2] === "="
    ) {
      setShowHistory(true);
    } else {
      setShowHistory(false);
    }
  }, [lastCharPressed, buttonsPressed]);

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
        <h1>{memory}</h1>
      </div>
    );
  };

  const renderHistory = () => {
    return (
      <div
        className="flex w-56 h-14 place-items-center border-x-[1px] border-t-[1px] border-black p-2 text-white text-opacity-50 text-xs
      justify-end"
      >
        <h1>{operationHistory}</h1>
      </div>
    );
  };

  return (
    <div className="flex flex-col place-items-center mt-16 ">
      <div className="shadow-xl shadow-black">
        {showHistory ? renderHistory() : renderMemory()}
        {renderDisplay()}

        <div className="grid grid-cols-4 w-56">
          <Square stringProp="+/-" />
          <Square stringProp="%" />
          <Square stringProp="DEL" />
          <Square stringProp="/" className="text-green-500 text-2xl" />
          <Square numberProp={7} />
          <Square numberProp={8} />
          <Square numberProp={9} />
          <Square stringProp="X" className="text-yellow-500 text-xl" />
          <Square numberProp={4} />
          <Square numberProp={5} />
          <Square numberProp={6} />
          <Square stringProp="-" className="text-red-500 text-3xl" />
          <Square numberProp={1} />
          <Square numberProp={2} />
          <Square numberProp={3} />
          <Square stringProp="+" className="text-blue-500 text-3xl" />
          <Square numberProp={0} />
          <Square stringProp="." />
          <Square
            stringProp="="
            doubleWidth
            className=" text-3xl bg-slate-800"
          />
        </div>
        <div className="absolute text-white bg-gray-600 w-56 h-3 border-x-[1px] border-black shadow-sm shadow-black "></div>
      </div>
      <div className="relative left-[118px] bottom-[195.2px] bg-gray-600 w-[405.5px] h-3 border-[1px] border-black shadow-md shadow-black -rotate-90 opacity-50"></div>
      <div className="relative left-[124px] bottom-[203px] bg-black w-[405.5px] h-1 border-x-[1px] border-black  -rotate-90 opacity-80"></div>
      <div>made by Leonardo Zanini</div>
    </div>
  );
}
