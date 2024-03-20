export const equalIsPressed = (
  num1: number,
  num2: number,
  operation: string | number
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

  // Arredondar o resultado para 11 dígitos significativos
  const roundedResult = parseFloat(result.toFixed(11));

  // Remover zeros à direita, se o resultado for um número inteiro
  const formattedResult = Number.isInteger(roundedResult)
    ? roundedResult.toFixed(0)
    : roundedResult.toFixed(11);

  return formattedResult;
};
