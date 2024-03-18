"use client";
import { useDisplay } from "../atom/display";

interface SquareProps {
  textProp: string | number;
  doubleWidth?: boolean;
}

export const Square = ({ textProp, doubleWidth }: SquareProps) => {
  const { setDisplayState } = useDisplay();

  // Todo: % logic not working yet
  // Logic after operation is weird, it should reset to the number that was inputed
  // equals should repeat the last operation
  // eval should run if operation button is pressed again after being pressed already after a number

  const handleButton = (value: string | number) => {
    switch (value) {
      case "DEL":
        setDisplayState(0);
        break;
      case "=":
        setDisplayState((prevState) => eval(prevState));
        break;
      case "+/-":
        setDisplayState((prevState) => prevState * -1);
        break;
      case "%":
        setDisplayState((prevState) => prevState / 100);
        break;
      case ",":
      if ()
        setDisplayState((prevState) => prevState );
        break;
      default:
        if (typeof value === "number") {
          setDisplayState((prevState) =>
            prevState == "0" ? `${value}` : `${prevState}${value}`
          );
        } else {
          setDisplayState((prevState) => prevState + value);
        }
    }
  };
  return (
    <button
      onClick={() => handleButton(textProp)}
      className={
        `bg-gray-500 h-14 border-[1px] border-teal-950 ` +
        (doubleWidth ? "w-28" : "w-14")
      }
    >
      <h1>{textProp}</h1>
    </button>
  );
};
