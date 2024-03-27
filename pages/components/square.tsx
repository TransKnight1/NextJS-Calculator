"use client";
import { useState } from "react";
import { useDisplay } from "../atom/display";
import { equalIsPressed } from "../utils/equalIsPressed";

interface SquareProps {
  prop: string | number;
  doubleWidth?: boolean;
  className?: string;
}

export const Square = ({ prop, doubleWidth, className }: SquareProps) => {
  const {
    display,
    setDisplay,
    upperDisplay,
    setUpperDisplay,
    partialResult,
    setPartialResult,
    directManipulation,
    setDirectManipulation,
    buttonsPressed,
    setButtonsPressed,
  } = useDisplay();
  const [operation, setOperation] = useState<string[]>([]);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [operationPressed, setOperationPressed] = useState<boolean>(false);

  const handleButton = (prop: string | number) => {
    // "x²", "√", "1/x"
    const storingNumbers = (num: number) => {
      if (operationPressed) {
        setNumbers([...numbers, num]);
      }
      return numbers;
    };

    console.log(numbers);
    console.log(upperDisplay);
    console.log(operation);

    const num1 = parseFloat(display.join(""));

    switch (prop) {
      case "DEL":
        setDisplay([0]);
        setUpperDisplay([]);
        setButtonsPressed([]);
        setOperation([]);
        setNumbers([]);
        break;
      case "+/-":
        setDisplay([parseFloat(display.join("")) * -1]);
        break;
      case "%":
        setDisplay([parseFloat(display.join("")) / 100]);
        break;
      case "+":
      case "-":
      case "X":
      case "/":
        if (operationPressed) {
          console.log("foi executado");
          console.log(numbers);
          console.log(numbers[numbers.length - 1]);
          console.log(numbers[numbers.length]);
          console.log(operation[operation.length - 1]);
          const result = equalIsPressed(
            numbers[numbers.length - 1],
            parseFloat(display.join("")),
            operation[operation.length - 1]
          );
          setDisplay([result]);
          setPartialResult([result]);
          setUpperDisplay([result.toString(), prop.toString()]);
        }
        setOperationPressed(true);
        setNumbers([parseFloat(display.join(""))]);
        setOperation([prop]);
        setUpperDisplay([num1.toString(), prop]);
        setDisplay([num1]);
        break;
    }

    if (typeof prop === "number") {
      if (display[0] === 0) {
        setOperationPressed(false);
        setDisplay([prop]);
      } else if (display.length < 13) {
        setOperationPressed(false);
        setDisplay([...display, prop]);
      } else if (operationPressed === true) {
        setOperationPressed(false);
        setDisplay([prop]);
      }
    }
  };

  return (
    <button
      onClick={() => handleButton(prop)}
      className={`bg-gray-500 h-14 border-[1px] border-black hover:opacity-75 transition ease-in-out ${
        doubleWidth ? "w-28" : "w-14"
      } ${className}`}
    >
      <h1>{prop}</h1>
    </button>
  );
};
