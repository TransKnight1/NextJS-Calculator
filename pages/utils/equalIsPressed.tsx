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

  // Arredonda o resultado para até 10 casas decimais
  const roundedResult = parseFloat(result.toFixed(10));

  // Formata o resultado como uma string com no máximo 2 casas decimais
  const formattedResult = roundedResult.toLocaleString(undefined, {
    maximumFractionDigits: 11,
  });

  return formattedResult;
};
