const resultElement = document.getElementById("result");
const number1 = document.getElementById("input1");
const number2 = document.getElementById("input2");

const submitBtn = document.getElementById("submit");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const powerBtn = document.getElementById("power");
const divisionBtn = document.getElementById("division");
let action = "+";

plusBtn.onclick = function () {
  action = "+";
};

minusBtn.onclick = function () {
  action = "-";
};

powerBtn.onclick = function () {
  action = "*";
};

divisionBtn.onclick = function () {
  action = "/";
};

function printResult(result) {
  if (result < 0) resultElement.style.color = "red";
  else resultElement.style.color = "green";

  resultElement.textContent = result;
}

function calculateNumbersWithAction(value1, value2, actionSymbol){
    let sum = 0;
    switch (actionSymbol) {
      case "+":
        sum = value1 + value2;
        break;
      case "-":
        sum = value1- value2;
        break;
      case "*":
        sum = value1 * value2;
        break;
      case "/":
        sum = value1 / value2;
        break;
      default:
        break;
    }
    return sum
}

submitBtn.onclick = function () {
  printResult(calculateNumbersWithAction(Number(number1.value), Number(number2.value), action));
};
