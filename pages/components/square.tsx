"use client";
import { useDisplay } from "../atom/display";

interface SquareProps {
  textProp: string | number;
  doubleWidth?: boolean;
  className?: string;
}

export const Square = ({ textProp, doubleWidth, className }: SquareProps) => {
  const { setDisplayState, displayState, memoryState, setMemoryState } =
    useDisplay();

  // Todo: % logic not working yet
  // Logic after operation is weird, it should reset to the number that was inputed
  // equals should repeat the last operation
  // eval should run if operation button is pressed again after being pressed already after a number

  const handleButton = (value: any) => {
    const lastCharDisplay = displayState.slice(-1).toString();
    const lastCharMemory = memoryState.slice(-1).toString();

    const equalIsPressed = () => {
      const operation = memoryState[memoryState.length - 1];
      const num1 = parseFloat(memoryState.slice(0, -1).join(""));
      const num2 = parseFloat(displayState.join(""));

      console.log(`num1 ${num1}`);
      console.log(`num2 ${num2}`);
      console.log(`operation ${operation}`);

      let result: number = 0;
      switch (operation) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "X":
          result = num1 * num2;
          break;
        case "/":
          result = num1 / num2;
          break;
        default:
          break;
      }
      return result;
    };

    switch (value) {
      case "DEL":
        setDisplayState([0]);
        setMemoryState([]);
        break;
      case "=":
        const result = equalIsPressed();
        setDisplayState([result]);
        setMemoryState([...memoryState, displayState, value]);
        break;
      case "+":
      case "-":
      case "X":
      case "/":
        const isLastCharIsOperator = ["+", "-", "X", "/"].includes(
          lastCharMemory
        );
        const isLastCharIsNumber = !isNaN(parseInt(lastCharDisplay));
        if (isLastCharIsOperator && isLastCharIsNumber) {
          const result = equalIsPressed();
          setDisplayState([result]);
          setMemoryState([result, value]);
        } else {
          setMemoryState([...displayState, value]);
        }
        break;
      default:
        if (displayState.length === 1 && displayState[0] === 0) {
          setDisplayState([value]);
        } else if (["+", "-", "X", "/"].includes(lastCharMemory)) {
          setDisplayState([value]);
        } else {
          setDisplayState([...displayState, value]);
        }
        break;
    }
  };

  console.log(`memoryTest ${memoryState}`);
  console.log(`displayTest ${displayState}`);
  return (
    <button
      onClick={() => handleButton(textProp)}
      className={`bg-gray-500 h-14 border-[1px] border-black hover:opacity-75 transition ease-in-out ${
        doubleWidth ? "w-28" : "w-14"
      } ${className}`}
    >
      <h1>{textProp}</h1>
    </button>
  );
};
