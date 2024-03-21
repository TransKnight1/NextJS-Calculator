export const equalIsPressed = (
  num1: number,
  num2: number,
  operation: string | number | null
) => {
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

  const formattedResult = result.toLocaleString(undefined, {
    maximumFractionDigits: 11,
  });

  return formattedResult;
};
