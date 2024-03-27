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
    case "x²":
      result = num1 * num1;
      break;
    case "√":
      result = Math.sqrt(num1);
      break;
    case "1/x":
      result = 1 / num1;
      break;
    default:
      break;
  }

  console.log(result);
  if (result === Infinity) {
    return NaN;
  } else if (result.toString().length > 13) {
    return Math.round(result);
  } else {
    return result;
  }
};
