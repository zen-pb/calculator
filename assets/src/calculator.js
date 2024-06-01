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
  mainScreen.textContent = "0";

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (mainScreen.textContent === "0") {
        mainScreen.textContent = "";
      }

      if (!(mainScreen.textContent.length > 13)) {
        mainScreen.textContent += button.textContent;
      } else {
        alert("You can no longer add more numbers!");
      }
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      topScreen.textContent = button.textContent;
    });
  });

  clearButton.addEventListener("click", () => {
    mainScreen.textContent = "0";
    topScreen.textContent = "";
  });

  backspaceButton.addEventListener("click", () => {
    if (mainScreen.textContent !== "0") {
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
    if (!mainScreen.textContent.includes(".")) {
      if (!(mainScreen.textContent.length > 13)) {
        mainScreen.textContent += ".";
      }
    }
  });

  equalsButton.addEventListener("click", () => {
    topScreen.textContent = "";
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
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}
