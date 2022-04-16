let firstOperand = "";
let secondOperand = "";
let currentOpeartion = null;
let currentOperand = firstOperand;
let resetScreen = false;

const numbers = [...document.querySelectorAll("[data-number]")];
const operators = [...document.querySelectorAll("[data-operator]")];
const equationField = document.querySelector("#equation");
const resultField = document.querySelector("#result");
const pointBtn = document.querySelector("#point");
const deleteBtn = document.querySelector("#delete");
const clearBtn = document.querySelector("#clear");

clearBtn.addEventListener("click", () => {
  equationField.innerText = "";
  resultField.innerText = "0";
  firstOperand = "";
  secondOperand = "";
  currentOpeartion = null;
});

deleteBtn.addEventListener("click", () => {
  if ((currentOperand = firstOperand)) {
    firstOperand = firstOperand.slice(0, -1);
  } else {
    secondOperand = secondOperand.slice(0, -1);
  }
  equationField.innerText = equationField.innerText.slice(0, -1);
});

numbers.forEach((number) => number.addEventListener("click", numberClick));
operators.forEach((operator) =>
  operator.addEventListener("click", operatorClick)
);

function numberClick(event) {
  if (currentOpeartion === null) {
    firstOperand += event.target.innerText;
    equationField.innerText += event.target.innerText;
  } else {
    secondOperand += event.target.innerText;
    equationField.innerText += event.target.innerText;
  }
}

function operatorClick(event) {
  if (currentOpeartion === null && event.target.innerText === "=") return;
  if (currentOpeartion !== null) {
    operate(
      +firstOperand,
      +secondOperand,
      currentOpeartion,
      event.target.innerText
    );
    return;
  }
  currentOpeartion = event.target.innerText;
  if (firstOperand === "") return;
  equationField.innerText += currentOpeartion;
}

function operate(a, b, operator, nextOperator) {
  let equationResult = 0;
  switch (operator) {
    case "÷": {
      equationResult = divide(a, b);
      break;
    }
    case "×": {
      equationResult = multiply(a, b);
      break;
    }
    case "+": {
      equationResult = add(a, b);
      break;
    }
    case "-": {
      equationResult = subtract(a, b);
      break;
    }
  }
  resultField.innerText = equationResult;
  firstOperand = equationResult;
  secondOperand = "";
  if (nextOperator === "=") {
    currentOpeartion = null;
    equationField.innerText = firstOperand;
  } else {
    currentOpeartion = nextOperator;
    equationField.innerText = `${firstOperand}${currentOpeartion}`;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
