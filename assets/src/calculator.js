document.getElementById("currentYear").textContent = new Date().getFullYear();

const topScreen = document.querySelector("#topScreen");
const mainScreen = document.querySelector("#mainScreen");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector("#clearBTN");
const backspaceButton = document.querySelector("#backspaceBTN");
const decimalPointButton = document.querySelector("#decimalPointBTN");
const equalsButton = document.querySelector("#equalsBTN");

let operator, num1, num2;
let operatorButtonClicked = false;
let firstOperation = false;

document.addEventListener("DOMContentLoaded", () => {
  mainScreen.textContent = "0";

  window.addEventListener("keydown", keyboardHandler);

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => numberHandler(button));
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => operationHandler(button));
  });

  clearButton.addEventListener("click", clearScreen);

  backspaceButton.addEventListener("click", backspace);

  decimalPointButton.addEventListener("click", addDecimal);

  equalsButton.addEventListener("click", calculate);
});

function keyboardHandler(event) {
  const button = document.createElement("button");

  if (event.key >= 0 && event.key <= 9) {
    button.textContent = event.key;
    numberHandler(button);
  }

  switch (event.key) {
    case "+":
      button.textContent = event.key;
      operationHandler(button);
      break;
    case "-":
      button.textContent = event.key;
      operationHandler(button);
      break;
    case "*":
      button.textContent = "×";
      operationHandler(button);
      break;
    case "/":
      button.textContent = "÷";
      operationHandler(button);
      break;
    case ".":
      addDecimal();
      break;
    case "Enter":
      calculate();
      break;
    case "Backspace":
      backspace();
      break;
    case "Escape":
      clearScreen();
      break;
  }
}

function numberHandler(button) {
  if (mainScreen.textContent === "0") {
    mainScreen.textContent = "";
  }

  if (firstOperation) {
    mainScreen.textContent = "";
    firstOperation = false;
  }

  if (
    !(mainScreen.textContent.length > 13) &&
    !(mainScreen.textContent === "ERR: OVERFLOW")
  ) {
    mainScreen.textContent += button.textContent;
  }
}

function operationHandler(button) {
  if (!(mainScreen.textContent === "ERR: OVERFLOW")) {
    if (operatorButtonClicked) {
      operator = button.textContent;
      num2 = mainScreen.textContent;
      mainScreen.textContent = operate(operator, num1, num2);
      topScreen.textContent = num1 + " " + operator + " " + num2 + " =";

      if (mainScreen.textContent === "ERR: OVERFLOW") {
        topScreen.textContent = "";
      }
    } else {
      operator = button.textContent;
      num1 = mainScreen.textContent;
      topScreen.textContent = mainScreen.textContent + button.textContent;
      operatorButtonClicked = true;
      firstOperation = true;
    }
  }
}

function clearScreen() {
  operatorButtonClicked = false;
  firstOperation = false;
  mainScreen.textContent = "0";
  topScreen.textContent = "";
  operator = "";
  num1 = "";
  num2 = "";
}

function backspace() {
  if (
    mainScreen.textContent !== "0" &&
    !(mainScreen.textContent === "ERR: OVERFLOW")
  ) {
    mainScreen.textContent = mainScreen.textContent.slice(
      0,
      mainScreen.textContent.length - 1
    );
    if (mainScreen.textContent.length === 0) {
      mainScreen.textContent = "0";
    }
  }
}

function addDecimal() {
  if (
    !mainScreen.textContent.includes(".") &&
    !(mainScreen.textContent === "ERR: OVERFLOW")
  ) {
    if (!(mainScreen.textContent.length > 13)) {
      mainScreen.textContent += ".";
    }
  }
}

function calculate() {
  if (!(mainScreen.textContent === "ERR: OVERFLOW") && !firstOperation) {
    num2 = mainScreen.textContent;
    mainScreen.textContent = operate(operator, num1, num2);
    topScreen.textContent = num1 + " " + operator + " " + num2 + " =";
    operatorButtonClicked = false;
  }

  if (mainScreen.textContent === "ERR: OVERFLOW") {
    topScreen.textContent = "";
  }
}

function operate(operator, num1, num2) {
  let answer;
  num1 = Number(num1);
  num2 = Number(num2);

  switch (operator) {
    case "+":
      answer = add(num1, num2);
      break;
    case "-":
      answer = subtract(num1, num2);
      break;
    case "×":
      answer = multiply(num1, num2);
      break;
    case "÷":
      if (num2 != 0) {
        answer = divide(num1, num2);
      } else {
        alert("You can't divide with zero!");
      }
      break;
  }
  return answer;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  let answer = num1 * num2;

  if (!answer.toString().includes(".")) {
    return answer;
  }

  return answer.toFixed(4);
}

function divide(num1, num2) {
  let answer = num1 / num2;

  if (!answer.toString().includes(".")) {
    return answer;
  }

  return answer.toFixed(12);
}
