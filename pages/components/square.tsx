"use client";
import { useDisplay } from "../atom/display";
import { equalIsPressed } from "../utils/equalIsPressed";

interface SquareProps {
  stringProp?: string;
  numberProp?: number;
  doubleWidth?: boolean;
  className?: string;
}

export const Square = ({
  stringProp,
  numberProp,
  doubleWidth,
  className,
}: SquareProps) => {
  const {
    setDisplay,
    display,
    memory,
    setMemory,
    buttonsPressed,
    setButtonsPressed,
    setOperationHistory,
  } = useDisplay();

  const conversionComma = (value: string) => {
    return parseFloat(value.replace(",", "."));
  };

  //  const convertPointToComma = (number: number) => {
  //     return number.toString().replace(".", ",");
  //   }

  //   const convertCommaToPoint = (numberString: string) => {
  //     return numberString.replace(",", ".");
  //   }

  const handleButton = (value: any) => {
    const validOperators = ["+", "-", "X", "/"];

    const memoryString = memory.filter(
      (element) =>
        typeof element === "string" &&
        element !== "=" &&
        element !== "," &&
        element !== "+/-" &&
        element !== "%"
    );
    const validOperatorsFiltered = validOperators.some((operator) =>
      memoryString.includes(operator)
    );
    const lastValidOperatorIndex = validOperatorsFiltered
      ? memoryString.lastIndexOf(
          validOperators.find((operator) => memoryString.includes(operator))!
        )
      : -1;
    const operation =
      lastValidOperatorIndex !== -1
        ? memoryString[memoryString.length - lastValidOperatorIndex - 1]
        : null;

    const lastCharDisplay = display.slice(-1).toString();
    const lastCharMemory = memory.slice(-1).toString();
    const lastCharPressed = buttonsPressed.slice(-1).toString();

    const num1 = conversionComma(memory.slice(0, -1).join(""));
    const num2 = conversionComma(display.join(""));
    const currentValue = parseFloat(display.join(""));
    console.log("Before conversion comma num1", memory.slice(0, -1).join(""));
    console.log("After", num1);

    // let lastNumberPressed;
    // let numbersOnly = buttonsPressed.filter((button) => !isNaN(button));
    // lastNumberPressed = conversionComma(numbersOnly.slice(-1).join(""));
    const numbersOnly = memory
      .filter((button) => {
        // Verifica se o botão é um número ou uma vírgula (que pode indicar um número decimal)
        return !isNaN(parseFloat(button)) || button === ",";
      })
      .reverse(); // Reverte a ordem dos números

    console.log("Numbers only", numbersOnly);
    const lastNumberIndex = numbersOnly.findIndex(
      (button) => !isNaN(Number(button))
    ); // Encontra o índice do primeiro número na ordem correta

    console.log("Last number index", lastNumberIndex);
    const numbersOnlyReverse = numbersOnly.reverse(); // Inverte a ordem dos números novamente

    console.log("Numbers only reverse", numbersOnlyReverse);

    const lastNumberPressed = conversionComma(
      numbersOnlyReverse
        .slice(lastNumberIndex === -1 ? 0 : lastNumberIndex) // Slice do último número até o final
        .join("")
    );

    console.log(lastNumberPressed);

    console.log("Memory string", memoryString);

    switch (value) {
      case "DEL":
        setButtonsPressed([]);
        setDisplay([0]);
        setMemory([]);
        setOperationHistory([]);
        break;
      case "=":
        if (lastCharPressed === "=" && value === "=") {
          const newResult = equalIsPressed(num2, num1, operation);
          console.log("New result", newResult);
          console.log();
          console.log(num2);
          console.log(operation);
          setDisplay([newResult]);
          setOperationHistory([`${num1} ${operation} ${num2} = `]);
        } else {
          const result = equalIsPressed(num1, num2, operation);
          setDisplay([result]);
          setMemory([...memory, display, value]);
        }
        setButtonsPressed([...buttonsPressed, value]);
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
          setDisplay([result]);
          setMemory([result, value]);
        } else {
          setMemory([...display, value]);
        }
        break;
      case ",":
        if (!display.toString().includes(",")) {
          setDisplay([...display, value]);
        }
        break;
      case "+/-":
        let newValue = currentValue * -1;

        setDisplay([newValue]);
        break;

      case "%":
        if (memory.length === 0) {
          setDisplay([currentValue / 100]);
        } else {
          const numOriginal = conversionComma(memory.join(""));
          const percentValue = conversionComma(display.join(""));
          const result = numOriginal * (percentValue / 100);
          setDisplay([result]);
        }
        break;
      default:
        setButtonsPressed([...buttonsPressed, value]);
        if (display.length === 1 && display[0] === 0) {
          setDisplay([value]);
        } else if (["+", "-", "X", "/"].includes(lastCharPressed)) {
          setDisplay([value]);
        } else {
          if (display.join("").length < 13) {
            setDisplay([...display, value]);
          }
        }
        break;
    }
  };

  return (
    <button
      onClick={() => handleButton(stringProp || numberProp)}
      className={`bg-gray-500 h-14 border-[1px] border-black hover:opacity-75 transition ease-in-out ${
        doubleWidth ? "w-28" : "w-14"
      } ${className}`}
    >
      <h1>{stringProp || numberProp}</h1>
    </button>
  );
};
