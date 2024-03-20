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

  const conversionComma = (value: string) => {
    return parseFloat(value.replace(/\./g, "").replace(",", "."));
  };

  const handleButton = (value: any) => {
    const validOperators = ["+", "-", "X", "/"].map((operator) =>
      operator.toString()
    );
    const lastValidOperatorIndex = memoryState
      .slice()
      .reverse()
      .findIndex((item) => validOperators.includes(item.toString()));

    const operation =
      lastValidOperatorIndex !== -1
        ? memoryState[memoryState.length - lastValidOperatorIndex - 1]
        : null;
    const lastCharDisplay = displayState.slice(-1).toString();
    const lastCharMemory = memoryState.slice(-1).toString();
    const lastCharPressed = buttonsPressed.slice(-1).toString();

    const num1 = conversionComma(memoryState.slice(0, -1).join(""));
    const num2 = conversionComma(displayState.join(""));
    const currentValue = parseFloat(displayState.join(""));
    console.log(lastCharPressed);
    console.log(operation);

    switch (value) {
      case "DEL":
        setButtonsPressed([]);
        setDisplayState([0]);
        setMemoryState([]);
        break;
      case "=":
        if (lastCharPressed === "=") {
          const result = equalIsPressed(num1, num2, operation);
          setDisplayState([result]);
          const newMemoryState = memoryState.slice();
          setMemoryState([newMemoryState, displayState[0]]);
          setButtonsPressed([...buttonsPressed, value]);
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
        if (!displayState.toString().includes(",")) {
          setDisplayState([...displayState, value]);
        }
        break;
      case "+/-":
        setDisplayState([currentValue * -1]);
        break;
      case "%":
        if (memoryState.length === 0) {
          setDisplayState([currentValue / 100]);
        } else {
          const numOriginal = conversionComma(memoryState.join(""));
          const percentValue = conversionComma(displayState.join(""));
          const result = numOriginal * (percentValue / 100);
          setDisplayState([result]);
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

  console.log("buttonsPressed", buttonsPressed);
  console.log("displayState", displayState);
  console.log("memoryState", memoryState);

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
