"use client";
import { useState } from "react";
import { useDisplay } from "../atom/display";
import { equalIsPressed } from "../utils/equalIsPressed";
import { isNumber } from "util";

interface SquareProps {
  prop: string | number | boolean;
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

  const handleButton = (prop: string | number | boolean) => {
    // "x²", "√", "1/x"

    const num1 = parseFloat(display.join(""));
    if (
      (typeof prop === "string" && prop !== "DEL") ||
      typeof prop === "number"
    ) {
      const propArray = [];
      propArray.push(prop);
      setButtonsPressed(propArray);
      console.log(propArray);
      console.log(buttonsPressed);
    }

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
        console.log(operationPressed);
        setOperation([prop]);
        console.log(num1);
        setUpperDisplay([num1.toString(), prop]);
        setNumbers([num1]);
        setDisplay([num1]);
        break;
      default:
        console.log(operationPressed);
        if (typeof prop === "number") {
          if (display[0] === 0) {
            console.log("rodou");
            setDisplay([prop]);
          } else if (display.length < 13) {
            setDisplay([...display, prop]);
          } else if (operationPressed === true) {
            console.log("rodou");
            setDisplay([prop]);
          }
        }
        "hihi";
        break;
    }
  };
  console.log(upperDisplay);

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
