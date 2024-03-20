"use client";
import { useDisplay } from "../atom/display";
import { equalIsPressed } from "../utils/equalIsPressed";

interface SquareProps {
  textProp: string | number;
  doubleWidth?: boolean;
  className?: string;
}

export const Square = ({ textProp, doubleWidth, className }: SquareProps) => {
  const {
    setDisplayState,
    displayState,
    memoryState,
    setMemoryState,
    buttonsPressed,
    setButtonsPressed,
  } = useDisplay();

  const handleButton = (value: any) => {
    const lastCharDisplay = displayState.slice(-1).toString();
    const lastCharMemory = memoryState.slice(-1).toString();
    const lastCharPressed = buttonsPressed.slice(-1).toString();
    const operation = memoryState[memoryState.length - 1];
    const num1 = parseFloat(
      memoryState.slice(0, -1).join("").replace(/\./g, "").replace(",", ".")
    );
    const num2 = parseFloat(
      displayState.join("").replace(/\./g, "").replace(",", ".")
    );

    switch (value) {
      case "DEL":
        setButtonsPressed([]);
        setDisplayState([0]);
        setMemoryState([]);
        break;
      case "=":
        if (lastCharPressed === "=") {
          const result = equalIsPressed(num2, num2, operation);
        } else {
          const result = equalIsPressed(num1, num2, operation);
          setDisplayState([result]);
          setMemoryState([...memoryState, displayState, value]);
          setButtonsPressed([...buttonsPressed, value]);
        }
        break;
      case "+":
      case "-":
      case "X":
      case "/":
        setButtonsPressed([...buttonsPressed, value]);
        const isLastCharIsOperator = ["+", "-", "X", "/"].includes(
          lastCharMemory
        );
        const isLastCharIsNumber = !isNaN(parseInt(lastCharDisplay));
        if (isLastCharIsOperator && isLastCharIsNumber) {
          const result = equalIsPressed(num1, num2, operation);
          setDisplayState([result]);
          setMemoryState([result, value]);
        } else {
          setMemoryState([...displayState, value]);
        }
        break;
      case ",":
        if (!displayState.includes(",")) {
          setDisplayState([...displayState, value]);
        }
        break;
      default:
        setButtonsPressed([...buttonsPressed, value]);
        if (displayState.length === 1 && displayState[0] === 0) {
          setDisplayState([value]);
        } else if (["+", "-", "X", "/"].includes(lastCharPressed)) {
          setDisplayState([value]);
        } else {
          setDisplayState([...displayState, value]);
        }
        break;
    }
  };

  console.log(`memoryTest ${memoryState}`);
  console.log(`displayTest ${displayState}`);
  console.log(`buttonsPressed ${buttonsPressed}`);
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
