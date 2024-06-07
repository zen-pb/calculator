document.getElementById("currentYear").textContent = new Date().getFullYear();

const topScreen = document.querySelector("#topScreen");
const mainScreen = document.querySelector("#mainScreen");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector("#clearBTN");
const backspaceButton = document.querySelector("#backspaceBTN");
const decimalPointButton = document.querySelector("#decimalPointBTN");
const equalsButton = document.querySelector("#equalsBTN");

document.addEventListener("DOMContentLoaded", () => {
  let operator, num1, num2;
  let operatorButtonClicked = false;
  let firstOperation = false;

  mainScreen.textContent = "0";

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
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
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
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
    });
  });

  clearButton.addEventListener("click", () => {
    operatorButtonClicked = false;
    firstOperation = false;
    mainScreen.textContent = "0";
    topScreen.textContent = "";
    operator = "";
    num1 = "";
    num2 = "";
  });

  backspaceButton.addEventListener("click", () => {
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
  });

  decimalPointButton.addEventListener("click", () => {
    if (
      !mainScreen.textContent.includes(".") &&
      !(mainScreen.textContent === "ERR: OVERFLOW")
    ) {
      if (!(mainScreen.textContent.length > 13)) {
        mainScreen.textContent += ".";
      }
    }
  });

  equalsButton.addEventListener("click", () => {
    if (!(mainScreen.textContent === "ERR: OVERFLOW") && !firstOperation) {
      num2 = mainScreen.textContent;
      mainScreen.textContent = operate(operator, num1, num2);
      topScreen.textContent = num1 + " " + operator + " " + num2 + " =";
      operatorButtonClicked = false;
    }

    if (mainScreen.textContent === "ERR: OVERFLOW") {
      topScreen.textContent = "";
    }
  });
});

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

  return answer.toFixed(2);
}

function divide(num1, num2) {
  let answer = num1 / num2;

  if (!answer.toString().includes(".")) {
    return answer;
  }

  return answer.toFixed(12);
}
